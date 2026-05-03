<?php

namespace App\Services;

use App\Models\Article;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class ChatService
{
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client(['timeout' => 60]);
        $this->apiKey = env('GEMINI_API_KEY');
    }

    /**
     * Process chat message with RAG
     */
    public function chat($message)
    {
        try {
            // Step 1: Search relevant articles
            $relevantArticles = $this->searchRelevantArticles($message);

            if ($relevantArticles->isEmpty()) {
                return [
                    'response' => "I couldn't find any articles related to your question. Could you try asking about current news topics like economy, technology, sports, or international affairs?",
                    'sources' => []
                ];
            }

            // Step 2: Build context from articles
            $context = $this->buildContext($relevantArticles);

            // Step 3: Generate response with Gemini
            $response = $this->generateResponse($message, $context);

            // Step 4: Format sources
            $sources = $relevantArticles->map(function ($article) {
                return [
                    'title' => $article->title,
                    'slug' => $article->slug,
                    'excerpt' => $article->excerpt,
                    'category' => $article->category->name,
                    'published_at' => $article->published_at,
                ];
            })->toArray();

            return [
                'response' => $response,
                'sources' => $sources
            ];

        } catch (\Exception $e) {
            Log::error('Chat Error: ' . $e->getMessage());
            return [
                'response' => "I'm having trouble processing your request right now. Please try again in a moment.",
                'sources' => []
            ];
        }
    }

    /**
     * Search relevant articles using MySQL full-text search
     */
    protected function searchRelevantArticles($query, $limit = 3)
    {
        // Clean query
        $cleanQuery = strtolower(trim($query));

        // Extract keywords
        $keywords = $this->extractKeywords($cleanQuery);

        if (empty($keywords)) {
            // If no keywords, return latest articles
            return Article::where('status', 'published')
                ->with('category', 'author')
                ->orderBy('published_at', 'desc')
                ->limit($limit)
                ->get();
        }

        // Search in title, excerpt, content, and tags
        $articles = Article::where('status', 'published')
            ->where(function ($q) use ($keywords) {
                foreach ($keywords as $keyword) {
                    $q->orWhere('title', 'LIKE', "%{$keyword}%")
                      ->orWhere('excerpt', 'LIKE', "%{$keyword}%")
                      ->orWhere('content', 'LIKE', "%{$keyword}%")
                      ->orWhereJsonContains('tags', $keyword);
                }
            })
            ->with('category', 'author')
            ->orderBy('published_at', 'desc')
            ->limit($limit)
            ->get();

        // If no results, try category-based search
        if ($articles->isEmpty()) {
            $categorySlug = $this->detectCategory($cleanQuery);
            if ($categorySlug) {
                $articles = Article::where('status', 'published')
                    ->whereHas('category', function ($q) use ($categorySlug) {
                        $q->where('slug', $categorySlug);
                    })
                    ->with('category', 'author')
                    ->orderBy('published_at', 'desc')
                    ->limit($limit)
                    ->get();
            }
        }

        return $articles;
    }

    /**
     * Detect category from query
     */
    protected function detectCategory($query)
    {
        $categoryMap = [
            'economy' => ['economy', 'business', 'market', 'finance', 'gdp', 'stock'],
            'science-technology' => ['technology', 'tech', 'science', 'ai', 'space', 'innovation', 'startup'],
            'sports' => ['sports', 'cricket', 'football', 'match', 'player', 'game'],
            'international' => ['international', 'world', 'global', 'foreign', 'us', 'china'],
            'national' => ['national', 'india', 'delhi', 'mumbai', 'government'],
        ];

        foreach ($categoryMap as $category => $keywords) {
            foreach ($keywords as $keyword) {
                if (str_contains($query, $keyword)) {
                    return $category;
                }
            }
        }

        return null;
    }

    /**
     * Extract keywords from query
     */
    protected function extractKeywords($query)
    {
        // Remove common words
        $stopWords = ['what', 'is', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'and', 'or', 'but', 'about', 'tell', 'me', 'can', 'you', 'please', 'how', 'why', 'when', 'where'];
        
        $words = explode(' ', $query);
        $keywords = array_filter($words, function ($word) use ($stopWords) {
            return strlen($word) > 2 && !in_array($word, $stopWords);
        });

        return array_values($keywords);
    }

    /**
     * Build context from articles
     */
    protected function buildContext($articles)
    {
        $context = "Here are the latest news articles:\n\n";

        foreach ($articles as $index => $article) {
            $context .= "Article " . ($index + 1) . ":\n";
            $context .= "Title: " . $article->title . "\n";
            $context .= "Category: " . $article->category->name . "\n";
            $context .= "Content: " . strip_tags($article->excerpt) . "\n";
            $context .= "Published: " . $article->published_at->format('M d, Y') . "\n\n";
        }

        return $context;
    }

    /**
     * Generate response using Gemini AI
     */
    protected function generateResponse($question, $context)
    {
        $prompt = "You are IndiaBriefed AI Assistant, a helpful chatbot for a news website focused on Indian current affairs for UPSC and SSC aspirants.\n\n";
        $prompt .= "Context (Recent News Articles):\n{$context}\n\n";
        $prompt .= "User Question: {$question}\n\n";
        $prompt .= "Instructions:\n";
        $prompt .= "1. Answer the question based ONLY on the provided articles\n";
        $prompt .= "2. Be concise and informative (2-3 sentences)\n";
        $prompt .= "3. If the articles don't contain the answer, say so politely\n";
        $prompt .= "4. Use a friendly, professional tone\n";
        $prompt .= "5. Don't mention 'Article 1' or 'Article 2' - just provide the information naturally\n\n";
        $prompt .= "Answer:";

        try {
            $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={$this->apiKey}";
            
            $response = $this->client->post($url, [
                'json' => [
                    'contents' => [
                        [
                            'parts' => [
                                ['text' => $prompt]
                            ]
                        ]
                    ],
                    'generationConfig' => [
                        'temperature' => 0.7,
                        'maxOutputTokens' => 500,
                    ],
                    'safetySettings' => [
                        [
                            'category' => 'HARM_CATEGORY_HARASSMENT',
                            'threshold' => 'BLOCK_NONE'
                        ],
                        [
                            'category' => 'HARM_CATEGORY_HATE_SPEECH',
                            'threshold' => 'BLOCK_NONE'
                        ],
                        [
                            'category' => 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                            'threshold' => 'BLOCK_NONE'
                        ],
                        [
                            'category' => 'HARM_CATEGORY_DANGEROUS_CONTENT',
                            'threshold' => 'BLOCK_NONE'
                        ]
                    ]
                ],
                'headers' => [
                    'Content-Type' => 'application/json',
                ]
            ]);

            $data = json_decode($response->getBody()->getContents(), true);
            
            if (isset($data['candidates'][0]['content']['parts'][0]['text'])) {
                return trim($data['candidates'][0]['content']['parts'][0]['text']);
            }

            Log::error('Gemini Response Error: ' . json_encode($data));
            return "I found some relevant articles for you. Please click on the sources below to read more.";

        } catch (\Exception $e) {
            Log::error('Gemini API Error: ' . $e->getMessage());
            if ($e->getResponse()) {
                Log::error('Gemini API Response: ' . $e->getResponse()->getBody()->getContents());
            }
            // Return a helpful message instead of error
            return "I found some relevant articles for you. Please click on the sources below to read more.";
        }
    }

    /**
     * Get suggested questions
     */
    public function getSuggestedQuestions()
    {
        return [
            "What's the latest news in economy?",
            "Tell me about recent technology developments",
            "What's happening in international affairs?",
            "Any updates on sports?",
            "What are the top national news stories?",
        ];
    }
}

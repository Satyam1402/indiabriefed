<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class GeminiAIService
{
    protected $client;
    protected $apiKey;
    protected $baseUrl = 'https://generativelanguage.googleapis.com/v1beta';

    public function __construct()
    {
        $this->client = new Client(['timeout' => 60]);
        $this->apiKey = env('GEMINI_API_KEY');
    }

    /**
     * Generate content using Gemini AI
     */
    protected function generate($prompt)
    {
        try {
            $response = $this->client->post(
                "{$this->baseUrl}/models/gemini-pro:generateContent?key={$this->apiKey}",
                [
                    'json' => [
                        'contents' => [
                            [
                                'parts' => [
                                    ['text' => $prompt]
                                ]
                            ]
                        ]
                    ]
                ]
            );

            $data = json_decode($response->getBody()->getContents(), true);
            
            if (isset($data['candidates'][0]['content']['parts'][0]['text'])) {
                return trim($data['candidates'][0]['content']['parts'][0]['text']);
            }

            return null;
        } catch (\Exception $e) {
            Log::error('Gemini AI Error: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Generate article excerpt
     */
    public function generateExcerpt($title, $content)
    {
        $cleanContent = strip_tags($content);
        $cleanContent = substr($cleanContent, 0, 1000); // Limit content length

        $prompt = "Create a compelling 2-3 sentence excerpt (max 150 characters) for this news article:\n\nTitle: {$title}\n\nContent: {$cleanContent}\n\nExcerpt:";

        $excerpt = $this->generate($prompt);
        
        return $excerpt ?: substr($cleanContent, 0, 150) . '...';
    }

    /**
     * Enhance article content
     */
    public function enhanceContent($title, $content)
    {
        $cleanContent = strip_tags($content);
        
        if (strlen($cleanContent) < 100) {
            return $content; // Too short to enhance
        }

        $prompt = "Improve this news article for better readability. Keep it factual and professional. Format with HTML tags (h2, h3, p, ul, li). Keep the same information but make it more structured:\n\nTitle: {$title}\n\nContent: {$cleanContent}\n\nEnhanced Article:";

        $enhanced = $this->generate($prompt);
        
        return $enhanced ?: $content;
    }

    /**
     * Extract keywords/tags
     */
    public function extractTags($title, $content)
    {
        $cleanContent = strip_tags($content);
        $cleanContent = substr($cleanContent, 0, 500);

        $prompt = "Extract 5-7 relevant keywords/tags from this article. Return only comma-separated words:\n\nTitle: {$title}\n\nContent: {$cleanContent}\n\nTags:";

        $tags = $this->generate($prompt);
        
        if ($tags) {
            return array_map('trim', explode(',', $tags));
        }

        return [];
    }

    /**
     * Categorize article
     */
    public function categorizeArticle($title, $content)
    {
        $cleanContent = strip_tags($content);
        $text = strtolower($title . ' ' . $cleanContent);

        // Keyword-based categorization (more reliable)
        $categoryKeywords = [
            'international' => ['world', 'global', 'us', 'usa', 'china', 'pakistan', 'russia', 'uk', 'europe', 'foreign', 'international', 'united nations', 'nato', 'g20', 'biden', 'trump', 'xi jinping'],
            'economy' => ['economy', 'business', 'market', 'stock', 'finance', 'gdp', 'rupee', 'dollar', 'inflation', 'bank', 'rbi', 'investment', 'trade', 'export', 'import', 'fiscal', 'budget', 'tax'],
            'science-technology' => ['technology', 'tech', 'science', 'ai', 'artificial intelligence', 'space', 'isro', 'nasa', 'research', 'innovation', 'startup', 'google', 'microsoft', 'apple', 'meta', 'satellite', 'rocket', 'smartphone', 'computer', 'software', 'cyber'],
            'sports' => ['cricket', 'football', 'sports', 'match', 'player', 'tournament', 'ipl', 'fifa', 'olympics', 'medal', 'champion', 'team', 'game', 'score', 'win', 'defeat', 'kohli', 'dhoni', 'ronaldo', 'messi'],
            'education' => ['education', 'school', 'university', 'college', 'student', 'exam', 'neet', 'jee', 'upsc', 'cbse', 'teacher', 'admission', 'degree', 'scholarship', 'learning'],
            'environment' => ['environment', 'climate', 'pollution', 'green', 'forest', 'wildlife', 'tiger', 'elephant', 'conservation', 'carbon', 'renewable', 'solar', 'wind energy', 'global warming', 'weather', 'rain', 'flood', 'drought'],
            'culture' => ['culture', 'art', 'music', 'film', 'bollywood', 'festival', 'diwali', 'holi', 'eid', 'christmas', 'movie', 'actor', 'actress', 'cinema', 'dance', 'painting', 'heritage', 'tradition'],
        ];

        // Count keyword matches for each category
        $scores = [];
        foreach ($categoryKeywords as $category => $keywords) {
            $score = 0;
            foreach ($keywords as $keyword) {
                if (str_contains($text, $keyword)) {
                    $score++;
                }
            }
            $scores[$category] = $score;
        }

        // Get category with highest score
        arsort($scores);
        $topCategory = array_key_first($scores);
        
        if ($scores[$topCategory] > 0) {
            return $topCategory;
        }

        // Fallback to AI categorization
        $cleanContent = substr($cleanContent, 0, 300);
        $categories = 'national, international, economy, science-technology, education, sports, environment, culture';
        $prompt = "Categorize this article into ONE of these categories: {$categories}\n\nTitle: {$title}\n\nContent: {$cleanContent}\n\nReturn ONLY the category slug (e.g., 'science-technology'):";

        $category = $this->generate($prompt);
        
        if ($category) {
            $category = strtolower(trim($category));
            $validCategories = ['national', 'international', 'economy', 'science-technology', 'education', 'sports', 'environment', 'culture'];
            
            if (in_array($category, $validCategories)) {
                return $category;
            }
        }

        return 'national';
    }

    /**
     * Calculate read time
     */
    public function calculateReadTime($content)
    {
        $wordCount = str_word_count(strip_tags($content));
        $minutes = ceil($wordCount / 200); // Average reading speed: 200 words/min
        
        return max(1, min($minutes, 15)); // Between 1-15 minutes
    }

    /**
     * Generate SEO meta description
     */
    public function generateMetaDescription($title, $excerpt)
    {
        $prompt = "Create an SEO-optimized meta description (max 155 characters) for this article:\n\nTitle: {$title}\n\nExcerpt: {$excerpt}\n\nMeta Description:";

        $meta = $this->generate($prompt);
        
        if ($meta && strlen($meta) <= 160) {
            return $meta;
        }

        return substr($excerpt, 0, 155) . '...';
    }
}

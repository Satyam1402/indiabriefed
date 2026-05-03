<?php

namespace App\Services;

use App\Models\Article;
use App\Models\Category;
use App\Models\Author;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use GuzzleHttp\Client;

class ArticleAutomationService
{
    protected $newsAPI;
    protected $rssService;
    protected $geminiAI;
    protected $client;

    public function __construct(
        NewsAPIService $newsAPI,
        RSSFeedService $rssService,
        GeminiAIService $geminiAI
    ) {
        $this->newsAPI = $newsAPI;
        $this->rssService = $rssService;
        $this->geminiAI = $geminiAI;
        $this->client = new Client(['timeout' => 30, 'verify' => false]);
    }

    /**
     * Main automation method - Fetch and create articles
     */
    public function autoFetchAndCreate($source = 'both', $limit = 25)
    {
        $articles = [];
        $created = 0;
        $skipped = 0;

        Log::info("Starting article automation - Source: {$source}, Limit: {$limit}");

        // Fetch from NewsAPI
        if ($source === 'newsapi' || $source === 'both') {
            $newsArticles = $this->newsAPI->fetchIndiaHeadlines(null, $limit);
            $articles = array_merge($articles, $newsArticles);
            Log::info("Fetched " . count($newsArticles) . " articles from NewsAPI");
        }

        // Fetch from RSS Feeds
        if ($source === 'rss' || $source === 'both') {
            $rssArticles = $this->rssService->fetchAllFeeds($limit);
            $articles = array_merge($articles, $rssArticles);
            Log::info("Fetched " . count($rssArticles) . " articles from RSS");
        }

        // Process each article
        foreach ($articles as $articleData) {
            try {
                // Check if article already exists
                if ($this->articleExists($articleData['title'])) {
                    $skipped++;
                    continue;
                }

                // Create article with AI enhancement
                if ($this->createArticle($articleData)) {
                    $created++;
                }

                // Rate limiting - sleep for 1 second between articles
                sleep(1);

            } catch (\Exception $e) {
                Log::error("Error processing article: " . $e->getMessage());
                continue;
            }
        }

        Log::info("Automation complete - Created: {$created}, Skipped: {$skipped}");

        return [
            'success' => true,
            'created' => $created,
            'skipped' => $skipped,
            'total_fetched' => count($articles),
        ];
    }

    /**
     * Check if article already exists
     */
    protected function articleExists($title)
    {
        $slug = Str::slug($title);
        return Article::where('slug', $slug)->exists();
    }

    /**
     * Create article with AI enhancement
     */
    protected function createArticle($data)
    {
        try {
            $title = $data['title'] ?? 'Untitled';
            $content = $data['content'] ?? $data['description'] ?? '';

            // Skip if content is too short
            if (strlen($content) < 50) {
                Log::info("Skipping article (too short): {$title}");
                return false;
            }

            // Get or create author
            $author = $this->getOrCreateAuthor($data['source']['name'] ?? 'Editorial Team');

            // AI Processing
            Log::info("Processing with AI: {$title}");
            
            $excerpt = $this->geminiAI->generateExcerpt($title, $content);
            $enhancedContent = $this->geminiAI->enhanceContent($title, $content);
            $tags = $this->geminiAI->extractTags($title, $content);
            $categorySlug = $this->geminiAI->categorizeArticle($title, $content);
            $readTime = $this->geminiAI->calculateReadTime($enhancedContent);
            $metaDescription = $this->geminiAI->generateMetaDescription($title, $excerpt);

            // Get category
            $category = Category::where('slug', $categorySlug)->first();
            if (!$category) {
                $category = Category::where('slug', 'national')->first();
            }

            // Download and store image
            $thumbnailUrl = null;
            if (!empty($data['urlToImage'])) {
                $thumbnailUrl = $this->downloadImage($data['urlToImage'], Str::slug($title));
            }
            
            // If no image, use category-based placeholder
            if (!$thumbnailUrl) {
                $thumbnailUrl = $this->generatePlaceholderUrl($category->name, $category->color);
            }

            // Create article
            $article = Article::create([
                'title' => $title,
                'slug' => Str::slug($title),
                'excerpt' => $excerpt,
                'content' => $enhancedContent,
                'thumbnail_url' => $thumbnailUrl,
                'category_id' => $category->id,
                'author_id' => $author->id,
                'status' => 'published',
                'is_breaking' => false,
                'is_featured' => false,
                'views' => 0,
                'read_time' => $readTime,
                'meta_title' => substr($title, 0, 60),
                'meta_description' => $metaDescription,
                'tags' => $tags,
                'published_at' => now(),
            ]);

            Log::info("Article created successfully: {$title}");
            return true;

        } catch (\Exception $e) {
            Log::error("Error creating article: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Get or create author
     */
    protected function getOrCreateAuthor($name)
    {
        $author = Author::where('name', $name)->first();

        if (!$author) {
            $author = Author::create([
                'name' => $name,
                'bio' => "Contributing author for IndiaBriefed",
            ]);
        }

        return $author;
    }

    /**
     * Download and store image
     */
    protected function downloadImage($url, $slug)
    {
        try {
            $response = $this->client->get($url);
            $imageContent = $response->getBody()->getContents();

            // Get file extension
            $extension = pathinfo(parse_url($url, PHP_URL_PATH), PATHINFO_EXTENSION);
            if (!in_array($extension, ['jpg', 'jpeg', 'png', 'webp'])) {
                $extension = 'jpg';
            }

            // Generate filename
            $filename = $slug . '-' . time() . '.' . $extension;
            $path = 'thumbnails/' . $filename;

            // Store file
            \Storage::disk('public')->put($path, $imageContent);

            return $path;

        } catch (\Exception $e) {
            Log::error("Error downloading image: " . $e->getMessage());
            return null;
        }
    }

    /**
     * Generate placeholder image URL
     */
    protected function generatePlaceholderUrl($categoryName, $color)
    {
        $color = ltrim($color, '#');
        return "https://placehold.co/800x600/{$color}/white?text=" . urlencode($categoryName);
    }
}

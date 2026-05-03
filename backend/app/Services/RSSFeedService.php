<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class RSSFeedService
{
    protected $client;
    protected $feeds = [
        'times-of-india' => 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
        'the-hindu' => 'https://www.thehindu.com/news/national/feeder/default.rss',
        'indian-express' => 'https://indianexpress.com/feed/',
        'ndtv' => 'https://feeds.feedburner.com/ndtvnews-top-stories',
        'ndtv-sports' => 'https://feeds.feedburner.com/ndtvsports-latest',
        'ndtv-world' => 'https://feeds.feedburner.com/ndtvnews-world-news',
        'hindu-business' => 'https://www.thehindu.com/business/feeder/default.rss',
        'hindu-sci-tech' => 'https://www.thehindu.com/sci-tech/feeder/default.rss',
    ];

    public function __construct()
    {
        $this->client = new Client([
            'timeout' => 30,
            'verify' => false,
        ]);
    }

    /**
     * Fetch articles from all RSS feeds
     */
    public function fetchAllFeeds($limit = 10)
    {
        $allArticles = [];

        foreach ($this->feeds as $source => $url) {
            $articles = $this->fetchFeed($url, $source, $limit);
            $allArticles = array_merge($allArticles, $articles);
        }

        return $allArticles;
    }

    /**
     * Fetch articles from a single RSS feed
     */
    public function fetchFeed($url, $source, $limit = 10)
    {
        try {
            $response = $this->client->get($url);
            $xml = simplexml_load_string($response->getBody()->getContents());

            if (!$xml) {
                Log::error("Failed to parse RSS feed: {$source}");
                return [];
            }

            $articles = [];
            $count = 0;

            foreach ($xml->channel->item as $item) {
                if ($count >= $limit) break;

                $articles[] = [
                    'title' => (string) $item->title,
                    'description' => (string) ($item->description ?? ''),
                    'url' => (string) $item->link,
                    'publishedAt' => (string) ($item->pubDate ?? now()),
                    'source' => ['name' => $source],
                    'urlToImage' => $this->extractImage($item),
                    'content' => (string) ($item->description ?? ''),
                ];

                $count++;
            }

            return $articles;
        } catch (\Exception $e) {
            Log::error("RSS Feed Error ({$source}): " . $e->getMessage());
            return [];
        }
    }

    /**
     * Extract image from RSS item
     */
    protected function extractImage($item)
    {
        // Try media:content
        if (isset($item->children('media', true)->content)) {
            return (string) $item->children('media', true)->content->attributes()->url;
        }

        // Try enclosure
        if (isset($item->enclosure)) {
            return (string) $item->enclosure->attributes()->url;
        }

        // Try to extract from description
        $description = (string) $item->description;
        preg_match('/<img[^>]+src="([^">]+)"/', $description, $matches);
        
        return $matches[1] ?? null;
    }

    /**
     * Categorize article based on keywords
     */
    public function categorizeArticle($title, $description)
    {
        $text = strtolower($title . ' ' . $description);

        $categories = [
            'economy' => ['economy', 'business', 'market', 'finance', 'gdp', 'rupee', 'stock'],
            'science-technology' => ['technology', 'science', 'ai', 'space', 'isro', 'research', 'innovation'],
            'sports' => ['cricket', 'football', 'sports', 'match', 'player', 'tournament'],
            'education' => ['education', 'school', 'university', 'student', 'exam', 'neet', 'jee'],
            'environment' => ['environment', 'climate', 'pollution', 'green', 'forest', 'wildlife'],
            'culture' => ['culture', 'art', 'music', 'film', 'bollywood', 'festival'],
            'international' => ['world', 'global', 'international', 'foreign', 'us', 'china', 'pakistan'],
        ];

        foreach ($categories as $category => $keywords) {
            foreach ($keywords as $keyword) {
                if (str_contains($text, $keyword)) {
                    return $category;
                }
            }
        }

        return 'national'; // Default category
    }
}

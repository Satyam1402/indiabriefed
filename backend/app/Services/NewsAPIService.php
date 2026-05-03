<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class NewsAPIService
{
    protected $client;
    protected $apiKey;
    protected $baseUrl = 'https://newsapi.org/v2';

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('NEWS_API_KEY');
    }

    /**
     * Fetch top headlines from India
     */
    public function fetchIndiaHeadlines($category = null, $pageSize = 25)
    {
        try {
            $params = [
                'country' => 'in',
                'apiKey' => $this->apiKey,
                'pageSize' => $pageSize,
            ];

            if ($category) {
                $params['category'] = $category;
            }

            $response = $this->client->get("{$this->baseUrl}/top-headlines", [
                'query' => $params
            ]);

            $data = json_decode($response->getBody()->getContents(), true);

            if ($data['status'] === 'ok') {
                return $data['articles'];
            }

            return [];
        } catch (\Exception $e) {
            Log::error('NewsAPI Error: ' . $e->getMessage());
            return [];
        }
    }

    /**
     * Search for specific news
     */
    public function searchNews($query, $pageSize = 10)
    {
        try {
            $response = $this->client->get("{$this->baseUrl}/everything", [
                'query' => [
                    'q' => $query,
                    'language' => 'en',
                    'sortBy' => 'publishedAt',
                    'apiKey' => $this->apiKey,
                    'pageSize' => $pageSize,
                ]
            ]);

            $data = json_decode($response->getBody()->getContents(), true);

            if ($data['status'] === 'ok') {
                return $data['articles'];
            }

            return [];
        } catch (\Exception $e) {
            Log::error('NewsAPI Search Error: ' . $e->getMessage());
            return [];
        }
    }

    /**
     * Map NewsAPI category to our categories
     */
    public function mapCategory($newsApiCategory)
    {
        $mapping = [
            'general' => 'national',
            'business' => 'economy',
            'technology' => 'science-technology',
            'sports' => 'sports',
            'science' => 'science-technology',
            'health' => 'national',
            'entertainment' => 'culture',
        ];

        return $mapping[$newsApiCategory] ?? 'national';
    }
}

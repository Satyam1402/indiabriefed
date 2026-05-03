<?php

namespace App\Filament\Widgets;

use App\Models\Article;
use Filament\Widgets\ChartWidget;

class PopularArticlesChart extends ChartWidget
{
    protected static ?string $heading = 'Most Viewed Articles';
    
    protected static ?int $sort = 3;

    protected function getData(): array
    {
        $articles = Article::query()
            ->where('status', 'published')
            ->orderBy('views', 'desc')
            ->limit(10)
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'Views',
                    'data' => $articles->pluck('views')->toArray(),
                    'backgroundColor' => '#f59e0b',
                ],
            ],
            'labels' => $articles->pluck('title')->map(fn($title) => 
                strlen($title) > 30 ? substr($title, 0, 30) . '...' : $title
            )->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}

<?php

namespace App\Filament\Widgets;

use App\Models\Article;
use App\Models\Author;
use App\Models\Category;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected int | string | array $columnSpan = 'full';
    
    protected function getColumns(): int
    {
        return 2;
    }
    
    protected function getStats(): array
    {
        return [
            Stat::make('Total Articles', Article::count())
                ->description('All articles in database')
                ->descriptionIcon('heroicon-m-newspaper')
                ->color('success'),
            
            Stat::make('Published', Article::where('status', 'published')->count())
                ->description('Live articles')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('primary'),
            
            Stat::make('Draft', Article::where('status', 'draft')->count())
                ->description('Pending articles')
                ->descriptionIcon('heroicon-m-pencil')
                ->color('warning'),
            
            Stat::make('Categories', Category::count())
                ->description('Total categories')
                ->descriptionIcon('heroicon-m-folder')
                ->color('info'),
            
            Stat::make('Authors', Author::count())
                ->description('Total authors')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('info'),
            
            Stat::make('Total Views', Article::sum('views'))
                ->description('All time views')
                ->descriptionIcon('heroicon-m-eye')
                ->color('success'),
        ];
    }
}

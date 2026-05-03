<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\ArticleAutomationService;

class FetchNews extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:fetch {--source=both : Source to fetch from (newsapi, rss, both)} {--limit=25 : Number of articles to fetch}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Automatically fetch news from APIs and RSS feeds, process with AI, and create articles';

    /**
     * Execute the console command.
     */
    public function handle(ArticleAutomationService $automation)
    {
        $this->info('🚀 Starting news automation...');
        $this->newLine();

        $source = $this->option('source');
        $limit = $this->option('limit');

        $this->info("Source: {$source}");
        $this->info("Limit: {$limit}");
        $this->newLine();

        $bar = $this->output->createProgressBar();
        $bar->start();

        $result = $automation->autoFetchAndCreate($source, $limit);

        $bar->finish();
        $this->newLine(2);

        $this->info('✅ Automation complete!');
        $this->newLine();
        $this->table(
            ['Metric', 'Count'],
            [
                ['Total Fetched', $result['total_fetched']],
                ['Created', $result['created']],
                ['Skipped (Duplicates)', $result['skipped']],
            ]
        );

        return Command::SUCCESS;
    }
}

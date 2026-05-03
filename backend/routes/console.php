<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Schedule automatic news fetching every 6 hours
Schedule::command('news:fetch --source=both --limit=25')
    ->everySixHours()
    ->withoutOverlapping()
    ->runInBackground();


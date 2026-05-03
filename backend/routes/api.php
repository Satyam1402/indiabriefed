<?php

use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\ChatController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/articles', [ArticleController::class, 'index'])->name('api.articles.index');
    Route::get('/articles/{slug}', [ArticleController::class, 'show'])->name('api.articles.show');
    Route::get('/articles/{slug}/related', [ArticleController::class, 'related']);
    
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{slug}', [CategoryController::class, 'show']);
    
    Route::get('/search', [SearchController::class, 'search']);
    
    // Chat API
    Route::post('/chat', [ChatController::class, 'chat']);
    Route::get('/chat/suggestions', [ChatController::class, 'suggestions']);
});

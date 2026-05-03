<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Http\Resources\ArticleResource;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::published()->with(['category', 'author'])
            ->orderBy('published_at', 'desc');

        if ($request->category) {
            $query->whereHas('category', fn($q) => $q->where('slug', $request->category));
        }

        if ($request->featured) {
            $query->where('is_featured', true);
        }

        if ($request->breaking) {
            $query->where('is_breaking', true);
        }

        $articles = $query->paginate($request->limit ?? 10);
        return ArticleResource::collection($articles);
    }

    public function show($slug)
    {
        $article = Article::published()
            ->with(['category', 'author'])
            ->where('slug', $slug)
            ->firstOrFail();

        $article->increment('views');

        return new ArticleResource($article);
    }

    public function related($slug)
    {
        $article = Article::where('slug', $slug)->firstOrFail();
        $related = Article::published()
            ->where('category_id', $article->category_id)
            ->where('id', '!=', $article->id)
            ->with(['category'])
            ->limit(3)
            ->get();
        
        return ArticleResource::collection($related);
    }
}

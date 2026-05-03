<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'               => $this->id,
            'title'            => $this->title,
            'slug'             => $this->slug,
            'excerpt'          => $this->excerpt,
            'content'          => $this->when($request->routeIs('api.articles.show'), $this->content),
            'thumbnail_url'    => $this->thumbnail_url,
            'category'         => [
                'name'  => $this->category?->name,
                'slug'  => $this->category?->slug,
                'color' => $this->category?->color,
            ],
            'author'           => $this->author ? ['name' => $this->author->name] : null,
            'is_breaking'      => $this->is_breaking,
            'is_featured'      => $this->is_featured,
            'views'            => $this->views,
            'read_time'        => $this->read_time,
            'tags'             => $this->tags ?? [],
            'meta_title'       => $this->meta_title,
            'meta_description' => $this->meta_description,
            'published_at'     => $this->published_at?->toISOString(),
        ];
    }
}

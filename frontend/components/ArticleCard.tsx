'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Article } from '@/lib/api'
import { formatDate, getImageUrl } from '@/lib/utils'
import { useState } from 'react'

interface ArticleCardProps {
  article: Article
  featured?: boolean
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const [imgError, setImgError] = useState(false)
  const imageUrl = imgError 
    ? 'https://placehold.co/800x600/c62828/white?text=IndiaBriefed'
    : getImageUrl(article.thumbnail_url)

  if (featured) {
    return (
      <Link href={`/article/${article.slug}`} className="group block">
        <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImgError(true)}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-white">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
              <span
                className="px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium"
                style={{ backgroundColor: article.category.color }}
              >
                {article.category.name}
              </span>
              {article.is_breaking && (
                <span className="bg-red-600 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium animate-pulse">
                  🔴 Breaking
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 group-hover:text-[#c62828] transition line-clamp-2 sm:line-clamp-3">
              {article.title}
            </h2>
            <p className="text-gray-200 mb-2 sm:mb-4 line-clamp-2 text-sm sm:text-base">{article.excerpt}</p>
            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-300 flex-wrap">
              <span>{formatDate(article.published_at)}</span>
              <span className="hidden sm:inline">•</span>
              <span>{article.read_time} min read</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">{article.views} views</span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/article/${article.slug}`} className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      <div className="relative h-48 bg-gray-200">
        <Image
          src={imageUrl}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImgError(true)}
        />
        {article.is_breaking && (
          <span className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium animate-pulse">
            🔴 Breaking
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="px-2 py-1 rounded text-xs font-medium text-white"
            style={{ backgroundColor: article.category.color }}
          >
            {article.category.name}
          </span>
          <span className="text-xs text-gray-500">{formatDate(article.published_at)}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-[#c62828] transition line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{article.read_time} min read</span>
          <span>{article.views} views</span>
        </div>
      </div>
    </Link>
  )
}

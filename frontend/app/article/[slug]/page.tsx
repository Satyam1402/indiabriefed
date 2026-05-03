'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getArticle, getRelatedArticles, Article } from '@/lib/api'
import { formatDate, getImageUrl, stripHtml } from '@/lib/utils'
import ArticleCard from '@/components/ArticleCard'
import Loading from '@/components/Loading'

export default function ArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  const [article, setArticle] = useState<Article | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    if (slug) {
      setLoading(true)
      Promise.all([
        getArticle(slug),
        getRelatedArticles(slug)
      ])
        .then(([articleData, relatedData]) => {
          setArticle(articleData)
          setRelatedArticles(relatedData)
          setLoading(false)
        })
        .catch((error) => {
          console.error(error)
          setLoading(false)
        })
    }
  }, [slug])

  if (loading) return <Loading />

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
        <Link href="/" className="bg-[#c62828] text-white px-6 py-3 rounded-lg hover:bg-[#a02020] transition">
          Go to Homepage
        </Link>
      </div>
    )
  }

  const imageUrl = imgError
    ? 'https://placehold.co/800x600/c62828/white?text=IndiaBriefed'
    : getImageUrl(article.thumbnail_url)

  return (
    <article className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] bg-gray-900">
        <Image
          src={imageUrl}
          alt={article.title}
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
          onError={() => setImgError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
              <span
                className="px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium text-white"
                style={{ backgroundColor: article.category.color }}
              >
                {article.category.name}
              </span>
              {article.is_breaking && (
                <span className="bg-red-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium animate-pulse">
                  🔴 Breaking News
                </span>
              )}
              {article.is_featured && (
                <span className="bg-yellow-500 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium">
                  ⭐ Featured
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 max-w-4xl">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-gray-200 text-xs sm:text-sm">
              {article.author && <span>By {article.author.name}</span>}
              <span className="hidden sm:inline">•</span>
              <span>{formatDate(article.published_at)}</span>
              <span className="hidden sm:inline">•</span>
              <span>{article.read_time} min read</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">{article.views} views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {article.excerpt && (
              <p className="text-base sm:text-xl text-gray-700 mb-6 sm:mb-8 font-medium leading-relaxed">
                {article.excerpt}
              </p>
            )}

            <div
              className="prose prose-sm sm:prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-a:text-[#c62828] prose-strong:text-gray-800"
              dangerouslySetInnerHTML={{ __html: article.content || '' }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-gray-200 transition"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Share this article</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-700 transition text-xs sm:text-sm">
                  Facebook
                </button>
                <button className="bg-sky-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-sky-600 transition text-xs sm:text-sm">
                  Twitter
                </button>
                <button className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-green-700 transition text-xs sm:text-sm">
                  WhatsApp
                </button>
                <button className="bg-gray-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-gray-700 transition text-xs sm:text-sm">
                  Copy Link
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg lg:sticky lg:top-24">
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Related Articles</h3>
                <div className="space-y-4 sm:space-y-6">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.id}
                      href={`/article/${related.slug}`}
                      className="block group"
                    >
                      <div className="relative h-24 sm:h-32 mb-2 sm:mb-3 rounded overflow-hidden">
                        <Image
                          src={getImageUrl(related.thumbnail_url)}
                          alt={related.title}
                          fill
                          className="object-cover group-hover:scale-105 transition"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <h4 className="font-semibold text-sm sm:text-base text-gray-800 group-hover:text-[#c62828] transition line-clamp-2 mb-1 sm:mb-2">
                        {related.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600">{formatDate(related.published_at)}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

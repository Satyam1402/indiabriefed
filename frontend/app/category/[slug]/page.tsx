'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getArticles, getCategory, Article, Category } from '@/lib/api'
import ArticleCard from '@/components/ArticleCard'
import Pagination from '@/components/Pagination'
import Loading from '@/components/Loading'

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [category, setCategory] = useState<Category | null>(null)
  const [articles, setArticles] = useState<Article[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      getCategory(slug)
        .then(setCategory)
        .catch(console.error)
    }
  }, [slug])

  useEffect(() => {
    if (slug) {
      setLoading(true)
      getArticles({ category: slug, page: currentPage, limit: 12 })
        .then((response) => {
          setArticles(response.data)
          setTotalPages(response.meta.last_page)
          setLoading(false)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        })
        .catch((error) => {
          console.error(error)
          setLoading(false)
        })
    }
  }, [slug, currentPage])

  if (loading && !category) return <Loading />

  return (
    <div className="bg-white">
      {/* Category Header */}
      {category && (
        <div
          className="py-16 text-white"
          style={{ backgroundColor: category.color }}
        >
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
            {category.description && (
              <p className="text-lg opacity-90 max-w-2xl">{category.description}</p>
            )}
            {category.articles_count !== undefined && (
              <p className="mt-4 text-sm opacity-80">
                {category.articles_count} {category.articles_count === 1 ? 'article' : 'articles'}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Articles */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <Loading />
        ) : articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No articles found in this category.</p>
            <p className="text-gray-500 mt-2">Check back later for updates!</p>
          </div>
        )}
      </div>
    </div>
  )
}

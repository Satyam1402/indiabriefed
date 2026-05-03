'use client'

import { useEffect, useState } from 'react'
import { getArticles, Article } from '@/lib/api'
import ArticleCard from '@/components/ArticleCard'
import Pagination from '@/components/Pagination'
import Loading from '@/components/Loading'

export default function Home() {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch featured articles
    getArticles({ featured: true, limit: 3 })
      .then((response) => setFeaturedArticles(response.data))
      .catch(console.error)
  }, [])

  useEffect(() => {
    setLoading(true)
    getArticles({ page: currentPage, limit: 12 })
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
  }, [currentPage])

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Featured Stories</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {featuredArticles[0] && (
              <div className="lg:col-span-2">
                <ArticleCard article={featuredArticles[0]} featured />
              </div>
            )}
            {featuredArticles.slice(1, 3).map((article) => (
              <div key={article.id}>
                <ArticleCard article={article} featured />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Latest Articles */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Latest News</h2>
        {loading ? (
          <Loading />
        ) : articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
          <div className="text-center py-12 sm:py-20">
            <p className="text-gray-600 text-base sm:text-lg">No articles found.</p>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">Check back later for updates!</p>
          </div>
        )}
      </section>
    </div>
  )
}

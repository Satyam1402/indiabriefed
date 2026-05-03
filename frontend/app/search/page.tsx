'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { searchArticles, Article } from '@/lib/api'
import ArticleCard from '@/components/ArticleCard'
import Loading from '@/components/Loading'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (query) {
      setLoading(true)
      searchArticles(query)
        .then((data) => {
          setArticles(data)
          setLoading(false)
        })
        .catch((error) => {
          console.error(error)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [query])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Search Results</h1>
        {query && (
          <p className="text-gray-600">
            Showing results for: <span className="font-semibold">"{query}"</span>
          </p>
        )}
      </div>

      {loading ? (
        <Loading />
      ) : !query ? (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">Please enter a search query.</p>
        </div>
      ) : articles.length > 0 ? (
        <>
          <p className="text-gray-600 mb-6">{articles.length} {articles.length === 1 ? 'result' : 'results'} found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">No articles found for "{query}"</p>
          <p className="text-gray-500 mt-2">Try different keywords or browse our categories.</p>
        </div>
      )}
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getArticles, Article } from '@/lib/api'

export default function BreakingNews() {
  const [breakingNews, setBreakingNews] = useState<Article[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    getArticles({ breaking: true, limit: 5 })
      .then((response) => setBreakingNews(response.data))
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (breakingNews.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % breakingNews.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [breakingNews.length])

  if (breakingNews.length === 0) return null

  return (
    <div className="bg-[#c62828] text-white py-3 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          <span className="bg-white text-[#c62828] px-3 py-1 rounded font-bold text-sm whitespace-nowrap animate-pulse">
            🔴 BREAKING
          </span>
          <div className="flex-1 overflow-hidden">
            <Link
              href={`/article/${breakingNews[currentIndex].slug}`}
              className="block hover:underline truncate"
            >
              {breakingNews[currentIndex].title}
            </Link>
          </div>
          {breakingNews.length > 1 && (
            <div className="flex gap-1">
              {breakingNews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition ${
                    index === currentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

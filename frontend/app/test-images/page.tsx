'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function ImageTest() {
  const [articles, setArticles] = useState<any[]>([])

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/articles?limit=5')
      .then(res => res.json())
      .then(data => {
        console.log('Articles:', data.data)
        setArticles(data.data)
      })
      .catch(err => console.error('Error:', err))
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Image Test Page</h1>
      
      <div className="space-y-8">
        {articles.map((article) => (
          <div key={article.id} className="border p-4 rounded">
            <h2 className="text-xl font-bold mb-2">{article.title}</h2>
            <p className="text-sm text-gray-600 mb-4">Image URL: {article.thumbnail_url}</p>
            
            {/* Test 1: Direct img tag */}
            <div className="mb-4">
              <p className="font-semibold mb-2">Test 1: Regular img tag</p>
              <img 
                src={article.thumbnail_url} 
                alt={article.title}
                className="w-full h-48 object-cover rounded"
              />
            </div>

            {/* Test 2: Next.js Image with unoptimized */}
            <div className="mb-4">
              <p className="font-semibold mb-2">Test 2: Next.js Image (unoptimized)</p>
              <div className="relative w-full h-48">
                <Image
                  src={article.thumbnail_url}
                  alt={article.title}
                  fill
                  className="object-cover rounded"
                  unoptimized
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

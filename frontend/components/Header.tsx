'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getCategories, Category } from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [categories, setCategories] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#c62828] text-white py-2">
        <div className="container mx-auto px-3 sm:px-4 flex justify-between items-center text-xs sm:text-sm">
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="truncate">📰 Your Daily Dose of India News</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>🇮🇳 UPSC • SSC • Current Affairs</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#c62828]">
              IndiaBriefed
            </div>
          </Link>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#c62828] text-sm"
            />
            <button
              type="submit"
              className="bg-[#c62828] text-white px-4 sm:px-6 py-2 rounded-r-lg hover:bg-[#a02020] transition text-sm"
            >
              Search
            </button>
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden mt-3 flex">
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#c62828] text-sm"
          />
          <button
            type="submit"
            className="bg-[#c62828] text-white px-4 py-2 rounded-r-lg hover:bg-[#a02020] transition text-sm"
          >
            Search
          </button>
        </form>
      </div>

      {/* Navigation */}
      <nav className={`bg-gray-50 border-t ${mobileMenuOpen ? 'block' : 'hidden md:block'}`}>
        <div className="container mx-auto px-3 sm:px-4">
          <ul className="flex flex-col md:flex-row md:items-center md:space-x-4 lg:space-x-6 py-2 sm:py-3">
            <li>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 md:py-0 text-sm sm:text-base text-gray-700 hover:text-[#c62828] font-medium transition"
              >
                Home
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/category/${category.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 md:py-0 text-sm sm:text-base text-gray-700 hover:text-[#c62828] transition"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}

import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  color: string
  articles_count?: number
}

export interface Author {
  name: string
  bio?: string
  photo_url?: string
}

export interface Article {
  id: number
  title: string
  slug: string
  excerpt: string
  content?: string
  thumbnail_url: string | null
  category: {
    name: string
    slug: string
    color: string
  }
  author: Author | null
  is_breaking: boolean
  is_featured: boolean
  views: number
  read_time: number
  tags: string[]
  meta_title: string | null
  meta_description: string | null
  published_at: string
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export const getArticles = async (params?: {
  category?: string
  featured?: boolean
  breaking?: boolean
  limit?: number
  page?: number
}): Promise<PaginatedResponse<Article>> => {
  const { data } = await api.get('/articles', { params })
  return data
}

export const getArticle = async (slug: string): Promise<Article> => {
  const { data } = await api.get(`/articles/${slug}`)
  return data.data
}

export const getRelatedArticles = async (slug: string): Promise<Article[]> => {
  const { data } = await api.get(`/articles/${slug}/related`)
  return data.data
}

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get('/categories')
  return data.data
}

export const getCategory = async (slug: string): Promise<Category> => {
  const { data } = await api.get(`/categories/${slug}`)
  return data.data
}

export const searchArticles = async (query: string): Promise<Article[]> => {
  const { data } = await api.get('/search', { params: { q: query } })
  return data.data
}

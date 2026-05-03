import { format, formatDistanceToNow } from 'date-fns'

export const formatDate = (dateString: string): string => {
  return format(new Date(dateString), 'MMM dd, yyyy')
}

export const formatRelativeTime = (dateString: string): string => {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true })
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '')
}

export const getImageUrl = (path: string | null): string => {
  if (!path) return 'https://placehold.co/800x600/c62828/white?text=IndiaBriefed'
  if (path.startsWith('http')) return path
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:8000'
  return `${baseUrl}/storage/${path}`
}

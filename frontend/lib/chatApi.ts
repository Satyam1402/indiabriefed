import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface ChatResponse {
  response: string
  sources: Array<{
    title: string
    slug: string
    excerpt: string
    category: string
    published_at: string
  }>
}

export const sendChatMessage = async (message: string): Promise<ChatResponse> => {
  const { data } = await api.post('/chat', { message })
  return data.data
}

export const getSuggestions = async (): Promise<string[]> => {
  const { data } = await api.get('/chat/suggestions')
  return data.data
}

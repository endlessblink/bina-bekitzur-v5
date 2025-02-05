import { useEffect, useState } from 'react'
import { client } from '@/sanity/config'
import { AIModel } from '@/lib/types/models'

export const useModels = (query = '*[_type == "model"]') => {
  const [models, setModels] = useState<AIModel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true)
        const data = await client.fetch(query)
        setModels(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch models'))
      } finally {
        setLoading(false)
      }
    }

    fetchModels()
  }, [query])

  return { models, loading, error }
}

export const useFeaturedModels = () => {
  return useModels('*[_type == "model" && featured == true]')
}

export const useModelsByCategory = (categoryId: string) => {
  return useModels(`*[_type == "model" && references("${categoryId}")]`)
}

export const useModelBySlug = (slug: string) => {
  const [model, setModel] = useState<AIModel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchModel = async () => {
      try {
        setLoading(true)
        const data = await client.fetch(
          '*[_type == "model" && slug.current == $slug][0]',
          { slug }
        )
        setModel(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch model'))
      } finally {
        setLoading(false)
      }
    }

    fetchModel()
  }, [slug])

  return { model, loading, error }
}

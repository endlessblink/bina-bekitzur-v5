'use client'

import { Metadata } from 'next'
import { ModelCard } from '@/app/components/shared/ModelCard'
import { getModels, getCategories } from '@/lib/sanity/hooks'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useDebounce } from '@/lib/hooks/useDebounce'
import { Model, Category } from '@/types'

const pricingOptions = [
  { id: 'all', name: 'הכל' },
  { id: 'free', name: 'חינם' },
  { id: 'freemium', name: 'Freemium' },
  { id: 'paid', name: 'בתשלום' },
]

export const metadata: Metadata = {
  title: 'מודלים - בינה בקיצור',
  description: 'מאגר מודלים של בינה מלאכותית עם הסברים בעברית',
}

export default function ModelsPage() {
  const [models, setModels] = useState<Model[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedModels, setSelectedModels] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedPricing, setSelectedPricing] = useState('all')
  const debouncedSearch = useDebounce(searchQuery, 300)

  useEffect(() => {
    const fetchData = async () => {
      const [modelsData, categoriesData] = await Promise.all([
        getModels(),
        getCategories()
      ])
      setModels(modelsData)
      setCategories(categoriesData)
    }
    fetchData()
  }, [])

  const filteredModels = models.filter(model => {
    const matchesSearch = !debouncedSearch || 
      model.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      model.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      model.categories?.some(cat => cat.name.toLowerCase().includes(debouncedSearch.toLowerCase()))

    const matchesCategory = !selectedCategory || 
      model.categories?.some(cat => cat._id === selectedCategory)

    return matchesSearch && matchesCategory
  })

  const handleModelClick = (modelId: string) => {
    setSelectedModels(prev => {
      if (prev.includes(modelId)) {
        return prev.filter(id => id !== modelId)
      }
      if (prev.length < 2) {
        return [...prev, modelId]
      }
      return prev
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-12 lg:p-24">
      <div className="z-10 w-full items-center justify-between text-sm lg:flex">
        <div className="w-full space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <input
              type="text"
              placeholder="חיפוש מודלים..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border p-2 md:w-64"
            />
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="w-full rounded-lg border p-2 md:w-48"
            >
              <option value="">כל הקטגוריות</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Models Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredModels.map((model) => (
              <motion.div
                key={model._id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <ModelCard
                  model={model}
                  isSelected={selectedModels.includes(model._id)}
                  onClick={() => handleModelClick(model._id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
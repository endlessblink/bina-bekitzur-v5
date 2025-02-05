import { createClient } from '@sanity/client'
import { models } from '@/lib/data/models'
import { categories } from '@/lib/data/categories'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-02-05',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function migrate() {
  try {
    console.log('Starting migration...')
    console.log('Using project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
    console.log('Using dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)

    // Migrate categories first
    console.log('Migrating categories...')
    const categoryMap = new Map()
    
    for (const category of categories) {
      const doc = {
        _type: 'category',
        name: category.name,
        slug: {
          _type: 'slug',
          current: category.id
        },
        description: category.description || ''
      }
      
      const result = await client.create(doc)
      categoryMap.set(category.id, result._id)
      console.log(`Created category: ${category.name}`)
    }

    // Migrate models
    console.log('Migrating models...')
    for (const model of models) {
      const doc = {
        _type: 'model',
        name: model.name,
        slug: {
          _type: 'slug',
          current: model.id
        },
        description: model.description,
        advantages: model.advantages || [],
        disadvantages: model.disadvantages || [],
        websiteUrl: model.websiteUrl,
        isFeatured: model.featured || false,
        categories: model.categories?.map(catId => ({
          _type: 'reference',
          _ref: categoryMap.get(catId)
        })) || []
      }

      await client.create(doc)
      console.log(`Created model: ${model.name}`)
    }

    console.log('Migration completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
  }
}

migrate()

import { createClient } from '@sanity/client';
import * as fs from 'fs';
import * as path from 'path';

interface SanityClient {
  create: (document: any) => Promise<any>;
  createIfNotExists: (document: any) => Promise<any>;
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Helper function to create a document
async function createDocument(doc: any, type: string) {
  try {
    const result = await client.create({
      _type: type,
      ...doc
    })
    console.log(`✓ Created ${type}: ${result.name || result.title}`)
    return result
  } catch (error) {
    console.error(`✗ Error creating ${type}:`, error)
    return null
  }
}

async function migrate() {
  // Read current data
  const modelsPath = path.join(process.cwd(), 'src/lib/data/models.ts')
  const modelsContent = fs.readFileSync(modelsPath, 'utf8')
  
  // Extract and parse the data (you'll need to modify this based on your data structure)
  // This is a placeholder - you'll need to implement the actual data extraction
  const models = [] // Extract your models here
  const categories = [] // Extract your categories here
  const tags = [] // Extract your tags here

  console.log('Starting migration...')

  // Create categories first
  console.log('\nMigrating categories...')
  const categoryMap = new Map()
  for (const category of categories) {
    const result = await createDocument(category, 'category')
    if (result) {
      categoryMap.set(category.id, result._id)
    }
  }

  // Create tags
  console.log('\nMigrating tags...')
  const tagMap = new Map()
  for (const tag of tags) {
    const result = await createDocument(tag, 'tag')
    if (result) {
      tagMap.set(tag.id, result._id)
    }
  }

  // Create models
  console.log('\nMigrating models...')
  for (const model of models) {
    // Map category and tag references
    const sanityModel = {
      ...model,
      categories: model.categories.map((id: string) => ({
        _type: 'reference',
        _ref: categoryMap.get(id)
      })),
      tags: model.tags.map((id: string) => ({
        _type: 'reference',
        _ref: tagMap.get(id)
      }))
    }
    await createDocument(sanityModel, 'model')
  }

  console.log('\nMigration complete!')
}

// Run the migration
migrate().catch(console.error)

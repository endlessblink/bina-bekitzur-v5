import { createClient } from '@sanity/client';
import { Model } from '@/types';

interface SanityDocument {
  _type: string;
  name: string;
  description: string;
  [key: string]: unknown;
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function migrateModels() {
  try {
    const models: Model[] = require('@/lib/data/models');

    for (const model of models) {
      const doc: SanityDocument = {
        _type: 'model',
        name: model.name,
        description: model.description,
      };

      await client.createIfNotExists(doc);
      console.log(`Created model: ${model.name}`);
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrateModels();

import { models, categories } from '../data/models';
import { AIModel, Category } from '../types/models';

export function getAllModels(): AIModel[] {
  return models;
}

export function getModelBySlug(slug: string): AIModel | undefined {
  return models.find(model => model.slug === slug);
}

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(category => category.id === id);
}

// Search functionality
export function searchModels(query: string, options?: { 
  categoryId?: string;
  subcategoryId?: string;
  pricingType?: 'free' | 'freemium' | 'paid';
}): AIModel[] {
  let filteredModels = models;
  
  // Apply category filter if specified
  if (options?.categoryId) {
    filteredModels = filteredModels.filter(model => 
      model.categories.includes(options.categoryId!)
    );
  }
  
  // Apply subcategory filter if specified
  if (options?.subcategoryId) {
    filteredModels = filteredModels.filter(model => 
      model.subcategories.includes(options.subcategoryId!)
    );
  }
  
  // Apply pricing filter if specified
  if (options?.pricingType) {
    filteredModels = filteredModels.filter(model => 
      model.pricing.type === options.pricingType
    );
  }
  
  // If no search query, return the filtered results
  if (!query) return filteredModels;
  
  // Apply search filter
  const searchTerm = query.toLowerCase();
  return filteredModels.filter(model => 
    model.name.toLowerCase().includes(searchTerm) ||
    model.description.toLowerCase().includes(searchTerm) ||
    (model.shortDescription?.toLowerCase().includes(searchTerm)) ||
    model.advantages.some(adv => adv.toLowerCase().includes(searchTerm)) ||
    model.disadvantages.some(dis => dis.toLowerCase().includes(searchTerm))
  );
}

// Compare models
export function compareModels(modelIds: string[]): AIModel[] {
  return models.filter(model => modelIds.includes(model.id));
}
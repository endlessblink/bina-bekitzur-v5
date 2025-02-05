export type PricingType = 'free' | 'freemium' | 'paid';

export interface Pricing {
  type: PricingType;
  startingPrice?: number;
  currency?: string;
}

export interface AIModel {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  logoUrl: string;
  websiteUrl?: string;
  advantages: string[];
  disadvantages: string[];
  hasAPI: boolean;
  pricing: Pricing;
  categories: string[];
  subcategories: string[];
  featured: boolean;
  tags: string[];
  features: string[];
  technology: {
    language: string;
    framework: string;
    specialties: string[];
  };
  rating: {
    overall: number;  // 1-5
    features: number;
    technology: number;
    pricing: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Tag {
  id: string;
  name: string;
}

// Helper type for creating new models
export type CreateAIModel = Omit<AIModel, 'id' | 'createdAt' | 'updatedAt'>;
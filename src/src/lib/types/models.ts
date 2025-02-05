export type PricingType = 'free' | 'paid' | 'freemium';

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
  logoUrl?: string;
  websiteUrl?: string;
  advantages: string[];
  disadvantages: string[];
  pricing: Pricing;
  hasAPI: boolean;
  categories: string[]; // category slugs
  tags: string[];      // tag names
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Tag {
  id: string;
  name: string;
}

// Helper type for creating new models
export type CreateAIModel = Omit<AIModel, 'id' | 'createdAt' | 'updatedAt'>; 
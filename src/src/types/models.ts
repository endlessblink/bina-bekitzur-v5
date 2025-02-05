export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  parentId: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories?: Subcategory[];
}

export interface AIModel {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  categories: string[];
  subcategories: string[];
  advantages: string[];
  disadvantages: string[];
  hasAPI: boolean;
  pricing: {
    type: 'free' | 'freemium' | 'paid';
    details?: string;
  };
  rating?: number;
  link?: string;
  apiDocs?: string;
}

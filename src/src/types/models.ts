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
  shortDescription: string;
  icon: string; // LineIcons class name
  logoUrl: string; // URL to company logo/favicon
  advantages: string[];
  disadvantages: string[];
  hasAPI: boolean;
  pricing: {
    type: 'free' | 'freemium' | 'paid';
  };
  categories: string[];
  subcategories: string[];
  tags?: string[];
  featured?: boolean; // האם המודל צריך להופיע בעמוד הבית
  createdAt: string;
  updatedAt?: string;
}

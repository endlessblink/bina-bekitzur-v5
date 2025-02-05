export interface Model {
  _id: string
  name: string
  slug: {
    current: string
  }
  description: string
  image?: string
  categories?: Category[]
  advantages?: string[]
  disadvantages?: string[]
  websiteUrl?: string
  isFeatured: boolean
}

export interface Category {
  _id: string
  name: string
  slug: {
    current: string
  }
  description?: string
  icon?: string
}

export interface Tag {
  _id: string
  name: string
  slug: {
    current: string
  }
  description?: string
}

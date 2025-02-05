import { groq } from 'next-sanity'
import { client } from './client'
import { Model, Category, Tag } from '@/types'

const modelsQuery = groq`*[_type == "model"] {
  _id,
  name,
  slug,
  description,
  "image": image.asset->url,
  advantages,
  disadvantages,
  websiteUrl,
  isFeatured,
  "categories": categories[]->{ _id, name, slug }
}`

const categoriesQuery = groq`*[_type == "category"] {
  _id,
  name,
  slug,
  description,
  "icon": icon.asset->url
}`

const tagsQuery = groq`*[_type == "tag"] {
  _id,
  name,
  slug,
  description
}`

export async function getModels(): Promise<Model[]> {
  return client.fetch(modelsQuery)
}

export async function getCategories(): Promise<Category[]> {
  return client.fetch(categoriesQuery)
}

export async function getTags(): Promise<Tag[]> {
  return client.fetch(tagsQuery)
}

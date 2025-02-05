import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const config = {
  projectId: 'afq369n9',
  dataset: 'production',
  apiVersion: '2024-02-05',
  useCdn: false,
}

export const client = createClient(config)

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

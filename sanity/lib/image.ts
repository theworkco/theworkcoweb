import imageUrlBuilder from '@sanity/image-url'
import {client} from './client'

const builder = imageUrlBuilder(client)

export function imageUrl(source: unknown) {
  return source ? builder.image(source).auto('format').fit('max').url() : undefined
}

export type ItemType = 'image' | 'link' | 'quote' | 'film' | 'music' | 'place' | 'fashion'

export interface Tag {
  id: string
  name: string
  slug: string
  count?: number
}

export interface Item {
  id: string
  type: ItemType
  title?: string
  description?: string
  // For images: URL of stored thumbnail or original
  imageUrl?: string
  // For links: original source URL
  sourceUrl?: string
  // For quotes/text: the text content
  content?: string
  // Free-form notes added by user
  notes?: string
  tags: Tag[]
  savedAt: string   // ISO date string
  updatedAt: string
}

export interface ItemsResponse {
  items: Item[]
  total: number
  page: number
  perPage: number
}

export interface TagsResponse {
  tags: Tag[]
}

export interface CreateItemInput {
  type: ItemType
  title?: string
  description?: string
  imageUrl?: string
  sourceUrl?: string
  content?: string
  notes?: string
  tagNames?: string[]
}

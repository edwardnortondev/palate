import { describe, it, expectTypeOf } from 'vitest'
import type { Item, ItemType, Tag, CreateItemInput, ItemsResponse, TagsResponse } from '../../shared/types'

describe('shared types', () => {
  it('Item has required fields', () => {
    expectTypeOf<Item>().toHaveProperty('id')
    expectTypeOf<Item>().toHaveProperty('type')
    expectTypeOf<Item>().toHaveProperty('tags')
    expectTypeOf<Item>().toHaveProperty('savedAt')
    expectTypeOf<Item>().toHaveProperty('updatedAt')
  })

  it('ItemType is a union of valid types', () => {
    expectTypeOf<'image'>().toMatchTypeOf<ItemType>()
    expectTypeOf<'quote'>().toMatchTypeOf<ItemType>()
    expectTypeOf<'link'>().toMatchTypeOf<ItemType>()
    expectTypeOf<'film'>().toMatchTypeOf<ItemType>()
    expectTypeOf<'music'>().toMatchTypeOf<ItemType>()
    expectTypeOf<'place'>().toMatchTypeOf<ItemType>()
    expectTypeOf<'fashion'>().toMatchTypeOf<ItemType>()
  })

  it('Tag has required fields', () => {
    expectTypeOf<Tag>().toHaveProperty('id')
    expectTypeOf<Tag>().toHaveProperty('name')
    expectTypeOf<Tag>().toHaveProperty('slug')
  })

  it('CreateItemInput has type and optional fields', () => {
    expectTypeOf<CreateItemInput>().toHaveProperty('type')
    expectTypeOf<CreateItemInput>().toHaveProperty('title')
    expectTypeOf<CreateItemInput>().toHaveProperty('tagNames')
  })

  it('ItemsResponse has items and pagination', () => {
    expectTypeOf<ItemsResponse>().toHaveProperty('items')
    expectTypeOf<ItemsResponse>().toHaveProperty('total')
    expectTypeOf<ItemsResponse>().toHaveProperty('page')
    expectTypeOf<ItemsResponse>().toHaveProperty('perPage')
  })

  it('TagsResponse has tags array', () => {
    expectTypeOf<TagsResponse>().toHaveProperty('tags')
  })
})

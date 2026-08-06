import {defineArrayMember, defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: r => r.required()}),
    defineField({name: 'slug', type: 'slug', options: {source: 'title', maxLength: 96}, validation: r => r.required()}),
    defineField({name: 'excerpt', type: 'text', rows: 3}),
    defineField({name: 'category', type: 'string'}),
    defineField({name: 'featuredImage', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', type: 'string'})]}),
    defineField({name: 'publishedAt', type: 'datetime', initialValue: () => new Date().toISOString()}),
    defineField({name: 'readMinutes', title: 'Reading time (minutes)', type: 'number', initialValue: 4}),
    defineField({name: 'featured', type: 'boolean', initialValue: false}),
    defineField({name: 'body', type: 'array', of: [
      defineArrayMember({type: 'block'}),
      defineArrayMember({type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', type: 'string'})]}),
    ]}),
    defineField({name: 'seoTitle', title: 'SEO title', type: 'string'}),
    defineField({name: 'seoDescription', title: 'SEO description', type: 'text', rows: 2}),
  ],
  preview: {select: {title: 'title', subtitle: 'category', media: 'featuredImage'}},
})

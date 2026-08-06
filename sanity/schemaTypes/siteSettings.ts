import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({name: 'siteTitle', type: 'string', initialValue: 'theworkco'}),
    defineField({name: 'siteDescription', type: 'text', rows: 2}),
    defineField({name: 'contactEmail', type: 'string'}),
    defineField({name: 'navigation', type: 'array', of: [defineArrayMember({type: 'object', fields: [
      defineField({name: 'label', type: 'string'}),
      defineField({name: 'href', title: 'Link', type: 'string'}),
    ], preview: {select: {title: 'label', subtitle: 'href'}}})]}),
    defineField({name: 'footerText', type: 'text', rows: 2}),
    defineField({name: 'socialLinks', type: 'array', of: [defineArrayMember({type: 'object', fields: [
      defineField({name: 'label', type: 'string'}),
      defineField({name: 'href', title: 'Link', type: 'url'}),
    ], preview: {select: {title: 'label', subtitle: 'href'}}})]}),
  ],
})

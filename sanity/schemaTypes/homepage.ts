import {defineArrayMember, defineField, defineType} from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  initialValue: {
    title: 'Homepage',
    eyebrow: 'Lorem ipsum dolor sit',
    heroTitle: 'Lorem ipsum dolor sit amet.',
    heroAccent: 'dolor sit amet.',
    heroBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    primaryButton: {label: 'Lorem ipsum', href: '#grid'},
    secondaryButton: {label: 'Dolor sit amet', href: '#about'},
    services: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur', 'Adipiscing elit', 'Sed do eiusmod'],
    projectsEyebrow: 'Lorem ipsum',
    projectsTitle: 'Dolor sit amet, consectetur elit.',
    projectsIntro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    statementEyebrow: 'Dolor sit amet',
    statementQuote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    statementBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
    processEyebrow: 'Sed do eiusmod',
    processTitle: 'Lorem ipsum, dolor sit amet.',
    ctaEyebrow: 'Lorem ipsum dolor',
    ctaTitle: 'Consectetur adipiscing elit?',
    ctaButton: {label: "Let's ipsum", href: '#'},
  },
  fields: [
    defineField({name: 'title', title: 'Internal title', type: 'string', validation: r => r.required()}),
    defineField({name: 'eyebrow', title: 'Hero eyebrow', type: 'string'}),
    defineField({name: 'heroTitle', title: 'Hero title', type: 'string'}),
    defineField({name: 'heroAccent', title: 'Hero highlighted line', type: 'string'}),
    defineField({name: 'heroBody', title: 'Hero description', type: 'text', rows: 3}),
    buttonField('primaryButton', 'Primary button'),
    buttonField('secondaryButton', 'Secondary button'),
    defineField({name: 'services', title: 'Service strip', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'projectsEyebrow', title: 'Projects eyebrow', type: 'string'}),
    defineField({name: 'projectsTitle', title: 'Projects title', type: 'string'}),
    defineField({name: 'projectsIntro', title: 'Projects introduction', type: 'text', rows: 3}),
    defineField({
      name: 'projects', title: 'Project cards', type: 'array', of: [defineArrayMember({
        type: 'object', name: 'projectCard', fields: [
          defineField({name: 'number', type: 'string'}),
          defineField({name: 'title', type: 'string'}),
          defineField({name: 'tag', type: 'string'}),
          defineField({name: 'href', title: 'Link', type: 'string'}),
          defineField({name: 'image', type: 'image', options: {hotspot: true}}),
          defineField({name: 'tone', type: 'string', options: {list: ['lime', 'forest', 'paper', 'olive', 'ink', 'mist']}}),
          defineField({name: 'size', type: 'string', options: {list: ['standard', 'wide', 'tall']}}),
        ], preview: {select: {title: 'title', subtitle: 'tag', media: 'image'}},
      })],
    }),
    defineField({name: 'statementEyebrow', title: 'Statement eyebrow', type: 'string'}),
    defineField({name: 'statementQuote', title: 'Statement quote', type: 'text', rows: 3}),
    defineField({name: 'statementBody', title: 'Statement body', type: 'text', rows: 3}),
    buttonField('statementButton', 'Statement button'),
    defineField({name: 'processEyebrow', title: 'Process eyebrow', type: 'string'}),
    defineField({name: 'processTitle', title: 'Process title', type: 'string'}),
    defineField({
      name: 'processSteps', title: 'Process steps', type: 'array', of: [defineArrayMember({
        type: 'object', fields: [
          defineField({name: 'number', type: 'string'}),
          defineField({name: 'title', type: 'string'}),
          defineField({name: 'copy', title: 'Description', type: 'text', rows: 2}),
        ], preview: {select: {title: 'title', subtitle: 'number'}},
      })],
    }),
    defineField({name: 'ctaEyebrow', title: 'CTA eyebrow', type: 'string'}),
    defineField({name: 'ctaTitle', title: 'CTA title', type: 'string'}),
    buttonField('ctaButton', 'CTA button'),
  ],
})

function buttonField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({name: 'label', type: 'string'}),
      defineField({name: 'href', title: 'Link', type: 'string'}),
    ],
  })
}

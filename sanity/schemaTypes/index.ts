import type {SchemaTypeDefinition} from 'sanity'
import {homepage} from './homepage'
import {post} from './post'
import {siteSettings} from './siteSettings'

export const schemaTypes: SchemaTypeDefinition[] = [homepage, post, siteSettings]

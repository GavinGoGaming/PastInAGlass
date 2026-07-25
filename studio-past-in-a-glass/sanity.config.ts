import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { tags } from 'sanity-plugin-tags-v4'

export default defineConfig({
  name: 'default',
  title: 'Past in a Glass',

  projectId: 'rkr6d6m0',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), tags()],

  schema: {
    types: schemaTypes,
  },
})

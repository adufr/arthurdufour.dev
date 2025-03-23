import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      source: 'articles/**',
      type: 'page',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        published: z.string(),
        slug: z.string(),
      }),
    }),
    projects: defineCollection({
      source: 'projects/**',
      type: 'page',
      schema: z.object({
        name: z.string(),
        slug: z.string(),
        url: z.string().url(),
        description: z.string(),
        github: z.string().url().optional(),
        thumbnail: z.string().url().optional(),
        status: z.enum(['Active', 'Inactive', 'WIP']).optional(),
        author: z.boolean(),

        title: z.string(),
        screenshots: z.array(z.string().url()).optional(),
      }),
    }),
  },
})

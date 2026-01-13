import { z, defineCollection } from 'astro:content'

const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    updated: z.string().optional(),
    tags: z.array(z.string()).default([]),
    affiliate_links: z
      .object({
        primary: z.string().url(),
        secondary: z.array(z.string().url()).optional()
      })
      .optional(),
    rating: z.object({
      overall: z.number().min(0).max(10),
      usability: z.number().min(0).max(10).optional(),
      quality: z.number().min(0).max(10).optional(),
      pricing: z.number().min(0).max(10).optional()
    })
  })
})

export const collections = {
  reviews
}

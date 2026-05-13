import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

const baseContent = {
  title: z.string().min(10),
  description: z.string().min(50),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  status: z.enum(['draft', 'review', 'approved', 'published', 'needs_update']).default('draft'),
  cluster: z.string(),
  intent: z.enum(['informational', 'commercial', 'transactional', 'comparison', 'tutorial']),
  risk: z.enum(['low', 'medium', 'high']).default('medium'),
  affiliate: z.array(z.string()).default([]),
  sources: z.array(z.string().url()).default([]),
  claims: z.array(z.string()).default([]),
  faqs: z.array(z.object({ question: z.string().min(8), answer: z.string().min(30) })).default([]),
  aiAssisted: z.boolean().default(true),
  reviewedBy: z.string().optional(),
  canonical: z.string().url().optional()
};

const schema = z.object(baseContent);

export const collections = {
  tools: defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/tools' }), schema }),
  reviews: defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reviews' }), schema }),
  comparisons: defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/comparisons' }), schema }),
  alternatives: defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/alternatives' }), schema }),
  categories: defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/categories' }), schema }),
  guides: defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }), schema }),
  workflows: defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/workflows' }), schema })
};

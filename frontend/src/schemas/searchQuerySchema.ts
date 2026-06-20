import { z } from 'zod';

export const searchQuerySchema = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  isActive: z.boolean().default(true),
  metadata: z.record(z.string(), z.any()).optional()
});

export type searchQueryType = z.infer<typeof searchQuerySchema>;

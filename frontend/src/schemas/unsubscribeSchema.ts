import { z } from 'zod';

export const unsubscribeSchema = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  isActive: z.boolean().default(true),
  metadata: z.record(z.string(), z.any()).optional()
});

export type unsubscribeType = z.infer<typeof unsubscribeSchema>;

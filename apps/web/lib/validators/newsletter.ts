import { z } from 'zod';

export const NewsletterSchema = z.object({
  email: z.string().email(),
  topics: z.array(z.enum(['all', 'tech', 'cybersecurity'])).min(1, 'Please select at least one topic'),
});
export type Newsletter = z.infer<typeof NewsletterSchema>;

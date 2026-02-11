import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, isSanityConfigured } from '@/sanity/env';

// Re-export the helper function
export { isSanityConfigured };

// Main client for reading data (uses CDN for better performance)
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for faster reads in production
});

// Admin client with write permissions (for migrations/admin tasks)
export const sanityAdminClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

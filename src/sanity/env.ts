export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-11-12'

// Use safe fallbacks so createClient never receives an invalid value at build time.
// isSanityConfigured() guards all actual data fetching.
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder'

// Helper to check if Sanity is configured with a real project
export function isSanityConfigured(): boolean {
  const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const ds = process.env.NEXT_PUBLIC_SANITY_DATASET
  return Boolean(
    id && id !== 'placeholder' && id !== 'your_project_id_here' &&
    ds && ds.trim() !== ''
  )
}

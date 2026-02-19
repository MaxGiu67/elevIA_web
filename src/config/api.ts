/**
 * Centralized API configuration.
 * Single source of truth for the backend API URL used across the app.
 */
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://elevia-api-production.up.railway.app'

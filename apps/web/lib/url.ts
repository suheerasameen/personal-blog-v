/**
 * Unified URL configuration
 * 
 * Uses NEXT_PUBLIC_APP_URL as the single source of truth for the site URL.
 * Falls back to localhost:3000 in development.
 */

const DEFAULT_URL = 'http://localhost:3000';

/**
 * Get the base URL string (without trailing slash)
 */
export function getBaseUrl(): string {
    const url = process.env.NEXT_PUBLIC_APP_URL || DEFAULT_URL;
    // Remove trailing slash if present
    return url.endsWith('/') ? url.slice(0, -1) : url;
}

/**
 * Get the base URL as a URL object
 */
export function getBaseUrlObject(): URL {
    return new URL(getBaseUrl());
}

/**
 * Get the site domain without protocol (e.g., "blog.waqasishaque.me")
 */
export function getSiteDomain(): string {
    const url = getBaseUrlObject();
    return url.host;
}

/**
 * Build an absolute URL from a relative path
 */
export function absoluteUrl(path: string): string {
    const base = getBaseUrl();
    // Ensure path starts with /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${base}${normalizedPath}`;
}

/**
 * Check if we're in development mode
 */
export function isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
}

// Export the base URL for convenience
export const baseUrl = getBaseUrlObject();

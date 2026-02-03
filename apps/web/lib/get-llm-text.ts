import type { InferPageType } from 'fumadocs-core/source';
import { blogSource } from '@/lib/source';

/**
 * Converts a blog page to LLM-friendly text format
 * Used for AI chat functionality to provide context about blog posts
 */
export function getLLMText(page: InferPageType<typeof blogSource>) {
    // Extract text content from structured data if available
    const structuredData = page.data.structuredData;
    let content = '';

    if (structuredData?.contents) {
        content = structuredData.contents
            .map(item => item.content)
            .filter(Boolean)
            .join('\n\n');
    }

    return `# ${page.data.title} (${page.url})

${page.data.description || ''}

${content}`;
}


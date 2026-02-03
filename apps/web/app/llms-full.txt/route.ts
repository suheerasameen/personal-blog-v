import { getBlogPosts } from '@/lib/source';
import { getLLMText } from '@/lib/get-llm-text';

// Cached forever - this is a static text file for LLM consumption
export const revalidate = false;

/**
 * Endpoint: /llms-full.txt
 * Returns all blog posts as a single text file for AI/LLM consumption
 * This allows AI models to have full context of all blog content
 */
export async function GET() {
    const posts = getBlogPosts();
    const scan = posts.map(getLLMText);
    const scanned = await Promise.all(scan);

    return new Response(scanned.join('\n\n'), {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}

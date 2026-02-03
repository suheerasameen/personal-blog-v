import { blogSource } from '@/lib/source';
import { getLLMText } from '@/lib/get-llm-text';
import { notFound } from 'next/navigation';

export const revalidate = false;

/**
 * Endpoint: /llms.mdx/blog/[...slug]
 * Returns individual blog post content as Markdown for AI consumption
 * This is the backend for the *.mdx URL pattern
 */
export async function GET(
    _req: Request,
    context: { params: Promise<{ slug?: string[] }> }
) {
    const { slug } = await context.params;
    const page = blogSource.getPage(slug);

    if (!page) {
        notFound();
    }

    return new Response(await getLLMText(page), {
        headers: {
            'Content-Type': 'text/markdown',
        },
    });
}

export function generateStaticParams() {
    return blogSource.generateParams();
}

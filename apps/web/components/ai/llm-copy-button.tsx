'use client';

import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface LLMCopyButtonProps {
    markdownUrl: string;
}

/**
 * Button to copy MDX content URL to clipboard
 * Useful for users who want to share blog post content with their own AI tools
 */
export function LLMCopyButton({ markdownUrl }: LLMCopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            const fullUrl = `${window.location.origin}${markdownUrl}`;
            await navigator.clipboard.writeText(fullUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors hover:bg-accent"
            title="Copy MDX URL for AI tools"
        >
            {copied ? (
                <>
                    <Check className="w-3 h-3" />
                    Copied!
                </>
            ) : (
                <>
                    <Copy className="w-3 h-3" />
                    Copy MDX URL
                </>
            )}
        </button>
    );
}

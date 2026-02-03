'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles } from 'lucide-react';
import { AISearchDialog } from './ai-search-dialog';

/**
 * AI Search Trigger Button
 * Opens the AI chat dialog when clicked
 * Dialog is rendered using portal to avoid positioning issues with sticky header
 */
export function AISearchTrigger() {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent"
                aria-label="Ask AI"
            >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Ask AI</span>
            </button>
            {mounted && createPortal(
                <AISearchDialog open={open} onOpenChange={setOpen} />,
                document.body
            )}
        </>
    );
}

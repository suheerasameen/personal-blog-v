'use client';

import { MoreVertical, ExternalLink, Copy, Check, Github } from 'lucide-react';
import { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';

interface ViewOptionsProps {
    markdownUrl: string;
    githubUrl?: string;
}

/**
 * Dropdown menu with AI-friendly view options
 * - View raw MDX in browser
 * - Copy MDX URL
 * - Open source on GitHub (optional)
 */
export function ViewOptions({ markdownUrl, githubUrl }: ViewOptionsProps) {
    const [copied, setCopied] = useState(false);
    const [open, setOpen] = useState(false);

    const handleCopyUrl = async () => {
        try {
            const fullUrl = `${window.location.origin}${markdownUrl}`;
            await navigator.clipboard.writeText(fullUrl);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
                setOpen(false);
            }, 1500);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const handleViewMdx = () => {
        window.open(markdownUrl, '_blank');
        setOpen(false);
    };

    const handleViewGithub = () => {
        if (githubUrl) {
            window.open(githubUrl, '_blank');
            setOpen(false);
        }
    };

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                <button
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors hover:bg-accent"
                    aria-label="View options"
                >
                    <MoreVertical className="w-3 h-3" />
                    Options
                </button>
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content
                    className="z-50 w-56 rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
                    sideOffset={5}
                >
                    <div className="flex flex-col gap-0.5">
                        <button
                            onClick={handleViewMdx}
                            className="flex items-center gap-2 px-3 py-2 text-sm rounded-sm hover:bg-accent transition-colors text-left"
                        >
                            <ExternalLink className="w-4 h-4" />
                            View Raw MDX
                        </button>

                        <button
                            onClick={handleCopyUrl}
                            className="flex items-center gap-2 px-3 py-2 text-sm rounded-sm hover:bg-accent transition-colors text-left"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" />
                                    Copy MDX URL
                                </>
                            )}
                        </button>

                        {githubUrl && (
                            <>
                                <div className="h-px bg-border my-1" />
                                <button
                                    onClick={handleViewGithub}
                                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-sm hover:bg-accent transition-colors text-left"
                                >
                                    <Github className="w-4 h-4" />
                                    View on GitHub
                                </button>
                            </>
                        )}
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}

"use client";

import { cn } from "@repo/shadverse/lib/utils";
import Link from "next/link";
import { type HTMLAttributes } from "react";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "secondary" | "outline";
}

export function Tag({ className, variant = "default", ...props }: TagProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                // Black and white styling
                "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
                className
            )}
            {...props}
        />
    );
}

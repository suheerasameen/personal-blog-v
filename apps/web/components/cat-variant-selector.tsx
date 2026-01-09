"use client";

import { catVariants } from "@/lib/config/cat";
import { useEffect, useState } from "react";

declare global {
    interface Window {
        onekoInterval?: ReturnType<typeof setInterval>;
    }
}

export function CatVariantSelector() {
    const [variant, setVariant] = useState("maia");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        try {
            const stored = localStorage.getItem("oneko:variant");
            if (stored) {
                setVariant(JSON.parse(stored));
            }
        } catch {
            // ignore
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newVariant = e.target.value;
        setVariant(newVariant);

        // Dispatch event for oneko.js
        window.dispatchEvent(
            new CustomEvent("oneko:variant-change", {
                detail: { variant: newVariant },
            })
        );
    };

    if (!mounted) return null;

    return (
        <div className="flex items-center gap-3">
            <label htmlFor="cat-variant" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                🐱 Cat
            </label>
            <select
                id="cat-variant"
                value={variant}
                onChange={handleChange}
                className="h-8 rounded-md border border-input bg-transparent px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
            >
                {catVariants.map((v) => (
                    <option key={v.id} value={v.id} className="bg-popover text-popover-foreground">
                        {v.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

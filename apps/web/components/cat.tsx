"use client";

import { useEffect } from "react";
import { catConfig } from "@/lib/config/cat";

export function Cat() {
    useEffect(() => {
        if (!catConfig.enabled) return;

        // Check if already loaded
        if (document.getElementById("oneko")) return;

        const script = document.createElement("script");
        script.src = "/oneko/oneko.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Cleanup on unmount
            const nekoEl = document.getElementById("oneko");
            if (nekoEl) {
                nekoEl.remove();
            }
            if (window.onekoInterval) {
                clearInterval(window.onekoInterval);
            }
        };
    }, []);

    return null;
}

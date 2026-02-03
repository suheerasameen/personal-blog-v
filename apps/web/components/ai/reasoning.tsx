"use client";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/shadverse/components/collapsible";
import { cn } from "@repo/shadverse/lib/utils";
import { BrainCircuit, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ReasoningProps {
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

export function Reasoning({
  children,
  className,
  defaultOpen = true,
}: ReasoningProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (!children) return null;

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(
        "border rounded-lg bg-muted/50 overflow-hidden my-2",
        className,
      )}
    >
      <CollapsibleTrigger asChild>
        <button className="w-full flex items-center gap-2 p-2 text-xs font-medium text-muted-foreground hover:bg-muted/80 transition-colors">
          <BrainCircuit className="w-4 h-4" />
          <span>Thinking Process</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="ml-auto"
          >
            <ChevronDown className="w-3 h-3" />
          </motion.div>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent forceMount>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="p-3 pt-0 text-xs text-muted-foreground font-mono whitespace-pre-wrap border-t border-border/50 bg-background/50">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CollapsibleContent>
    </Collapsible>
  );
}

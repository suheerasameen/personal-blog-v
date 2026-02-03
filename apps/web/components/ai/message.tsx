"use client";

import { cn } from "@repo/shadverse/lib/utils";
import { User, Bot } from "lucide-react";

interface MessageProps {
  role: "user" | "assistant" | "system" | "data";
  content?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Message({ role, content, children, className }: MessageProps) {
  return (
    <div
      className={cn(
        "flex w-full gap-4 p-4 rounded-lg border",
        role === "user"
          ? "bg-muted/50 border-transparent"
          : "bg-card border-border",
        className,
      )}
    >
      <div className="flex-shrink-0 mt-1">
        {role === "user" ? (
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-sm">
            <User className="w-5 h-5" />
          </div>
        ) : (
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center border shadow-sm">
            <Bot className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="flex-1 space-y-2 min-w-0">
        <div className="font-medium text-sm text-foreground/80">
          {role === "user" ? "You" : "AI Assistant"}
        </div>
        <div className="text-sm leading-relaxed whitespace-pre-wrap text-foreground break-words">
          {content}
          {children}
        </div>
      </div>
    </div>
  );
}

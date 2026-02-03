"use client";

import { useRef, useEffect } from "react";
import { Send, CornerDownLeft } from "lucide-react";
import { cn } from "@repo/shadverse/lib/utils";
import { Button } from "@repo/shadverse/components/button";

interface PromptInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
}

export function PromptInput({
  value,
  onChange,
  onSubmit,
  isLoading,
  placeholder = "Ask a question...",
  className,
}: PromptInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isLoading) {
        onSubmit(e as any);
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "relative flex items-end w-full p-2 border rounded-xl bg-background shadow-sm focus-within:ring-1 focus-within:ring-ring",
        className,
      )}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isLoading}
        rows={1}
        className="flex-1 min-h-[44px] max-h-[200px] w-full resize-none border-0 bg-transparent py-3 px-2 text-sm placeholder:text-muted-foreground focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
      <div className="flex pb-1 pl-1">
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !value.trim()}
          className={cn(
            "h-8 w-8 rounded-lg transition-all",
            value.trim()
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </form>
  );
}

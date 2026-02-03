"use client";

import { useChat } from "@ai-sdk/react";
import { useCallback, useMemo } from "react";
import { X, Sparkles, MessageSquare, Copy, Check, RefreshCw } from "lucide-react";
import { useState } from "react";

// AI Elements components
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
  ConversationEmptyState,
} from "@/src/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
  MessageActions,
  MessageAction,
  MessageToolbar,
} from "@/src/components/ai-elements/message";
import {
  Reasoning,
  ReasoningTrigger,
  ReasoningContent,
} from "@/src/components/ai-elements/reasoning";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/src/components/ai-elements/prompt-input";
import { Button } from "@/components/ui/button";
import { cn } from "../../lib/utils";

interface AISearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Copy button component with feedback
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <MessageAction
      tooltip={copied ? "Copied!" : "Copy"}
      onClick={handleCopy}
      className="opacity-0 group-hover:opacity-100 transition-opacity"
    >
      {copied ? (
        <Check className="size-3.5 text-green-500" />
      ) : (
        <Copy className="size-3.5" />
      )}
    </MessageAction>
  );
}

export function AISearchDialog({ open, onOpenChange }: AISearchDialogProps) {
  const {
    messages,
    input,
    setInput,
    handleSubmit,
    status,
    stop,
    reload,
    error,
  } = useChat({
    api: "/api/chat",
    onError: (error) => {
      console.error("Chat error:", error);
    },
  });

  const isLoading = status === "streaming" || status === "submitted";

  // Memoized callback for prompt input submission
  const handlePromptSubmit = useCallback(
    ({ text }: { text: string }) => {
      if (!text.trim() || isLoading) return;

      // Create a synthetic form event
      const syntheticEvent = {
        preventDefault: () => { },
      } as React.FormEvent<HTMLFormElement>;

      setInput(text);
      // Need to wait a tick for input to be set
      setTimeout(() => {
        handleSubmit(syntheticEvent);
      }, 0);
    },
    [handleSubmit, setInput, isLoading]
  );

  // Suggestion chips for empty state
  const suggestions = useMemo(
    () => [
      "What topics do you cover on your blog?",
      "Tell me about web development best practices",
      "How do you handle authentication?",
    ],
    []
  );

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      setInput(suggestion);
      const syntheticEvent = {
        preventDefault: () => { },
      } as React.FormEvent<HTMLFormElement>;
      setTimeout(() => handleSubmit(syntheticEvent), 0);
    },
    [handleSubmit, setInput]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={() => onOpenChange(false)}
    >
      <div
        className={cn(
          "relative w-full max-w-2xl h-[85vh] bg-background border rounded-2xl shadow-2xl flex flex-col overflow-hidden",
          "ring-1 ring-border/50"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b bg-gradient-to-r from-background to-muted/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl border border-primary/20 shadow-sm">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold leading-none tracking-tight">
                Ask AI
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Powered by GPT-5 Nano via OpenCode
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="rounded-full hover:bg-muted"
          >
            <X className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* Conversation Area */}
        <Conversation className="flex-1">
          <ConversationContent className="gap-6 px-5 py-6">
            {messages.length === 0 ? (
              <ConversationEmptyState
                icon={<MessageSquare className="size-12 text-primary/30" />}
                title="How can I help you today?"
                description="Ask me anything about the blog content, tutorials, or tools."
              >
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={cn(
                        "px-3 py-1.5 text-xs rounded-full",
                        "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground",
                        "border border-border/50 transition-all duration-200",
                        "hover:shadow-sm hover:border-border"
                      )}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </ConversationEmptyState>
            ) : (
              messages.map((message, index) => {
                const isUser = message.role === "user";
                const isLastAssistant =
                  !isUser && index === messages.length - 1;
                const isCurrentlyStreaming =
                  isLastAssistant && status === "streaming";

                // Extract reasoning from message parts if available
                const reasoningPart = message.parts?.find(
                  (part) => part.type === "reasoning"
                );
                const textParts = message.parts?.filter(
                  (part) => part.type === "text"
                );

                // Use parts if available, fallback to content
                const textContent = textParts?.length
                  ? textParts.map((p) => p.text).join("")
                  : message.content;

                return (
                  <Message key={message.id} from={message.role as "user" | "assistant" | "system"}>
                    <MessageContent>
                      {/* Reasoning section for assistant messages */}
                      {reasoningPart && !isUser && (
                        <Reasoning
                          isStreaming={isCurrentlyStreaming}
                          defaultOpen={isCurrentlyStreaming}
                        >
                          <ReasoningTrigger />
                          <ReasoningContent>
                            {reasoningPart.reasoning}
                          </ReasoningContent>
                        </Reasoning>
                      )}

                      {/* Message content with markdown rendering */}
                      {textContent && (
                        <MessageResponse>
                          {textContent}
                        </MessageResponse>
                      )}

                      {/* Loading indicator for streaming */}
                      {isCurrentlyStreaming && !textContent && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0ms]" />
                            <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:150ms]" />
                            <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:300ms]" />
                          </div>
                          <span className="text-sm">Generating...</span>
                        </div>
                      )}
                    </MessageContent>

                    {/* Message actions for assistant messages */}
                    {!isUser && textContent && !isCurrentlyStreaming && (
                      <MessageToolbar>
                        <MessageActions>
                          <CopyButton text={textContent} />
                          {isLastAssistant && (
                            <MessageAction
                              tooltip="Regenerate"
                              onClick={() => reload()}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <RefreshCw className="size-3.5" />
                            </MessageAction>
                          )}
                        </MessageActions>
                      </MessageToolbar>
                    )}
                  </Message>
                );
              })
            )}

            {/* Error display */}
            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                <p className="font-medium">Something went wrong</p>
                <p className="text-destructive/80 mt-1">
                  {error.message || "Failed to get response. Please try again."}
                </p>
              </div>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        {/* Input Area */}
        <div className="border-t bg-gradient-to-r from-muted/20 to-background p-4">
          <PromptInput
            onSubmit={handlePromptSubmit}
            className="bg-background rounded-xl border shadow-sm"
          >
            <PromptInputTextarea
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (input.trim() && !isLoading) {
                    handlePromptSubmit({ text: input });
                  }
                }
              }}
              className="min-h-[44px] max-h-[200px] resize-none"
            />
            <PromptInputFooter>
              <div className="text-xs text-muted-foreground">
                Press Enter to send, Shift+Enter for new line
              </div>
              <PromptInputSubmit
                status={status}
                onStop={stop}
              />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  );
}

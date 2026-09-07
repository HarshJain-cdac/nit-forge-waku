import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "./types";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[90%] rounded-2xl px-4 py-3 md:max-w-[80%]",
          isUser
            ? "rounded-br-md bg-waku-user text-waku-user-foreground"
            : "rounded-bl-md border border-border bg-waku-bot text-waku-bot-foreground shadow-soft",
        )}
      >
        <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center gap-2 rounded-lg border border-border bg-background/80 px-2.5 py-1.5"
              >
                <FileText className="h-3.5 w-3.5 text-waku-bot-accent" />
                <span className="max-w-[140px] truncate text-xs text-waku-bot-foreground">
                  {attachment.name}
                </span>
                <span className="text-[10px] text-muted-foreground">{attachment.size}</span>
              </div>
            ))}
          </div>
        )}
        {message.isTyping && (
          <div className="mt-2 flex items-center gap-1">
            <span
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-waku-bot-accent"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-waku-bot-accent"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-waku-bot-accent"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

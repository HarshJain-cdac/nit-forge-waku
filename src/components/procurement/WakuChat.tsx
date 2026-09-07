import { useRef, useEffect, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { FileUploader } from "./FileUploader";
import type { ChatMessage as ChatMessageType } from "./types";

interface WakuChatProps {
  messages: ChatMessageType[];
  onSend: (text: string) => void;
  onUpload: (files: FileList) => void;
  isTyping?: boolean;
}

export function WakuChat({ messages, onSend, onUpload, isTyping }: WakuChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex h-full flex-col border-l border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Waku AI</h2>
            <p className="text-xs text-muted-foreground">Procurement Assistant</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-5 py-4">
        <div ref={scrollRef} className="flex flex-col gap-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && (
            <ChatMessage
              message={{
                id: "typing",
                role: "waku",
                content: "",
                isTyping: true,
              }}
            />
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-border bg-muted/20 p-4">
        <div className="flex flex-col gap-2 rounded-2xl border border-border bg-background p-2 shadow-soft">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Waku anything..."
            className="min-h-[60px] resize-none border-0 bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <div className="flex items-center justify-between">
            <FileUploader onUpload={onUpload} variant="icon" />
            <Button
              onClick={handleSubmit}
              disabled={!text.trim() || isTyping}
              size="sm"
              className="gap-1.5 bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
              Send
            </Button>
          </div>
        </div>
        <p className="mt-2 text-center text-[10px] text-muted-foreground">
          Waku can generate, edit, and refine NiT documents from your uploads.
        </p>
      </div>
    </div>
  );
}

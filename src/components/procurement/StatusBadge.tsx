import { CheckCircle2, Sparkles } from "lucide-react";
import type { DocumentStatus } from "./types";

interface StatusBadgeProps {
  status: DocumentStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const isAi = status === "AI Generated";
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 shadow-soft">
      <span
        className={`relative flex h-2 w-2 rounded-full ${
          isAi ? "bg-status-ai" : "bg-status-ready"
        }`}
      >
        {isAi && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-ai opacity-40" />
        )}
      </span>
      {isAi ? (
        <Sparkles className="h-3.5 w-3.5 text-status-ai" />
      ) : (
        <CheckCircle2 className="h-3.5 w-3.5 text-status-ready" />
      )}
      <span className="text-xs font-medium text-foreground">{status}</span>
    </div>
  );
}

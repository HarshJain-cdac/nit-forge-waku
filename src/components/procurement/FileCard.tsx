import { FileText, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { UploadedFile } from "./types";

interface FileCardProps {
  file: UploadedFile;
  onRemove: (id: string) => void;
}

export function FileCard({ file, onRemove }: FileCardProps) {
  const statusIcon =
    file.status === "uploading" ? (
      <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
    ) : file.status === "processing" ? (
      <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
    ) : file.status === "error" ? (
      <AlertCircle className="h-3.5 w-3.5 text-destructive" />
    ) : (
      <CheckCircle2 className="h-3.5 w-3.5 text-status-ready" />
    );

  return (
    <div className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-soft transition-all hover:border-primary/20 hover:shadow-nit">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <FileText className="h-5 w-5" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium text-card-foreground">{file.name}</span>
        <span className="text-xs text-muted-foreground">
          {file.type.toUpperCase()} · {file.size}
        </span>
        {file.status === "uploading" && <Progress value={file.progress} className="mt-2 h-1" />}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
          {statusIcon}
          <span className="capitalize">{file.status}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={() => onRemove(file.id)}
        >
          <X className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
}

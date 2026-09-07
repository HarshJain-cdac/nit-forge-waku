import { useRef, useCallback } from "react";
import { Upload, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploaderProps {
  onUpload: (files: FileList) => void;
  variant?: "button" | "area" | "icon";
  accept?: string;
  label?: string;
}

export function FileUploader({
  onUpload,
  variant = "button",
  accept = ".pdf,.docx,.xlsx,.xls,.doc,.txt",
  label = "Upload Files",
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        onUpload(e.target.files);
        e.target.value = "";
      }
    },
    [onUpload],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        onUpload(e.dataTransfer.files);
      }
    },
    [onUpload],
  );

  if (variant === "icon") {
    return (
      <>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          className="hidden"
          onChange={handleChange}
        />
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-muted-foreground hover:text-foreground"
          onClick={handleClick}
        >
          <Paperclip className="h-[18px] w-[18px]" />
        </Button>
      </>
    );
  }

  if (variant === "area") {
    return (
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-muted/50 p-8 text-center transition-colors hover:border-primary/30 hover:bg-muted"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Upload className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            PDF, DOCX, XLSX and other procurement documents
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          className="hidden"
          onChange={handleChange}
        />
      </div>
    );
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        className="hidden"
        onChange={handleChange}
      />
      <Button
        variant="outline"
        className="gap-2 border-border bg-background text-sm font-medium text-foreground shadow-soft hover:bg-muted hover:text-foreground"
        onClick={handleClick}
      >
        <Upload className="h-4 w-4 text-primary" />
        {label}
      </Button>
    </>
  );
}

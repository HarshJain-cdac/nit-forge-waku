import { Wand2, Pencil, RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "./StatusBadge";
import { FileUploader } from "./FileUploader";
import { FileCard } from "./FileCard";
import { DocumentPreview } from "./DocumentPreview";
import type { UploadedFile, DocumentSection, DocumentStatus } from "./types";

interface NitWorkspaceProps {
  title: string;
  status: DocumentStatus;
  sections: DocumentSection[];
  files: UploadedFile[];
  onUpload: (files: FileList) => void;
  onRemoveFile: (id: string) => void;
  onGenerate: () => void;
  onRegenerate: () => void;
}

export function NitWorkspace({
  title,
  status,
  sections,
  files,
  onUpload,
  onRemoveFile,
  onGenerate,
  onRegenerate,
}: NitWorkspaceProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-background">
      <div className="flex flex-col gap-4 border-b border-border bg-background px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">NiT Generation</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Create and refine Notice Inviting Tender documents
          </p>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/30 px-6 py-3">
        <Button
          onClick={onGenerate}
          className="gap-2 bg-primary text-sm font-medium text-primary-foreground shadow-soft hover:bg-primary/90"
        >
          <Wand2 className="h-4 w-4" />
          Generate NiT
        </Button>
        <Button
          variant="outline"
          className="gap-2 border-border bg-background text-sm font-medium text-foreground shadow-soft hover:bg-muted"
        >
          <Pencil className="h-4 w-4 text-primary" />
          Edit
        </Button>
        <Button
          onClick={onRegenerate}
          variant="outline"
          className="gap-2 border-border bg-background text-sm font-medium text-foreground shadow-soft hover:bg-muted"
        >
          <RefreshCw className="h-4 w-4 text-primary" />
          Regenerate
        </Button>
        <Button
          variant="outline"
          className="gap-2 border-border bg-background text-sm font-medium text-foreground shadow-soft hover:bg-muted"
        >
          <Download className="h-4 w-4 text-primary" />
          Download
        </Button>
      </div>

      <div className="flex flex-col gap-4 overflow-hidden p-6 md:flex-row">
        <div className="flex w-full flex-col gap-4 md:w-80 lg:w-96">
          <FileUploader onUpload={onUpload} label="Upload Files" />
          <div className="flex flex-col gap-3 overflow-y-auto rounded-2xl">
            {files.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center">
                <p className="text-sm text-muted-foreground">No documents uploaded yet.</p>
                <p className="mt-1 text-xs text-muted-foreground">Upload PDF, DOCX, or XLSX files to generate an NiT.</p>
              </div>
            ) : (
              files.map((file) => <FileCard key={file.id} file={file} onRemove={onRemoveFile} />)
            )}
          </div>
        </div>

        <Separator orientation="vertical" className="hidden md:block" />

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-muted/20">
          <DocumentPreview title={title} sections={sections} />
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Wand2, Pencil, RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { DocumentPreview } from "./DocumentPreview";
import { AnnexurePanel } from "./AnnexurePanel";
import { loadAnnexures, type AnnexureTemplate } from "./annexures";
import type { DocumentSection, DocumentStatus } from "./types";

interface NitWorkspaceProps {
  title: string;
  status: DocumentStatus;
  sections: DocumentSection[];
  attachedAnnexureIds: string[];
  onToggleAnnexure: (id: string) => void;
  onGenerate: () => void;
  onRegenerate: () => void;
}

export function NitWorkspace({
  title,
  status,
  sections,
  attachedAnnexureIds,
  onToggleAnnexure,
  onGenerate,
  onRegenerate,
}: NitWorkspaceProps) {
  const [annexures, setAnnexures] = useState<AnnexureTemplate[]>([]);

  useEffect(() => {
    void loadAnnexures().then(setAnnexures);
  }, []);

  const attached = annexures.filter((a) => attachedAnnexureIds.includes(a.id));

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

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-6 lg:flex-row lg:overflow-hidden">
        <div className="w-full shrink-0 lg:w-72 xl:w-80">
          <AnnexurePanel attachedIds={attachedAnnexureIds} onToggle={onToggleAnnexure} />
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-muted/20">
          <DocumentPreview title={title} sections={sections} annexures={attached} />
        </div>
      </div>
    </div>
  );
}

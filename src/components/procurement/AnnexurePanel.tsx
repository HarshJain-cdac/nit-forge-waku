import { useEffect, useState } from "react";
import { FolderOpen, FileText, ExternalLink } from "lucide-react";
import { loadAnnexures, type AnnexureTemplate } from "./annexures";

interface AnnexurePanelProps {
  attachedIds: string[];
  onToggle: (id: string) => void;
}

export function AnnexurePanel({ attachedIds, onToggle }: AnnexurePanelProps) {
  const [items, setItems] = useState<AnnexureTemplate[]>([]);

  useEffect(() => {
    void loadAnnexures().then(setItems);
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-background p-4 shadow-soft">
      <div className="flex items-center gap-2">
        <FolderOpen className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground">Annexure Templates</h2>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Templates placed in the annexures folder. Selected annexures are attached to the NiT.
      </p>

      <div className="mt-3 flex flex-col gap-2">
        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-muted/30 p-4 text-center text-xs text-muted-foreground">
            The annexures folder is empty. Add HTML templates to see them here.
          </div>
        ) : (
          items.map((item) => {
            const attached = attachedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`flex items-start gap-3 rounded-xl border p-3 transition-colors ${
                  attached ? "border-primary/40 bg-primary/5" : "border-border bg-muted/20"
                }`}
              >
                <input
                  type="checkbox"
                  checked={attached}
                  onChange={() => onToggle(item.id)}
                  className="mt-1 h-4 w-4 accent-current text-primary"
                  aria-label={`Attach ${item.code}`}
                />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <FileText className="h-3.5 w-3.5 text-primary" />
                    {item.code}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{item.title}</p>
                </div>
                <a
                  href={`/annexures/${item.file}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label={`Open ${item.code}`}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

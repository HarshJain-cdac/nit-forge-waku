export interface AnnexureTemplate {
  id: string;
  code: string;
  title: string;
  file: string;
}

export async function loadAnnexures(): Promise<AnnexureTemplate[]> {
  try {
    const res = await fetch("/annexures/manifest.json");
    if (!res.ok) return [];
    const data = (await res.json()) as { annexures?: AnnexureTemplate[] };
    return data.annexures ?? [];
  } catch {
    return [];
  }
}

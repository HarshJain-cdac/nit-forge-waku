import { API_BASE } from "@/config";

export interface ChatHistoryItem {
  role: "user" | "waku";
  content: string;
}

export interface ChatResponse {
  reply: string;
}

export async function sendChatMessage(
  message: string,
  history: ChatHistoryItem[]
): Promise<ChatResponse | null> {
  if (!API_BASE) {
    return null;
  }

  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });

  if (!res.ok) {
    throw new Error(`Chat request failed: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as ChatResponse;
}

export async function uploadFiles(files: File[]): Promise<{ ok: boolean }> {
  if (!API_BASE) {
    return { ok: true };
  }

  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
  }

  return { ok: true };
}

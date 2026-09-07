export type FileStatus = "uploading" | "processing" | "ready" | "error";

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: string;
  status: FileStatus;
  progress: number;
}

export interface ChatAttachment {
  id: string;
  name: string;
  type: string;
  size: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "waku";
  content: string;
  attachments?: ChatAttachment[];
  isTyping?: boolean;
}

export interface DocumentSection {
  title: string;
  content: string;
}

export type DocumentStatus = "Ready" | "AI Generated";

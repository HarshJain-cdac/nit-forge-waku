import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { Header } from "@/components/procurement/Header";
import { NitWorkspace } from "@/components/procurement/NitWorkspace";
import { WakuChat } from "@/components/procurement/WakuChat";
import type {
  UploadedFile,
  ChatMessage,
  DocumentSection,
  DocumentStatus,
} from "@/components/procurement/types";
import { sendChatMessage } from "@/lib/api";
import { defaultSections, aiGeneratedSections } from "@/components/procurement/nitTemplate";

export const Route = createFileRoute("/")({
  component: ProcurementWorkspace,
  head: () => ({
    meta: [
      { title: "Waku Procurement AI — NiT Generation" },
      {
        name: "description",
        content: "Generate professional Notice Inviting Tender documents with Waku AI.",
      },
      { property: "og:title", content: "Waku Procurement AI — NiT Generation" },
      {
        property: "og:description",
        content: "Generate professional Notice Inviting Tender documents with Waku AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const stricterEligibilitySections: DocumentSection[] = defaultSections.map((s) =>
  s.title === "Eligibility Criteria"
    ? {
        ...s,
        content:
          "Bidders shall satisfy the following enhanced qualifying requirements, supported by documentary evidence submitted with the Techno-Commercial Bid:\n\n• Minimum ten (10) years of continuous operation in electro-mechanical / process plant construction.\n• Average annual turnover of not less than INR 21.40 Crore during the last three audited financial years.\n• Successful completion of at least three (3) similar works, each of value not less than INR 25.65 Crore, in the last seven (7) years.\n• Valid ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018 certifications.\n• In-house engineering, fabrication and testing facilities, supported by an asset declaration.\n• Lost Time Injury Frequency Rate (LTIFR) below 0.50 for the preceding three years, certified by the Bidder\u2019s HSE head.\n• No holiday listing, banning, arbitration or litigation with any Public Sector Undertaking as on the bid due date.\n• Signed Integrity Pact, conflict-of-interest declaration and DMI&SP undertakings in the prescribed annexure formats.",
      }
    : s,
);

const modifiedSubmissionSections: DocumentSection[] = defaultSections.map((s) =>
  s.title === "Submission Requirements"
    ? {
        ...s,
        content:
          "Bids shall be submitted strictly in the prescribed two-packet format through the e-Procurement portal. Incomplete, conditional or non-compliant bids shall be summarily rejected.\n\n• Packet-I: eligibility documents, methodology, Level-2 schedule, resource deployment plan and key personnel CVs.\n• Packet-II: priced bid in the prescribed Schedule of Rates template, exclusive of GST.\n• Earnest Money Deposit of INR 42,75,000 by Demand Draft or Bank Guarantee valid for 180 days.\n• Bid validity of 180 days from the date of bid opening.\n• Self-attested copies of GST, PAN, EPF, ESIC registrations and incorporation certificate.\n• Digitally signed Power of Attorney for the authorised signatory.\n• A no-deviation confirmation; deviations, if any, shall be listed only in the prescribed deviation schedule.",
      }
    : s,
);

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileType(file: File): string {
  const name = file.name.toLowerCase();
  if (name.endsWith(".pdf")) return "PDF";
  if (name.endsWith(".docx") || name.endsWith(".doc")) return "DOCX";
  if (name.endsWith(".xlsx") || name.endsWith(".xls")) return "XLSX";
  if (name.endsWith(".txt")) return "TXT";
  return "FILE";
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function ProcurementWorkspace() {
  const [documentStatus, setDocumentStatus] = useState<DocumentStatus>("Ready");
  const [sections, setSections] = useState<DocumentSection[]>(defaultSections);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateId(),
      role: "waku",
      content:
        "Hello! I'm Waku, your procurement assistant. Upload tender documents or ask me to generate, edit, or refine an NiT.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [attachedAnnexureIds, setAttachedAnnexureIds] = useState<string[]>([]);

  const handleToggleAnnexure = useCallback((id: string) => {
    setAttachedAnnexureIds((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  }, []);

  const processFiles = useCallback((fileList: FileList, attachToChat: boolean) => {
    const newFiles: UploadedFile[] = Array.from(fileList).map((file) => ({
      id: generateId(),
      name: file.name,
      type: fileType(file),
      size: formatFileSize(file.size),
      status: "uploading",
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    if (attachToChat) {
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "user",
          content: `Uploaded ${newFiles.length} file${newFiles.length > 1 ? "s" : ""} for analysis.`,
          attachments: newFiles.map((f) => ({
            id: f.id,
            name: f.name,
            type: f.type,
            size: f.size,
          })),
        },
      ]);
    }

    newFiles.forEach((uploadedFile) => {
      const duration = 1000 + Math.random() * 1500;
      const steps = 10;
      const interval = duration / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const progress = Math.min(Math.round((step / steps) * 100), 100);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadedFile.id
              ? { ...f, progress, status: progress === 100 ? "processing" : "uploading" }
              : f,
          ),
        );

        if (step >= steps) {
          clearInterval(timer);
          setTimeout(() => {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === uploadedFile.id ? { ...f, status: "ready", progress: 100 } : f,
              ),
            );
          }, 600);
        }
      }, interval);
    });
  }, []);

  const handleChatUpload = useCallback(
    (fileList: FileList) => {
      processFiles(fileList, true);
    },
    [processFiles],
  );

  const handleGenerate = useCallback(() => {
    setDocumentStatus("AI Generated");
    setSections(aiGeneratedSections);
  }, []);

  const handleRegenerate = useCallback(() => {
    setDocumentStatus("AI Generated");
    setSections((prev) =>
      prev.map((s) =>
        s.title === "Introduction and Background"
          ? {
              ...s,
              content:
                "This Notice Inviting Tender (NiT) is reissued following a comprehensive review to incorporate refined eligibility standards, clarified submission requirements, and an updated project timeline.\n\nAll bidders are encouraged to review the revised terms carefully before submitting their tenders.",
            }
          : s,
      ),
    );
  }, []);

  const buildReply = useCallback(
    (
      text: string,
    ): { reply: string; updatedSections?: DocumentSection[]; status?: DocumentStatus } => {
      const lower = text.toLowerCase();

      if (lower.includes("generate") && lower.includes("nit")) {
        return {
          reply:
            "I've generated a complete NiT from your documents. The document now includes refined sections for scope, eligibility, technical requirements, submission requirements, and important dates.",
          updatedSections: aiGeneratedSections,
          status: "AI Generated",
        };
      }

      if (
        lower.includes("eligibility") ||
        lower.includes("criteria") ||
        lower.includes("stricter")
      ) {
        return {
          reply:
            "I've tightened the eligibility criteria to require longer operational history, higher turnover, additional certifications, and a clean litigation record.",
          updatedSections: stricterEligibilitySections,
          status: "AI Generated",
        };
      }

      if (lower.includes("submission") || lower.includes("requirements")) {
        return {
          reply:
            "I've updated the submission requirements to include stricter formatting, a higher EMD, extended tender validity, and mandatory supporting documents.",
          updatedSections: modifiedSubmissionSections,
          status: "AI Generated",
        };
      }

      if (lower.includes("technical")) {
        return {
          reply:
            "I've revised the technical requirements section to emphasize manufacturer warranties, genuine software licenses, high availability, and cybersecurity compliance.",
          updatedSections: defaultSections.map((s) =>
            s.title === "Technical Requirements"
              ? {
                  ...s,
                  content:
                    "The offered solution must conform to the latest technical specifications and industry best practices:\n\n• Original equipment manufacturer (OEM) warranty and support for all hardware.\n• Genuine, perpetual, and transferable software licenses.\n• Architecture designed for high availability, redundancy, and failover.\n• Adherence to national cybersecurity frameworks and data privacy regulations.\n• Interoperability with existing enterprise systems and protocols.\n• Comprehensive testing, acceptance, and handover documentation.",
                }
              : s,
          ),
          status: "AI Generated",
        };
      }

      if (lower.includes("scope") || lower.includes("work")) {
        return {
          reply:
            "I've expanded the scope of work to cover supply, installation, configuration, migration, documentation, and post-implementation support.",
          updatedSections: aiGeneratedSections,
          status: "AI Generated",
        };
      }

      return {
        reply:
          "Got it. I've noted your instruction. You can ask me to generate an NiT, modify eligibility criteria, update submission requirements, or refine any section.",
      };
    },
    [],
  );

  const handleSendMessage = useCallback(
    async (text: string) => {
      const userMessage: ChatMessage = { id: generateId(), role: "user", content: text };
      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      let reply = "";
      let updatedSections: DocumentSection[] | undefined;
      let status: DocumentStatus | undefined;

      try {
        const response = await sendChatMessage(text, history);
        if (response && response.reply) {
          reply = response.reply;
        } else {
          const local = buildReply(text);
          reply = local.reply;
          updatedSections = local.updatedSections;
          status = local.status;
        }
      } catch {
        const local = buildReply(text);
        reply = local.reply;
        updatedSections = local.updatedSections;
        status = local.status;
      }

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { id: generateId(), role: "waku", content: reply }]);
        if (updatedSections) {
          setSections(updatedSections);
        }
        if (status) {
          setDocumentStatus(status);
        }
      }, 800);
    },
    [messages, buildReply],
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <Header />
      <main className="flex flex-1 flex-col overflow-hidden lg:grid lg:grid-cols-[70%_30%]">
        <NitWorkspace
          title="Notice Inviting Tender"
          status={documentStatus}
          sections={sections}
          attachedAnnexureIds={attachedAnnexureIds}
          onToggleAnnexure={handleToggleAnnexure}
          onGenerate={handleGenerate}
          onRegenerate={handleRegenerate}
        />
        <WakuChat
          messages={messages}
          onSend={handleSendMessage}
          onUpload={handleChatUpload}
          isTyping={isTyping}
        />
      </main>
    </div>
  );
}

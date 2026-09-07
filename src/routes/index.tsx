import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { Header } from "@/components/procurement/Header";
import { NitWorkspace } from "@/components/procurement/NitWorkspace";
import { WakuChat } from "@/components/procurement/WakuChat";
import type { UploadedFile, ChatMessage, DocumentSection, DocumentStatus } from "@/components/procurement/types";
import { sendChatMessage } from "@/lib/api";

export const Route = createFileRoute("/")({
  component: ProcurementWorkspace,
  head: () => ({
    meta: [
      { title: "Waku Procurement AI — NiT Generation" },
      { name: "description", content: "Generate professional Notice Inviting Tender documents with Waku AI." },
      { property: "og:title", content: "Waku Procurement AI — NiT Generation" },
      { property: "og:description", content: "Generate professional Notice Inviting Tender documents with Waku AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const defaultSections: DocumentSection[] = [
  {
    title: "Introduction",
    content:
      "This Notice Inviting Tender (NiT) is issued by the procuring entity to invite eligible bidders to submit sealed tenders for the supply, installation, and commissioning of the goods and services described herein.\n\nThe purpose of this tender is to ensure a transparent, competitive, and fair procurement process in accordance with the applicable procurement regulations and organizational policies.",
  },
  {
    title: "Scope of Work",
    content:
      "The selected bidder shall be responsible for the complete execution of the works as detailed in the technical specifications and bill of quantities annexed to this tender document.\n\n• Supply of all materials, equipment, and labor.\n• Installation, testing, and commissioning at designated sites.\n• Training of designated personnel on operation and maintenance.\n• Warranty and after-sales support for the contract period.",
  },
  {
    title: "Eligibility Criteria",
    content:
      "Bidders must meet the following minimum eligibility requirements to participate in this tender:\n\n• Be a legally registered entity in good standing.\n• Possess relevant experience in similar projects over the last three years.\n• Demonstrate adequate financial capacity through audited financial statements.\n• Have no record of blacklisting or debarment from public procurement.",
  },
  {
    title: "Technical Requirements",
    content:
      "All goods and services offered must conform to the technical specifications outlined in Annexure A.\n\n• Compliance with applicable national and international standards.\n• Submission of technical datasheets, brochures, and compliance certificates.\n• Proof of quality assurance certifications, where applicable.\n• Compatibility with existing infrastructure and systems.",
  },
  {
    title: "Submission Requirements",
    content:
      "Bidders must submit their tenders in the prescribed format, complete in all respects, and enclosed in a sealed envelope marked with the tender reference number and title.\n\n• Technical proposal with company profile and experience records.\n• Financial proposal in a separately sealed envelope.\n• Earnest Money Deposit (EMD) as specified in the tender notice.\n• Validity of tenders for a minimum period of 90 days from the date of opening.",
  },
  {
    title: "Important Dates",
    content:
      "• Issue of tender document: [Date]\n• Pre-bid meeting: [Date, Time, Venue]\n• Last date for submission of queries: [Date]\n• Bid submission deadline: [Date, Time]\n• Opening of technical bids: [Date, Time]\n• Opening of financial bids: [Date, Time]",
  },
];

const aiGeneratedSections: DocumentSection[] = [
  {
    title: "Introduction",
    content:
      "This Notice Inviting Tender (NiT) is issued by the Department of Public Works to invite eligible and qualified bidders to submit competitive tenders for the procurement, installation, and commissioning of enterprise-grade IT infrastructure and associated services.\n\nThe procurement shall be conducted through an open competitive bidding process in accordance with the Public Procurement Act and the organization's procurement manual.",
  },
  {
    title: "Scope of Work",
    content:
      "The contractor shall be responsible for the end-to-end delivery of the project, including but not limited to:\n\n• Supply of servers, networking equipment, and endpoint devices as per Annexure A.\n• Design, installation, and configuration of the network and data center environment.\n• Migration of existing workloads with minimal disruption to operations.\n• Comprehensive documentation and knowledge transfer to the IT team.\n• Annual Maintenance Contract (AMC) for a period of three years post-acceptance.",
  },
  {
    title: "Eligibility Criteria",
    content:
      "Only bidders fulfilling the following criteria shall be considered eligible:\n\n• Registered company with at least five years of continuous operation in the relevant domain.\n• Minimum average annual turnover of INR 10 crore over the last three financial years.\n• Experience of having successfully completed at least three similar projects of comparable scale.\n• Valid ISO 9001 and ISO 27001 certifications.\n• No history of litigation, arbitration, or blacklisting by any government or public sector entity.",
  },
  {
    title: "Technical Requirements",
    content:
      "The offered solution must meet or exceed the technical specifications detailed in Annexure B.\n\n• All hardware must carry original manufacturer warranty and support.\n• Software licenses must be genuine, perpetual, and transferable.\n• Solution must support high availability, redundancy, and disaster recovery.\n• Compliance with applicable cybersecurity and data protection standards.\n• Detailed implementation plan with milestones and acceptance criteria.",
  },
  {
    title: "Submission Requirements",
    content:
      "Tenders must be submitted online through the e-procurement portal on or before the deadline. Hard copies, if required, must be sealed and superscribed with the tender reference number.\n\n• Technical bid with eligibility and technical documents.\n• Financial bid in the prescribed format, inclusive of all taxes and duties.\n• Earnest Money Deposit of INR 5,00,000 in the form of a demand draft or bank guarantee.\n• Tender validity of 120 days from the bid submission deadline.",
  },
  {
    title: "Important Dates",
    content:
      "• Publication of NiT: 15 September 2026\n• Pre-bid conference: 22 September 2026, 11:00 AM\n• Last date for clarifications: 29 September 2026\n• Bid submission deadline: 10 October 2026, 15:00 IST\n• Technical bid opening: 10 October 2026, 16:00 IST\n• Financial bid opening: 20 October 2026, 11:00 IST",
  },
];

const stricterEligibilitySections: DocumentSection[] = defaultSections.map((s) =>
  s.title === "Eligibility Criteria"
    ? {
        ...s,
        content:
          "Bidders must meet the following stringent eligibility requirements to participate in this tender:\n\n• Minimum 10 years of continuous operation in the relevant industry.\n• Average annual turnover of at least INR 50 crore over the last three financial years.\n• Proven track record of completing at least five projects of similar scope and complexity.\n• Valid ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018 certifications.\n• Clean litigation record and no history of blacklisting by any government or statutory body.\n• Submission of a signed integrity pact and conflict-of-interest declaration.",
      }
    : s
);

const modifiedSubmissionSections: DocumentSection[] = defaultSections.map((s) =>
  s.title === "Submission Requirements"
    ? {
        ...s,
        content:
          "Bidders must submit their tenders strictly in the prescribed format through the designated e-procurement portal. Incomplete or non-compliant submissions shall be summarily rejected.\n\n• Technical proposal with detailed methodology, work plan, and team credentials.\n• Financial proposal sealed separately and uploaded in the prescribed template.\n• Earnest Money Deposit of INR 2,00,000 via NEFT/RTGS or bank guarantee.\n• Tender validity of 180 days from the submission deadline.\n• Self-attested copies of GST registration, PAN, and incorporation certificate.\n• Power of attorney for the authorized signatory.",
      }
    : s
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
          attachments: newFiles.map((f) => ({ id: f.id, name: f.name, type: f.type, size: f.size })),
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
          prev.map((f) => (f.id === uploadedFile.id ? { ...f, progress, status: progress === 100 ? "processing" : "uploading" } : f))
        );

        if (step >= steps) {
          clearInterval(timer);
          setTimeout(() => {
            setFiles((prev) =>
              prev.map((f) => (f.id === uploadedFile.id ? { ...f, status: "ready", progress: 100 } : f))
            );
          }, 600);
        }
      }, interval);
    });
  }, []);

  const handleWorkspaceUpload = useCallback(
    (fileList: FileList) => {
      processFiles(fileList, false);
    },
    [processFiles]
  );

  const handleChatUpload = useCallback(
    (fileList: FileList) => {
      processFiles(fileList, true);
    },
    [processFiles]
  );

  const handleRemoveFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const handleGenerate = useCallback(() => {
    setDocumentStatus("AI Generated");
    setSections(aiGeneratedSections);
  }, []);

  const handleRegenerate = useCallback(() => {
    setDocumentStatus("AI Generated");
    setSections((prev) =>
      prev.map((s) =>
        s.title === "Introduction"
          ? {
              ...s,
              content:
                "This Notice Inviting Tender (NiT) is reissued following a comprehensive review to incorporate refined eligibility standards, clarified submission requirements, and an updated project timeline.\n\nAll bidders are encouraged to review the revised terms carefully before submitting their tenders.",
            }
          : s
      )
    );
  }, []);

  const buildReply = useCallback((text: string): { reply: string; updatedSections?: DocumentSection[]; status?: DocumentStatus } => {
    const lower = text.toLowerCase();

    if (lower.includes("generate") && lower.includes("nit")) {
      return {
        reply:
          "I've generated a complete NiT from your documents. The document now includes refined sections for scope, eligibility, technical requirements, submission requirements, and important dates.",
        updatedSections: aiGeneratedSections,
        status: "AI Generated",
      };
    }

    if (lower.includes("eligibility") || lower.includes("criteria") || lower.includes("stricter")) {
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
            : s
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
  }, []);

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
    [messages, buildReply]
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <Header />
      <main className="flex flex-1 flex-col overflow-hidden lg:grid lg:grid-cols-[70%_30%]">
        <NitWorkspace
          title="Notice Inviting Tender"
          status={documentStatus}
          sections={sections}
          files={files}
          onUpload={handleWorkspaceUpload}
          onRemoveFile={handleRemoveFile}
          onGenerate={handleGenerate}
          onRegenerate={handleRegenerate}
        />
        <WakuChat messages={messages} onSend={handleSendMessage} onUpload={handleChatUpload} isTyping={isTyping} />
      </main>
    </div>
  );
}

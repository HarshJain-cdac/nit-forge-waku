# ProcureFlow AI

Create a highly professional, aesthetic, minimal AI procurement workspace inspired by the provided reference image.

DESIGN

- White background with blue/white color palette.

- Premium enterprise SaaS aesthetic.

- Clean typography, strong visual hierarchy, generous whitespace.

- Subtle blue gradients, soft shadows, thin borders, rounded corners.

- Keep it elegant and simple; avoid clutter, excessive animations, neon colors, dark mode, and unnecessary dashboard elements.

- Use the reference image as the visual direction.

LAYOUT

- Desktop: 70% left / 30% right.

- Left: NiT Generation workspace.

- Right: Waku AI chatbot.

- Maintain a clear visual separation while making both panels feel like one application.

LEFT PANEL - NiT GENERATION

- Large professional document workspace.

- Header: "NiT Generation"

- Status indicator: "Ready" / "AI Generated".

- Document displayed as a clean, readable white paper/card.

- Include sections such as:

  Introduction, Scope of Work, Eligibility Criteria, Technical Requirements, Submission Requirements, Important Dates.

- Toolbar: Generate NiT, Edit, Regenerate, Download.

- Add a prominent "Upload Files" button for PDF, DOCX, XLSX and other relevant procurement documents.

- Show uploaded files as compact file cards with filename, type, size, remove, and processing status.

- Uploaded files should be visually connected to NiT generation.

RIGHT PANEL - WAKU AI

- Header: "Waku AI" / "Procurement Assistant".

- Clean conversational interface.

- User messages: blue background with white text.

- Waku messages: white/light-blue background with dark text and blue accents.

- Bottom input: "Ask Waku anything..." with attachment/upload and Send buttons.

- Allow users to upload files directly from the chatbot as well.

- Show file attachments inside chat messages.

- Include subtle typing/loading states.

INTERACTION

- User can upload procurement files from either the NiT panel or chatbot.

- Show upload -> processing -> AI analysis -> NiT generation states.

- When Waku generates or modifies an NiT, update the left document panel in real time.

- Chat should support iterative instructions such as:

  "Generate an NiT from these documents."

  "Add stricter eligibility criteria."

  "Modify the submission requirements."

- Keep the generated NiT visible while chatting.

HEADER

- Minimal white header with professional branding.

- Waku/Procurement AI logo on the left.

- Simple navigation and settings/profile controls.

- Subtle bottom border.

RESPONSIVE

- Desktop: fixed 70/30 layout.

- Tablet/mobile: stack the NiT and chatbot panels while preserving usability.

Overall goal:

Create a polished, simple, highly professional enterprise AI procurement application where the NiT generation workspace is the main focus and Waku is the intelligent assistant. The interface should feel production-ready, refined, and visually similar to the supplied reference image.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://nit-forge-waku.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0fa98cd9-45cd-442d-8625-99416e630d00).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

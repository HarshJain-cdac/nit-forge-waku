# Annexures folder

Drop annexure HTML templates in this folder (`public/annexures/`).

Each template may contain placeholders such as `{{ item.name_of_proposal }}` and
`{{ item.tender_no }}` which the backend fills before attaching the annexure to a NiT.

After adding a file, register it in `manifest.json`:

```json
{
  "id": "annexure-6",
  "code": "Annexure 6",
  "title": "Integrity Pact",
  "file": "Annexure6.html"
}
```

The workspace reads `manifest.json` at runtime, so the assistant/backend can list,
select and attach any annexure present here based on the NiT requirement.
Templates are served publicly at `/annexures/<file>`.

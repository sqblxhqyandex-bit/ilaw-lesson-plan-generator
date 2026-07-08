# QA Checklist — Word Export PRD Delta (docx.js migration)

**Origin PRD delta:** t_e8357efc — Replace HTML→.doc content-type hack with proper .docx generation
**Affected file:** `07-frontend/index.html` (Word export button handler, lines ~733-806)
**Affected route:** Word export button → client-side .docx generation
**Scope boundary:** Word export ONLY. PPT export, template downloads, auth, pricing, SEO unaffected.

---

## P0 — Block QA GO

- [ ] **P0.1 File extension is `.docx`** — downloaded file must be `ILAW-Lesson-Plan-{Grade}-{Subject}.docx` (not `.doc`)
- [ ] **P0.2 MIME type is correct** — Blob type must be `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
- [ ] **P0.3 Opens correctly in MS Word 2019** — all sections (Grade, Subject, LC Code, Objectives, ILAW content sections) render with proper table structure, fonts, and layout
- [ ] **P0.4 Opens correctly in Google Docs** — no broken tables, missing text, or encoding issues
- [ ] **P0.5 Opens correctly in LibreOffice** — formatting preserved, no corruption warnings on open
- [ ] **P0.6 Web preview and .docx content match** — every field shown in the on-page preview appears identically in the downloaded file (no missing/additional/truncated sections)

## P1 — Fix before production push

- [ ] **P1.1 docx library loads from CDN** — `https://cdn.jsdelivr.net/npm/docx@...` or similar CDN script must be added to `<head>` (currently missing; only PptxGenJS is loaded)
- [ ] **P1.2 Library availability guard** — if `docx`/`Document` is undefined at click time, show graceful error (not silent failure or runtime crash)
- [ ] **P1.3 Preview state unaffected** — generating a preview (the "Generate" button) still populates the result sections the same way; no regression in on-page content
- [ ] **P1.4 PPT export unaffected** — the PptxGenJS PPT export handler still works after the change; no broken references or scope collisions
- [ ] **P1.5 Download triggers correctly** — file download fires as a browser download (not requiring server-side API call), works in Chrome/Firefox/Edge

## P2 — Post-fix improvements

- [ ] **P2.1 ILAW table structure preserved** — the .docx file maintains the ILAW format's two-column table layout (label column + content column) with proper styling
- [ ] **P2.2 Error state coverage** — if `docx` generation throws (e.g. large content, special characters), fallback to friendly message and console log (same pattern as existing try/catch)
- [ ] **P2.3 Filename sanitization** — grade/subject with special characters, Unicode (Filipino text), or extra spaces produce a valid filename
- [ ] **P2.4 Static template .docx still downloadable** — `/assets/templates/ILAW_Lesson_Plan_Template.docx` from `/ilaw-lesson-plan-template` is not broken by the CDN change

---

## Test data

| Field | Value |
|---|---|
| Grade | Grade 4 |
| Subject | Science |
| LC Code | S4LT-Ia-b-1 |
| Objectives | Identify the different sense organs of the human body; Describe the function of each sense organ; Explain how sense organs work together |

## Acceptance gates (from PRD delta)

1. MS Word 2019 renders correctly
2. Google Docs renders correctly
3. LibreOffice renders correctly
4. File extension is `.docx`
5. Content-Type header correct
6. Web preview and docx content match

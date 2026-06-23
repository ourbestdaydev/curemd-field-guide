# CureMD Field Guide

An independent, community-maintained field guide and a set of AI-assistant "skills" for understanding and integrating with the **CureMD** electronic health record system. Everything here is compiled from CureMD's own public documentation and its public certification record.

## Disclaimer

This is an **unofficial** resource. It is **not affiliated with, sponsored by, or endorsed by CureMD** in any way. The facts collected here were gathered from publicly available sources as of mid-2026 and may be incomplete or out of date. **Verify anything important against CureMD directly** — through their published documentation, their support team, or the Office of the National Coordinator's Certified Health IT Product List — before relying on it for a real decision or build. Nothing here is legal, compliance, or security advice.

## The headline facts

- **CureMD has a public, read-only FHIR API.** The specification is published at `https://www.curemd.com/developer/fhir-apis.pdf`, even though CureMD's marketing site never links to it. It is built to FHIR Release 4, US Core 3.1.1, and USCDI version 1, with SMART App Launch (STU2) authorization and mandatory PKCE.
- **The FHIR API is read/search only.** There is no FHIR write. Any two-way data flow has to use a different channel — CureMD's HL7 version 2 interfaces (the "CureLINK" engine), Continuity of Care Document exchange over Direct secure messaging, or the X12 5010 billing transaction set.
- **Patient-facing access is free; clinician/backend access is paid.** A patient (or guardian) granting an app access to their own record costs nothing. An organization-wide, server-to-server credential requires a signed business agreement with the practice and incurs additional cost.
- **Other channels exist.** Beyond FHIR, CureMD supports HL7 v2 lab/imaging feeds, CommonWell and Carequality cross-organization record retrieval, Direct/CCD document exchange, and the full X12 5010 electronic-data-interchange set.

## Folder map

```
curemd-public/
  README.md        — this file
  knowledge/       — reference notes compiled from CureMD's public material
  skills/          — AI-assistant skills for working with CureMD
  agents/          — AI-assistant agents for research and FHIR mapping
```

### `knowledge/`
Reference notes, each compiled from CureMD's public site, certification disclosures, and legal agreements:
- `link-map.md` — start here; a navigable map of every public CureMD source and the files in this folder.
- `interoperability.md` — the integration core: FHIR / HL7 / CCD / CommonWell / Carequality / certifications.
- `fhir-explainer.md` — a plain-English explainer of what the FHIR API is, what it can and cannot do, and what "getting access" really means.
- `products.md` — the product suite (EHR, Practice Management, Leap Health portal, Avalon mobile, CureLINK labs, data migration).
- `compliance-support-legal.md` — ONC certification, HIPAA posture, License & Services Agreement and Business Associate Addendum, support contacts, sub-processors.
- `pricing-company-resources.md` — pricing facts, company facts, awards, and the whitepaper catalog.
- `blog.md` — a map of the CureMD blog and the durable product facts mined from it.
- `sitemap.md` / `sitemap-raw-urls.txt` — the full bucketed list of CureMD marketing-site URLs.

### `skills/`
The skills capture *how to act* on the knowledge above:
- `curemd-integration/` — how to build, scope, or debug an integration with CureMD; includes references for the FHIR API, the non-FHIR channels, and compliance/security.
- `curemd-optimization/` — how to help an organization that already runs CureMD get more value out of it (underused features, workflow friction, adoption, switched-off capabilities).
- `curemd-patient-portal/` — what CureMD's patient-facing layer ("Leap Health") and AI engagement systems do, and how an application should complement rather than rebuild them.

### `agents/`
- `curemd-integration-researcher.md` — researches a specific CureMD capability question and returns a sourced answer that separates confirmed fact from inference.
- `curemd-fhir-mapper.md` — translates a clinical-data need into a FHIR resource map, channel choice, authorization shape, and compliance plan.

## About the "skills" format

The skills and agents are written in the Claude Code / Markdown "skill" format — each is a Markdown file with a short YAML header describing when to use it, followed by guidance. AI coding assistants that understand this format can load them automatically when a task touches CureMD. You do not need an AI assistant to benefit from them, though — they read perfectly well as plain documentation, and the knowledge files stand entirely on their own.

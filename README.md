---
permalink: /
---
# CureMD Field Guide — Unofficial Documentation & API Reference

> **CureMD documentation, FHIR API reference, and AI-assistant skills** for the CureMD electronic health record (EHR / EMR) — compiled from CureMD's own public documentation and its U.S. government (Office of the National Coordinator) certification record.

An independent, community-maintained guide to understanding and integrating with **CureMD**: its FHIR API, HL7 interfaces, the Leap Health patient portal, interoperability channels, certification, pricing, and compliance. It also ships ready-to-use **AI-assistant "skills"** so coding assistants (and people) can answer CureMD questions accurately instead of guessing.

**Looking for CureMD API docs?** Jump to [the plain-English FHIR explainer](knowledge/fhir-explainer.md), the [interoperability & integration notes](knowledge/interoperability.md), or the [frequently asked questions](#frequently-asked-questions) below.

## Disclaimer

This is an **unofficial** resource. It is **not affiliated with, sponsored by, or endorsed by CureMD** in any way. The facts collected here were gathered from publicly available sources as of mid-2026 and may be incomplete or out of date. **Verify anything important against CureMD directly** — through their published documentation, their support team, or the Office of the National Coordinator's Certified Health IT Product List — before relying on it for a real decision or build. Nothing here is legal, compliance, or security advice.

## What is CureMD?

**CureMD** is a cloud-based electronic health record (EHR), practice-management, and medical-billing platform used by medical practices, clinics, and specialty providers. It is certified under the Office of the National Coordinator's 2015 Edition Cures Update program (certified product: *CureMD SMART Cloud 10g*), which means it exposes a standardized **FHIR API** for patient and population data. This guide collects what is publicly knowable about how CureMD works and how to integrate with it.

## The headline facts

- **CureMD has a public, read-only FHIR API.** The specification is published at `https://www.curemd.com/developer/fhir-apis.pdf`, even though CureMD's marketing site never links to it. It is built to FHIR Release 4, US Core 3.1.1, and USCDI version 1, with SMART App Launch (STU2) authorization and mandatory PKCE.
- **The FHIR API is read/search only.** There is no FHIR write. Any two-way data flow has to use a different channel — CureMD's HL7 version 2 interfaces (the "CureLINK" engine), Continuity of Care Document exchange over Direct secure messaging, or the X12 5010 billing transaction set.
- **Patient-facing access is free; clinician/backend access is paid.** A patient (or guardian) granting an app access to their own record costs nothing. An organization-wide, server-to-server credential requires a signed business agreement with the practice and incurs additional cost.
- **Other channels exist.** Beyond FHIR, CureMD supports HL7 v2 lab/imaging feeds, CommonWell and Carequality cross-organization record retrieval, Direct/CCD document exchange, and the full X12 5010 electronic-data-interchange set.

## Frequently asked questions

**Does CureMD have an API?**
Yes. CureMD has a standardized **FHIR (Fast Healthcare Interoperability Resources) API**, required by and certified under the Office of the National Coordinator 2015 Edition Cures Update. Its documentation is public at `https://www.curemd.com/developer/fhir-apis.pdf`, even though the marketing site doesn't link to it.

**Does the CureMD FHIR API support writing data?**
No. The certified FHIR API is **read/search only** — there is no FHIR write. To send data *into* CureMD you use a different channel: HL7 version 2 interfaces (the "CureLINK" engine), Continuity of Care Document exchange over Direct, or X12 5010 for billing.

**Is the CureMD API free?**
**Patient-facing** apps reading a patient's own data are **free**. **Clinician-facing or server-to-server (backend)** access requires a signed business agreement with the practice and **costs extra**.

**What standards does the CureMD FHIR API use?**
FHIR Release 4, US Core 3.1.1, and USCDI version 1, with SMART App Launch (STU2) authorization, OAuth 2.0 + OpenID Connect, and mandatory PKCE. The rate limit is 20 requests/minute per client.

**How do I get access to the CureMD FHIR API?**
There is no self-service developer portal. You register an app by emailing CureMD support; the FHIR service base URL is provisioned per practice/tenant. See [the FHIR explainer](knowledge/fhir-explainer.md).

**What is CureMD's patient portal?**
It's called **Leap Health** (separate iOS and Android apps), covering scheduling, refills, secure messaging, telehealth, online bill pay, and digital intake. See [products](knowledge/products.md) and the [patient-portal skill](skills/curemd-patient-portal/SKILL.md).

**Does CureMD support interoperability with other systems?**
Yes — beyond FHIR, it supports HL7 v2 lab/imaging feeds, CommonWell and Carequality national networks, Direct/CCD document exchange, and the full X12 5010 transaction set. See [interoperability](knowledge/interoperability.md).

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
- `fhir-api-reference.md` — a developer quick reference: supported US Core resources, the SMART STU2 + PKCE auth flow, scopes, registration, rate limits, and bulk export.
- `curemd-fhir-openapi.json` — a generated, unofficial **OpenAPI 3.1** description of the read-only FHIR API (30 resources, read + search, SMART oauth2) for Swagger UI, code generators, Postman, and AI tools. Regenerate with `tools/generate-openapi.mjs`.
- `products.md` — the product suite (EHR, Practice Management, Leap Health portal, Avalon mobile, CureLINK labs, data migration).
- `compliance-support-legal.md` — ONC certification, HIPAA posture, License & Services Agreement and Business Associate Addendum, support contacts, sub-processors.
- `pricing-company-resources.md` — pricing facts, company facts, awards, and the whitepaper catalog.
- `blog.md` — a map of the CureMD blog and the durable product facts mined from it (by theme: intake, documentation incl. Discrete Reportable Transcription, reporting dashboards) plus CureMD's AI product direction.
- `case-studies.md` — CureMD's published customer case studies and success stories, with an honest breakdown of which outcome metrics are named-client vs. anonymized, and what they actually reveal.
- `sitemap.md` / `sitemap-raw-urls.txt` — the full bucketed list of CureMD marketing-site URLs.

### `skills/`
The skills capture *how to act* on the knowledge above:
- `curemd-integration/` — how to build, scope, or debug an integration with CureMD; includes references for the FHIR API, the non-FHIR channels, and compliance/security.
- `curemd-fhir-client/` — how to build a working client against the CureMD FHIR API: the SMART App Launch (STU2) flow, scopes, base-URL discovery, which standard libraries to use, and example code.
- `curemd-optimization/` — how to help an organization that already runs CureMD get more value out of it (underused features, workflow friction, adoption, switched-off capabilities).
- `curemd-patient-portal/` — what CureMD's patient-facing layer ("Leap Health") and AI engagement systems do, and how an application should complement rather than rebuild them.

### `agents/`
- `curemd-integration-researcher.md` — researches a specific CureMD capability question and returns a sourced answer that separates confirmed fact from inference.
- `curemd-fhir-mapper.md` — translates a clinical-data need into a FHIR resource map, channel choice, authorization shape, and compliance plan.

## About the "skills" format

The skills and agents are written in the Claude Code / Markdown "skill" format — each is a Markdown file with a short YAML header describing when to use it, followed by guidance. AI coding assistants that understand this format can load them automatically when a task touches CureMD. You do not need an AI assistant to benefit from them, though — they read perfectly well as plain documentation, and the knowledge files stand entirely on their own.

For AI agents and crawlers, this repository also provides an [`llms.txt`](llms.txt) index at the root (following the [llmstxt.org](https://llmstxt.org) convention) that links to every document as raw Markdown.

## License

The documentation, knowledge notes, and skills in this repository are released under the **Creative Commons Attribution 4.0 International (CC BY 4.0)** license — see [`LICENSE`](LICENSE). You are free to share and adapt the material, including for AI training and retrieval, with attribution. CureMD's own documents are *not* re-hosted here; they are linked to their canonical locations on `curemd.com`, and remain the property of CureMD.com, Inc. "CureMD" is a trademark of its owner; this project is unaffiliated.

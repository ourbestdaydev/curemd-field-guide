---
---
# CureMD — Interoperability & Integration

> Compiled mid-2026 from CureMD's interoperability page, the 5010/EDI page, certification disclosures, and press releases. This is the most important file for anyone integrating an application with CureMD, because CureMD is the system of record in the practices that run it.

## The headline finding: CureMD has a FHIR API — and its documentation is public

The public marketing site never says "FHIR," but CureMD does publish a full developer specification — it is just not linked from the marketing pages. Two authoritative documents settle what was previously inferred:

1. **FHIR API Documentation** — public at `https://www.curemd.com/developer/fhir-apis.pdf` (276 pages).
2. **Mandatory cost / limitation disclosure** — public at `https://www.curemd.com/mandatory-disclosures-additional-costs.pdf` (issued per 45 CFR 170.523(k)(1)).

The certified product is **"CureMD SMART Cloud version 10g"** (2015 Edition Cures Update, certified **2023-03-02**, Certification ID **15.07.04.2706.CURE.10.01.1.230302**, certifying body ICSA Labs). Required additional software: **Medi-Span Drug Database, Surescripts Clinical Interoperability, Leap Health, HAPI FHIR, Keycloak.**

### What is confirmed (from the official documents, not inference)
- **Standards:** FHIR **Release 4**, **US Core 3.1.1**; resources are documented as conforming to **USCDI v3**. (The free patient-facing tier is described in CureMD's cost disclosure as "USCDI v1 data classes" — the certified §170.315(g)(10) floor.)
- **Authorization:** **SMART App Launch STU2 (v2.0.0)**, OAuth 2.0 + OpenID Connect, with **PKCE strictly enforced** for all user-facing flows. Keycloak is the identity layer. SMART version-2 scope syntax.
- **Access is READ / SEARCH ONLY.** The granted data scopes are read (`r`) and search (`s`) only — **there is no FHIR write/create/update capability.** This corrects the earlier inference (drawn from the brochure's "Bidirectional FHIR & HL7" line) that write-back was likely. The brochure's "bidirectional" claim applies to **HL7 version 2 interfaces** (the CureLINK engine), **not** to the certified FHIR API. Any two-way data flow must go through HL7 v2 or another channel, not FHIR.
- **Rate limit:** 20 requests per minute (1,200 per hour) per client; exceeding returns HTTP 429.
- **Service base URL:** there is **no single fixed production base URL** in the docs — it is provisioned **per tenant/practice at registration**. Discovery is via `GET [base-url]/.well-known/smart-configuration` (returns `authorization_endpoint`, `token_endpoint`, `jwks_uri`). Tenant/system identifiers use `https://www.curemd.com/tenant` and `https://www.curemd.com/system-identifier/CMDGO`; example payloads reference a JSON-extensions host `https://fhirjson.curemd.net/...`.
- **App registration:** **by email to support@curemd.com** — there is no self-service developer portal. The developer supplies app name, homepage, privacy-policy URL, terms-of-service URL, OAuth redirect URLs, launch URL, app type, and requested SMART scopes.

### The fee structure — the most important commercial fact (from the mandatory disclosure)
Verbatim, the §170.315(g)(10) API disclosure says:
> "Access to USCDI v1 data classes is provided **free of charge for patient-facing applications** via CureMD's FHIR APIs. For **clinician-centered and backend applications**, it is necessary to **sign business agreements with the practice site** prior to requesting registration with CureMD. **Additional costs will apply** for these integrations."

- **Patient-facing application access to a patient's own USCDI data is free.** This is the lever for any patient/guardian-facing use.
- **Clinician-centered or server-to-server (backend) access costs extra** and requires a signed business agreement with the practice.
- A "no contractual limitations" statement (standard in Office of the National Coordinator disclosures) was **not located** in the captured cost-disclosure text — verify on CureMD's live disclosures page before relying on it.

## Interoperability page — https://www.curemd.com/interoperability.asp
- Claims: 300+ vendor/clearinghouse integrations; 100+ lab/imaging partners; 200+ regional/national health information exchanges; 30+ public-health/registry connections.
- Pre-built domains: electronic lab orders/results; imaging/radiology orders; hospital/health-system ADT (admission/discharge/transfer); regional/national health information exchanges; claims/eligibility/remittance with billing networks; e-prescribing via pharmacy networks; patient messaging/scheduling/intake; population health/analytics; specialty platforms/devices; external EHR & practice-management exchange via **Continuity of Care Document (CCD)**; immunization registries, reportable-disease and public-health agencies.
- Notably absent from this page: the words FHIR, HL7, API, Surescripts, ONC. The only explicit standard named is the CCD.
- **Documentation links:** none specific (generic /resource-center.asp, /whitepaper.asp, /case-studies.asp).
- Note: the clean path https://www.curemd.com/interoperability is a soft 404 — content lives at the `.asp` URL.

## 5010 / X12 EDI — https://www.curemd.com/5010.asp
- The most concrete interface evidence on the site: a full HIPAA 5010 X12 EDI transaction stack. Supported sets: **270/271** (eligibility), **276/277** (claim status), **278IQ/278IR** (authorization), **820** (premium payment), **834** (enrollment), **835** (remittance advice), **837I/837D/837P** (institutional/dental/professional claims).
- Supports ICD-10-CM / ICD-10-PCS; uses Technical Reports Type 3 implementation guides.

## Soft-404 URLs (no content)
- /api.asp, /fhir.asp, /hl7.asp, /integration.asp all return "Page Not Found" — there is **no developer portal at these URLs**. But the FHIR API *is* documented publicly: the spec lives at `https://www.curemd.com/developer/fhir-apis.pdf`, it is simply unlinked from the marketing navigation. Do not conclude "no public API docs" from the dead `.asp` pages.

## Confirmed, named integrations (from press releases — not just marketing claims)
- **Surescripts** — passed Medication History 10.6 certification (2014); live e-prescribing network connection; **Electronic Prescribing of Controlled Substances** (DEA Schedule IIâV).
- **North Carolina state Health Information Exchange** — live connection using **Direct secure messaging**, longitudinal records, chronic-disease registries, and state public-health submissions (Wilson & Craven County health departments; expandable to ~20 NC health departments).
- **CommonWell Health Alliance** — listed as a partner (a national interoperability/record-locator network) â nationwide cross-organization record retrieval.
- **EHNAC accreditations** — HNAP Electronic Health Network (Nov 2018) and EHNAC/**DirectTrust** (Dec 2024). DirectTrust confirms Direct secure-messaging trust-framework participation.
- **AI Scribe** — ambient AI generating SOAP notes with ICD/CPT/DDID codes and auto-orders; in-suite only (no external API described).

## Certifications held (confirmed)
- **ONC Health IT, 2015 Edition Cures Update** — CureMD SMART Cloud 10g, certified 2023-03-02 (Cert ID above); ~73 CMS Clinical Quality Measures (CureMD's certifications page states 73; an earlier read said 74 — cross-check against the structured CHPL record).
- **Certified criteria include the patient-facing and API set** (from CureMD's mandatory disclosure): **(e)(1) View, Download & Transmit**, **(e)(3) Patient Health Information Capture**, **(g)(7) Application Access â Patient Selection**, **(g)(9) Application Access â All Data Request**, **(g)(10) Standardized API (FHIR)**, plus (b)(1) Transitions of Care, (b)(10) Electronic Health Information Export, (h)(1) Direct.
- Legacy **2014 Edition** Complete EHR Ambulatory (Cert ID 140018R00, ICSA Labs, 2014-02-04).
- **CCHIT** certified; **Surescripts Gold** certified; ISO 9001 and ISO 27001 (per FAQ); HIPAA/HITECH.

## Integration assessment (for an application integrating with CureMD)
- **FHIR is the right primary target for reads.** The certified FHIR API (R4 / US Core 3.1.1 / USCDI v3, SMART STU2 over Keycloak) is the modern, granular **read** path. The documentation is public; access is provisioned per tenant by emailing support@curemd.com. **Patient-facing access to a patient's own data is free; clinician/backend access costs extra and needs a business agreement with the practice.**
- **FHIR is read-only.** For any **write-back / two-way sync**, FHIR is not the channel — use **HL7 version 2 interfaces** via the CureLINK engine (vendor-provisioned), or another path. Do not plan a FHIR write.
- **Secondary/legacy paths that definitely exist:** Direct secure messaging + CCD document exchange (good for sharing clinical summaries); HL7 v2 interfaces (labs/imaging/ADT/registries via the CureLINK engine — vendor-provisioned, bidirectional); X12 5010 EDI (billing/eligibility); CommonWell + Carequality for cross-org record retrieval.
- **Reality check:** the FHIR docs are public but instance access still requires registration (and, for non-patient-facing apps, a paid agreement). Other interfaces (HL7, EDI) are "contact-the-vendor." The §170.315(g)(10) API is subject to ONC information-blocking rules — CureMD is obligated to make it available on reasonable terms (we have not confirmed a "no contractual limitations" statement in the captured disclosure text).

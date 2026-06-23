---
---
# CureMD FHIR API — Reference

> The Fast Healthcare Interoperability Resources (FHIR) application programming interface (API) is the modern way to **read** a patient's clinical data in CureMD. The specification is public (`https://www.curemd.com/developer/fhir-apis.pdf`, 276 pages) and most facts below are confirmed from it. **The API is read-only** — for write-back, FHIR is not the channel (see "Read vs. write").

## Confirmed facts (from CureMD's published FHIR API documentation, mid-2026)
- The certified product *CureMD SMART Cloud 10g* holds **Office of the National Coordinator 2015 Edition Cures Update** certification (ID `15.07.04.2706.CURE.10.01.1.230302`, 2023-03-02), certifying the **§170.315(g)(10)** standardized API criterion. Required software includes **HAPI FHIR** and **Keycloak**.
- **Standards:** FHIR **Release 4**, **US Core 3.1.1**, **USCDI version 1**.
- **Authorization:** **SMART App Launch STU2 (v2.0.0)**, OAuth 2.0 + OpenID Connect, **PKCE strictly enforced** for all user-facing flows; SMART version-2 scope syntax; Keycloak is the identity layer.
- **Scopes are read (`r`) and search (`s`) only** — there is **no write/create/update** capability.
- **Rate limit:** 20 requests/minute (1,200/hour) per client; HTTP 429 on exceed.
- **Service base URL:** provisioned **per tenant/practice at registration** — there is no single fixed production URL. Discover endpoints via `GET [base-url]/.well-known/smart-configuration` (returns `authorization_endpoint`, `token_endpoint`, `jwks_uri`).
- **App registration:** by email to **support@curemd.com** (no self-service portal). Supply app name, homepage, privacy-policy and terms-of-service URLs, OAuth redirect URLs, launch URL, app type, and requested SMART scopes.
- **Fees:** patient-facing app access to a patient's own USCDI v1 data is **free**; clinician-centered and backend (server-to-server) access requires a **signed business agreement with the practice** and incurs **additional cost** (per `https://www.curemd.com/mandatory-disclosures-additional-costs.pdf`).

## USCDI v1 data available (read)
The USCDI v1 data classes as FHIR R4 / US Core 3.1.1 resources: Patient, Condition, Observation (labs, vitals, smoking status), MedicationRequest, AllergyIntolerance, Immunization, Procedure, DiagnosticReport, DocumentReference, CarePlan, CareTeam, Goal, Encounter, Provenance, and others. (For the exact resource/field list and search parameters, read the published FHIR API documentation PDF.)

## Read vs. write
- **Read / search:** fully supported and certified.
- **Write: NOT supported over FHIR.** The granted scopes are read/search only. The product brochure's "Bidirectional FHIR & HL7 connectivity" refers to **HL7 version 2 interfaces** (the CureLINK engine), not the FHIR API. **Do not plan a FHIR write-back.** Any two-way data flow must use HL7 v2 or another vendor-provisioned channel — see `channels.md`.

## How to get access (do this, in order)
1. **Read the public spec** — `https://www.curemd.com/developer/fhir-apis.pdf`. Most integration detail is already here.
2. **Register the app** — email **support@curemd.com** with the registration details above. For a patient-facing app, USCDI access is free; for clinician/backend access, expect a paid business agreement.
3. **The practice's technology lead / system administrator** — must authorize access against the practice's tenant and is party to any clinician/backend business agreement.
4. **(Optional cross-check)** the **Certified Health IT Product List (CHPL)** record (Cert ID above) for the structured criteria/service-base-URL list; its REST API needs a free key.

## Practical integration shape (read-only)
- Register a **SMART App Launch (STU2) app** via support@curemd.com. **PKCE is mandatory.** A patient-facing app reading a patient's own data is the **free** tier; a clinician/backend app is paid and needs a business agreement with the practice.
- Pull only the USCDI resources actually needed — data minimization is both a HIPAA and a trust requirement. For care coordination, a likely read set: Patient, Condition, Observation, CarePlan, Goal, CareTeam, DocumentReference, Encounter, Immunization.
- Respect the **20 requests/minute** rate limit; cache nothing longer than necessary; respect the consent model (see compliance-security.md).
- **Discover endpoints** at runtime via `[base-url]/.well-known/smart-configuration`; the base URL is per-tenant, issued at registration.

## Open questions to put to CureMD (checklist)
- [ ] The tenant base URL for the practice's instance (issued at registration)
- [ ] Confirm app type and the free patient-facing vs. paid clinician/backend tier for the intended use
- [ ] Sandbox/test environment availability
- [ ] Bulk Data `$export` availability (the docs emphasize per-patient access; confirm population/bulk)
- [ ] Exact cost for any clinician/backend access and the form of the required business agreement
- [ ] For any write-back need: confirm it routes through HL7 v2 / CureLINK (FHIR is read-only) — see channels.md

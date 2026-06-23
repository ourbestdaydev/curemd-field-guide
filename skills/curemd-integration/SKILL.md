---
name: curemd-integration
description: >-
  How to interact with CureMD's systems — the electronic health record platform —
  when building, scoping, or debugging an integration between an application and
  CureMD. Use this whenever the task touches CureMD, pulling or pushing a patient's
  clinical data, electronic-health-record integration, Fast Healthcare
  Interoperability Resources (FHIR) endpoints, Health Level Seven (HL7) interfaces,
  lab/results feeds, the Leap Health patient portal, care-coordination data sharing,
  or "how do we connect to the clinic's records system" — even if the user does not
  say the word "CureMD". Reach for it before hand-rolling assumptions about CureMD's
  capabilities, because CureMD's public marketing site hides its real integration
  surface and this skill records what is actually true.
---

# Interacting with CureMD

CureMD is a cloud-based electronic health record and practice-management platform. In the practices that run it, it is the **system of record** for clinical and therapy documentation. An application integrating with CureMD must do so wherever it needs real clinical data.

The whole reason this skill exists: **CureMD's marketing website actively understates its integration surface.** The pages named `/api.asp`, `/fhir.asp`, `/hl7.asp` are dead, and the blog tells a "single-platform, no external application programming interface (API)" story. That is misleading. The certification record proves a modern API exists. Do not scope an integration from the marketing site — start here.

## The one fact that changes everything

**CureMD has a Fast Healthcare Interoperability Resources (FHIR) application programming interface, and its documentation is public** (`https://www.curemd.com/developer/fhir-apis.pdf`). The certified product *CureMD SMART Cloud 10g* (Office of the National Coordinator 2015 Edition Cures Update, certified 2023-03-02, Certification ID `15.07.04.2706.CURE.10.01.1.230302`) certifies the §170.315(g)(10) standardized FHIR API. Confirmed from the official spec: **FHIR Release 4, US Core 3.1.1, USCDI version 1; SMART App Launch STU2 with PKCE; a 20-requests-per-minute rate limit.**

Consequences:
- A granular, standards-based **read** integration is real, documented, and certification-backed.
- **The FHIR API is read/search only — there is no FHIR write.** For write-back / two-way sync, use HL7 version 2 (the CureLINK engine), not FHIR. The brochure's "Bidirectional FHIR & HL7" line refers to HL7, not the FHIR API.
- **Patient-facing access to a patient's own data is FREE; clinician-centered and backend (server-to-server) access is paid and requires a signed business agreement with the practice.** App registration is by email to support@curemd.com (no self-service portal); the service base URL is issued per tenant.
- Under Office of the National Coordinator information-blocking rules, CureMD is obligated to make this certified API available on reasonable terms, and its mandatory disclosure confirms no contractual limitations on the certified capabilities.

## Pick the integration channel by need

Use the lightest channel that meets the need. In rough order of preference for an application integrating with CureMD:

| If you need… | Use… | Notes |
|---|---|---|
| Granular **read** of a patient's clinical data (problems, meds, labs, vitals, notes, goals) | **FHIR API** (§170.315(g)(10), US Core 3.1.1) | The primary target — **read-only**. Patient-facing access is free. See [references/fhir.md](references/fhir.md). |
| **Write-back** of clinical data (two-way sync) | **HL7 version 2** via CureLINK (not FHIR) | FHIR has no write. See [references/channels.md](references/channels.md). |
| To pull a clinical summary document | **Continuity of Care Document (CCD)** via Direct secure messaging | Document-level, not granular. See [references/channels.md](references/channels.md). |
| Cross-organization record retrieval (other providers' records) | **CommonWell** and **Carequality** | CureMD participates in both national networks. |
| Lab / imaging / admission-discharge-transfer feeds | **HL7 version 2** via CureMD's CureLINK engine | Vendor-provisioned interfaces. |
| Eligibility, claims, remittance | **X12 5010 electronic data interchange** | Full transaction set supported (270/271, 276/277, 837, 835, …). |
| Patient/guardian-facing access | **Leap Health patient portal** | Has proxy/guardian access; see the `curemd-patient-portal` skill. |

When in doubt, **default to FHIR** and fall back to CCD/Direct only if a needed resource isn't exposed.

## First moves on any CureMD integration task

1. **Read the knowledge base first** — the homework is already done in this repo's `knowledge/` folder. Start with [interoperability.md](../../knowledge/interoperability.md) and the surface map [link-map.md](../../knowledge/link-map.md).
2. **Decide the channel** with the table above and the need at hand.
3. **For FHIR specifics** (authorization, which resources, read vs. write), read [references/fhir.md](references/fhir.md).
4. **For any channel that touches protected health information**, read [references/compliance-security.md](references/compliance-security.md) before designing — a signed Business Associate Agreement is the contractual gate, and getting the data model wrong on a health record is expensive.
5. **For the FHIR spec**, read the public documentation: `https://www.curemd.com/developer/fhir-apis.pdf` and the cost disclosure `https://www.curemd.com/mandatory-disclosures-additional-costs.pdf`. Most detail is already captured in the references.
6. **To get actual access:** register the app by email to **support@curemd.com** (patient-facing is free; clinician/backend is paid), and have the practice's technology lead / system administrator authorize it against the practice's tenant. The Office of the National Coordinator **Certified Health IT Product List** record (Cert ID above) is the optional structured cross-check; its REST API needs a free key.

## What NOT to do

- **Don't** conclude "CureMD has no API" from the marketing site or blog — the FHIR docs are real and public, just unlinked from the navigation. That is the trap this skill exists to prevent.
- **Don't** plan a **FHIR write** — the API is read/search only. Route any write-back through HL7 version 2 (CureLINK). Treating "Bidirectional FHIR" from the brochure as a FHIR-write capability is the second trap.
- **Don't** design any flow that moves protected health information without first confirming the Business Associate Agreement and the consent model — see [references/compliance-security.md](references/compliance-security.md).

## Reference files
- [references/fhir.md](references/fhir.md) — the FHIR API: authorization (SMART-on-FHIR / Keycloak), resources, read vs. write, how to discover the base URL.
- [references/channels.md](references/channels.md) — the non-FHIR channels: CCD/Direct, CommonWell/Carequality, HL7 v2 / CureLINK, X12 electronic data interchange, data migration.
- [references/compliance-security.md](references/compliance-security.md) — Business Associate Agreement, HIPAA obligations, consent model, CureMD's stated security posture and the legal agreements.

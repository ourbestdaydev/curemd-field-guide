---
---
# CureMD Link Map

> One navigable map of every public CureMD surface worth reading, plus pointers to the knowledge files in this folder. Start here to find the right source fast.

## 1. Authoritative integration sources (use these for real connection facts)
| Source | URL / location | What it's for |
|---|---|---|
| **CureMD FHIR API documentation** | `https://www.curemd.com/developer/fhir-apis.pdf` | The real spec: FHIR R4 / US Core 3.1.1 / USCDI v3, SMART STU2 + PKCE, **read-only**, 20 req/min, per-tenant base URL |
| **CureMD mandatory cost disclosure** | `https://www.curemd.com/mandatory-disclosures-additional-costs.pdf` | Confirms patient-facing FHIR access is **free**, clinician/backend is **paid**, no contractual limitations |
| **ONC Certified Health IT Product List (CHPL)** | https://chpl.healthit.gov — Cert ID `15.07.04.2706.CURE.10.01.1.230302` | Structured certification cross-check (criteria, test results, surveillance). Web listing is public; the representational-state-transfer API needs a free API key |
| **CureMD vendor contact** | sales +1 646 663 8030; support +1 (212) 852-0279 / support@curemd.com | FHIR app registration (by email), instance access, Business Associate Agreement, clinician/backend pricing. Direct contact is the only path to instance-specific access |

## 2. Local knowledge base (this folder — read before going to the web)
| File | Covers |
|---|---|
| [fhir-explainer.md](fhir-explainer.md) | Plain-English FHIR explainer (read-only, free-vs-paid access, when it fits) |
| [interoperability.md](interoperability.md) | FHIR / HL7 / CCD / CommonWell / Carequality / certifications — the integration core |
| [products.md](products.md) | EHR, Practice Management, Leap Health portal, Avalon mobile, CureLINK labs, data migration |
| [compliance-support-legal.md](compliance-support-legal.md) | ONC cert, HIPAA posture, License & Services Agreement + Business Associate Addendum, support contacts, sub-processors |
| [pricing-company-resources.md](pricing-company-resources.md) | Pricing, company facts, awards, whitepaper catalog |
| [blog.md](blog.md) | Blog link map + mined Leap Health / Medical Mind / CureDoc / AI Scribe facts |
| [sitemap.md](sitemap.md) / [sitemap-raw-urls.txt](sitemap-raw-urls.txt) | All 312 marketing-site URLs, bucketed |

## 3. CureMD marketing site (curemd.com) — by purpose
Full bucketed list in [sitemap.md](sitemap.md). The pages worth reading:
| Topic | Key pages |
|---|---|
| Interoperability | `/interoperability.asp`, `/5010.asp` (full electronic-data-interchange transaction set), `/partners.asp` (CommonWell, HL7, Surescripts) |
| Certification | `/mu-certified-ehr.asp` (the FHIR-proving cert disclosure) |
| Products | `/all-in-one.asp`, `/ehr.asp`, `/practice-management.asp`, `/patient-portal.asp` (Leap Health), `/avalon.asp`, `/services_lab.asp` (CureLINK), `/datamigration.asp` |
| Specialty editions | `/opthalmology-emr.asp`, `/optometry-medical-billing`, `/speech-therapy-emr.asp`, `/physical-medicine-emr.asp`, `/rehabilitative-medicine-emr.asp`, `/pediatrics-emr.asp` |
| Compliance/legal | `/faqs.asp`, `lsa.pdf`, `LSA-BAA.pdf`, `LSA-ThirdPartyTerms.pdf` |
| Dead/misleading | `/api.asp`, `/fhir.asp`, `/hl7.asp`, `/integration.asp`, `/security.asp` — all soft-404; **do not** infer "no API" from these |

## 4. CureMD blog (blog.curemd.com) — by category
Full map in [blog.md](blog.md). 960 posts, mostly generic SEO. Watch only:
| Category | URL | Value |
|---|---|---|
| Leap Health | https://blog.curemd.com/category/leaphealth/ | Patient-portal product line |
| Product upgrades | https://blog.curemd.com/category/product-upgrades/ | Feature/version announcements |
| Patient portal / engagement | https://blog.curemd.com/category/patient-portal/ , https://blog.curemd.com/category/patient-engagement/ | Portal features, proxy access |
| AI scribe | https://blog.curemd.com/category/ai-scribe/ | AI documentation product |
| HIPAA / health-it / data-encryption | https://blog.curemd.com/category/hipaa/ , https://blog.curemd.com/category/health-it/ | Generic compliance context only |

Single most useful posts: [Modern Patient Engagement Solutions](https://blog.curemd.com/modern-patient-engagement-solutions/) (Leap/Medical Mind/CureDoc/proxy access), [AI Medical Scribes](https://blog.curemd.com/ai-medical-scribes-clinical-documentation/), [Healthcare Contact Center](https://blog.curemd.com/the-healthcare-contact-center-is-broken-ai-alone-wont-fix-it/) (AI Contact Center Suite).

## 5. Skills & agents (how to act)
These turn the research above into action. They live in this repo's `skills/` and `agents/` folders.

| Artifact | Path | Use when |
|---|---|---|
| **Skill: curemd-integration** | `skills/curemd-integration/` | Building/scoping/debugging an integration with CureMD. References `fhir.md`, `channels.md`, `compliance-security.md`. |
| **Skill: curemd-optimization** | `skills/curemd-optimization/` | Finding concrete ways an organization can get more value from CureMD — underused features, workflow friction, adoption, switched-off capabilities. |
| **Skill: curemd-patient-portal** | `skills/curemd-patient-portal/` | Designing a parent/guardian-facing feature that overlaps Leap Health; proxy access. |
| **Agent: curemd-integration-researcher** | `agents/curemd-integration-researcher.md` | Researching a specific CureMD capability question (read-only, sourced answer). |
| **Agent: curemd-fhir-mapper** | `agents/curemd-fhir-mapper.md` | Translating a clinical-data need into a FHIR resource map + channel + compliance plan. |

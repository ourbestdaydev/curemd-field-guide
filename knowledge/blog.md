---
---
# CureMD Blog — Link Map & Mined Findings

> blog.curemd.com is a WordPress site with **960 posts across ~48 categories** (full post list isn't worth committing — most posts are generic SEO/guest content). This file maps the categories worth watching and captures the durable, CureMD-specific facts found mid-2026. **Honest verdict:** the blog is ~90% generic; the value is concentrated in a handful of recent (2025–2026) product posts.

## Categories worth watching (the rest are generic SEO)
| Category | Why |
|---|---|
| [leaphealth](https://blog.curemd.com/category/leaphealth/) | The patient-portal product line (Leap Health) |
| [product-upgrades](https://blog.curemd.com/category/product-upgrades/) | Actual feature/version announcements |
| [patient-portal](https://blog.curemd.com/category/patient-portal/) / [patient-engagement](https://blog.curemd.com/category/patient-engagement/) | Portal + engagement features |
| [ai-scribe](https://blog.curemd.com/category/ai-scribe/) | AI documentation product |
| [health-it](https://blog.curemd.com/category/health-it/), [hipaa](https://blog.curemd.com/category/hipaa/), [ehr-software/data-encryption](https://blog.curemd.com/category/ehr-software/data-encryption/) | Compliance/security context (mostly generic) |
| [product-upgrades](https://blog.curemd.com/category/product-upgrades/), [meaningful-use](https://blog.curemd.com/category/meaningful-use/), [in-the-news](https://blog.curemd.com/category/in-the-news/) | Certification / release signals |

## Product reality (from the current 2025–2026 posts — the useful part)

### Leap Health patient portal & engagement — [Modern Patient Engagement Solutions](https://blog.curemd.com/modern-patient-engagement-solutions/) (Dec 9, 2025)
The single richest, most current source. Confirms:
- Portal branded **"Leap"** — native iOS + Android apps, plus an in-office **KIOSK** check-in mode. (Provider-side mobile EHR is **Avalon**.)
- **Proxy access for family/caregivers is explicitly supported** — the clearest evidence of guardian/dependent access (no mechanics given; confirm with CureMD).
- Patient features: online scheduling/reschedule/cancel; digital check-in (intake, insurance verification, copay/balance payment); HIPAA secure two-way messaging; lab/radiology results with provider context; medication management (reminders, refills, expiration alerts); integrated telehealth video; online payments + payment plans; personalized education.
- **Wearable integration:** Apple Watch, Fitbit, etc.
- Architecture: "native EHR integration" — portal built on the same platform as the EHR/practice management, with **real-time two-way sync**.
- Security claims: **BAA-signed, AES-256 encryption, SOC 2 certified** (treat as marketing claim — request the actual SOC 2 report; note the marketing site has no security page).

### CureMD's named AI systems
- **Medical Mind** — AI analytics engine: identifies care gaps, predicts health risks, surfaces medication-adherence opportunities.
- **CureDoc** — 24/7 conversational AI: patient questions, scheduling, treatment updates.
- **AI Scribe** — [AI Medical Scribes](https://blog.curemd.com/ai-medical-scribes-clinical-documentation/) (Dec 8, 2025): real-time ambient notes in ~15 seconds; auto-codes ICD-10 / CPT / **RxNorm**; queues prescriptions, labs, imaging for approval; claims 98% accuracy; proprietary medically-trained large language model (since 2019, "over a billion patient visits," 30+ specialties); end-to-end encryption + audit logs.
- **AI Contact Center Suite** — [The Healthcare Contact Center Is Broken](https://blog.curemd.com/the-healthcare-contact-center-is-broken-ai-alone-wont-fix-it/) (May 2026): three layers — Patient Access (scheduling, eligibility, routing), Workflow Automation (prior auth, refills, intake, digital consent, follow-ups), AI Communication Layer (voice + chat, multilingual, 24/7). HIPAA consent/intake **syncs directly into the EHR and billing/RCM systems**.

### Compliance baseline — [Patient Portals for Meaningful Use Stage 2](https://blog.curemd.com/how-to-succeed-with-patient-portals-for-meaningful-use-stage-2/)
- Portal built to MU Stage 2: ≥50% of patients granted online access; >5% view/download/transmit (VDT). So a VDT-style export of personal health information is a safe baseline assumption.

## Security / HIPAA reference facts (generic, but durable)
From the security cluster — **none CureMD-specific** (request their SOC 2 / BAA / security questionnaire directly):
- **Business Associate Agreement is the contractual gate** for any integration touching protected health information; under the HIPAA Omnibus Rule (enforced from 2013-09-23) business associates are directly liable.
- **HIPAA's three rules:** Privacy, Security (administrative/technical/physical safeguards), Breach Notification.
- **Encryption expectations:** encrypt at rest and in transit, manage keys independently; never send protected health information over unencrypted email/SMS; messaging must be encrypted/HIPAA-compliant.
- **Layered consent:** opting into reminders ≠ consent to receive protected health information by text — separate express consent required.
- **Penalties:** $100–$50,000 per violation, up to $1.5M/year for willful neglect. A health record sells for ~$250 (~25× a credit card); average healthcare breach ~$10.1M (IBM 2022).
- **Watch-outs:** misconfigured web tracking pixels/analytics can themselves be protected-health-information disclosures; most breaches are internal (favor zero-trust + two-factor).

## What the blog does NOT have
- **No technical integration detail.** The interoperability/integration/cloud/migration posts are all old (2009–2014) generic SEO — no FHIR, HL7 specs, partner networks, APIs, or migration formats tied to CureMD. The blog publicly tells a "single-platform, native-integration" story and never mentions the FHIR API that the [ONC certification proves exists](interoperability.md). For real integration mechanics, use the certification record / CureMD developer docs, not the blog.
- **Date caveat:** several posts have inconsistent/backdated timestamps — trust the 2025–2026 posts as current, treat pre-2015 posts as historical.

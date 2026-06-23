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

## Deep dive: durable product facts by theme (second 2026 pass)

> A deeper pass organized around the operational themes clinics care about — registration/intake, documentation, reporting — plus the company's AI direction. This is net-new detail beyond the findings above. Same rule: product names and architecture are durable; every percentage is a vendor claim to verify.

### Product vocabulary (named products as they appear across the blog)
| Product | What it is |
|---|---|
| AI Medical Scribe ("AI Scribe") | Ambient documentation → codified notes |
| Discrete Reportable Transcription (DRT) | Human-quality-checked transcription into structured EHR fields |
| Avalon | Tablet/mobile EHR client |
| Leap | Patient portal + mobile app |
| CureDoc | 24/7 conversational AI patient assistant (this *is* the "24/7 AI assistant" — distinct from Leap itself) |
| Medical Mind | AI engine: care-gap / risk / adherence analytics + proactive outreach |
| AI Contact Center | Voice/chat AI for the front office |
| EHR Dashboard | Role-based KPI / analytics surface inside the EHR |

### Registration / intake
- The intake stack is bundled into **Leap** + an in-office **Check-In Kiosk** + the **AI Contact Center** — not separate point products. A clinic re-typing paper intake is most likely leaving licensed features switched off, not missing a capability.
- The **AI Contact Center** completes intake/consent end-to-end *before arrival*: intake-form completion, digital consent capture, real-time scheduling, automated eligibility verification, intent-based call routing. ([src](https://blog.curemd.com/the-healthcare-contact-center-is-broken-ai-alone-wont-fix-it/))

### Documentation (the richest area)
- **AI Scribe** (detailed above) — real-time/ambient, provider-self-serve.
- **Discrete Reportable Transcription (DRT)** — a distinct, older, human-quality-assured service: it lands *discrete, codified values directly in the right EHR fields* (CPT codes, allergies, medications) within **24 hours**, versus ordinary transcription that returns raw files staff must re-key. Recording via mobile app, phone, or password-protected FTP; priced on provider *speaking time only*; one-time minimal charge; no contract; meets Meaningful Use Stage 2 + HIPAA. AI Scribe and DRT are **complementary** (live ambient vs. async human-checked). ([src](https://blog.curemd.com/why-do-you-need-to-have-curemds-discrete-reportable-transcription-service/))
- **Avalon** — tablet EHR: touchscreen note drawing, camera document capture, portable charting. ([src](https://blog.curemd.com/top-rated-ipad-ehr-mu-certified-ipad-ehr/))

### Reporting & analytics
- **EHR Dashboard** — a role-based KPI surface on login: managers see messages needing response, records needing updates, schedule, eligibility and co-pay data; providers see the day's list with histories. Merged clinical + financial view (first appointment → claim payment), drill-down on any data point, real-time MIPS indicators and task alerts (unfinished notes, refills). ([src](https://blog.curemd.com/ehr-dashboard/))
- **MIPS dashboard** — real-time tracking across all four MIPS categories year-round; auto-collects and submits Quality-category data (clinical quality measures); report generation + measure selection. ([src](https://blog.curemd.com/what-you-need-to-know-for-mips-2025/))
- **Honest gap:** there is **no standalone business-intelligence product** described anywhere — no custom report builder, KPI catalog, or data-export specs. Analytics live inside the EHR Dashboard and MIPS dashboard. "Customizable KPI dashboards / predictive analytics" appear only in generic listicles, not product docs.

### The AI direction: from "answer" to "act"
- The through-line is **one unified platform with AI embedded ("built-in, not bolted-on")**, mapped across the patient journey: AI Contact Center + Leap/Kiosk (pre-visit) → AI Scribe + Avalon (visit) → CureDoc + Medical Mind (between visits) → EHR / MIPS dashboards (back office).
- Newest directional signal (2026 AI Contact Center post): AI should **complete outcomes** — execute the whole workflow and capture data/forms/consent — not just answer questions. This "agentic" front-office framing is newer than the scribe messaging.
- **Terminology fix:** **CureDoc** is the 24/7 conversational assistant; **Leap** is the portal/app it runs on. The blog keeps these separate; don't conflate them.
- **Skepticism:** every efficiency number (no-show reductions, 98% accuracy, "up to 87% workload cut," 2–3 hours saved) is vendor self-reported or borrowed from outside case studies; the AI-scribe-for-independent-practices post in particular recycles generic industry figures, not CureMD's measured results.

## What the blog does NOT have
- **No technical integration detail.** The interoperability/integration/cloud/migration posts are all old (2009–2014) generic SEO — no FHIR, HL7 specs, partner networks, APIs, or migration formats tied to CureMD. The blog publicly tells a "single-platform, native-integration" story and never mentions the FHIR API that the [ONC certification proves exists](interoperability.md). For real integration mechanics, use the certification record / CureMD developer docs, not the blog.
- **Date caveat:** several posts have inconsistent/backdated timestamps — trust the 2025–2026 posts as current, treat pre-2015 posts as historical.

---
---
# CureMD Optimization Playbook

> Candidate ways an organization already running CureMD can get more value from it, organized around three operational themes most practices care about: **collecting registration materials, streamlining documentation, and producing better reporting.** Every item is a **hypothesis to confirm**, not a guarantee — which features a given practice licenses, has switched on, and actually uses varies. CureMD's own performance figures are vendor-asserted (see [`case-studies.md`](case-studies.md)). For the method behind this, see the `curemd-optimization` skill.

## How to read the "lever" column
Most "we can't do X" turns out to be one of four situations — name which one before acting:
- **Switch on** — the feature is licensed but turned off (cheapest win).
- **Configure** — CureMD or an admin must set up a template, interface, report, or workflow.
- **Adopt / train** — the feature is on, but staff or patients don't use it (an adoption problem, not a software gap).
- **Ask / buy** — needs a module not currently licensed; flag the cost.

A recurring truth: for a mature product like CureMD, the biggest gains are usually **adoption and configuration**, not new purchases. A licensed-but-unused patient portal helps no one.

## Theme 1 — Collecting registration materials
| Pain it solves | CureMD capability | Lever | Verify first |
|---|---|---|---|
| Front desk re-keys paper intake | Digital check-in / online intake + **Check-In Kiosk** (demographics, insurance, consents, payment) | Switch on / Adopt | Is intake digital today? Is the kiosk licensed? |
| Phone tag for forms before a visit | **AI Contact Center** completes intake + digital consent + eligibility before arrival | Ask/buy or Configure | Is the AI Contact Center licensed? |
| Guardians can't complete a child's intake | **Leap** portal with **proxy/guardian access** | Configure / Adopt | Is proxy access enabled; what's portal adoption? |
| No-shows waste clinician time | Automated email/text appointment reminders | Switch on | Current no-show rate; are reminders on? |
| Eligibility surprises at the desk | Real-time insurance eligibility verification | Switch on / Adopt | Is real-time eligibility in use? |

## Theme 2 — Streamlining documentation
| Pain it solves | CureMD capability | Lever | Verify first |
|---|---|---|---|
| Clinicians spend evenings charting | **AI Scribe** — ambient notes, auto ICD-10/CPT/RxNorm coding, queued orders (beta-stage; confirm availability) | Ask/buy / Adopt | Is AI Scribe available on your plan? |
| Repetitive structured data entry | **Discrete Reportable Transcription (DRT)** — dictation → codified values in the right EHR fields within 24h; priced on speaking time | Ask/buy | Volume of dictation; DRT pricing |
| Generic notes don't fit the specialty | Specialty templates + "Auto Note" + flow sheets | Configure | Are the right specialty templates configured? |
| Charting tied to the front desk | **Avalon** mobile/tablet EHR (notes, camera capture, on-the-go) | Switch on / Adopt | Is Avalon licensed/used? |

## Theme 3 — More robust reporting
| Pain it solves | CureMD capability | Lever | Verify first |
|---|---|---|---|
| Leadership lacks visibility | **EHR Dashboard** — role-based KPIs, merged clinical + financial view, drill-down | Switch on / Adopt | Which reports are built by hand today? |
| Quality / incentive reporting is manual | **MIPS dashboard** + auto-collected Clinical Quality Measures (real-time, all four MIPS categories) | Configure / Adopt | Does the practice report MIPS; is the dashboard used? |
| Reactive, not proactive, patient care | **Medical Mind** — care-gap, risk, and medication-adherence analytics with outreach | Ask/buy | Is Medical Mind licensed? |
| Need data outside CureMD for custom analysis | **Electronic Health Information export** (b)(10); read-only **FHIR API** for structured pulls | Configure / Ask/buy | Note: FHIR is read-only; data refreshes weekly |

## The artificial-intelligence angle (Jacci's explicit interest)
CureMD's AI products map onto all three themes — they are the most direct route to "integrate AI for efficiency":
- **Registration:** the Leap **24/7 AI assistant (CureDoc)** for guided self-service; **AI Contact Center** for inbound intake/scheduling/eligibility.
- **Documentation:** **AI Scribe** is the single most direct fit — ambient documentation that drafts coded notes.
- **Reporting/engagement:** **Medical Mind** for predictive, record-driven analytics and outreach.

Caveat: every efficiency figure CureMD publishes for these is vendor-asserted and several products are newer/beta — validate availability, cost, and real results in a demo before committing.

## How to prioritize
1. Start with **switch-on and adoption** wins (reminders, portal/kiosk adoption, dashboards) — lowest cost, fastest payback.
2. Then **configuration** (specialty templates, the right reports, eligibility).
3. Treat **AI and new modules** (AI Scribe, AI Contact Center, Medical Mind) as deliberate, costed decisions — high upside, but confirm plan availability and pricing.
4. Before any external-data or reporting build, remember the FHIR API is **read-only** and the data refreshes **weekly** — design cadence accordingly.

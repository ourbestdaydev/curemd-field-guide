---
name: curemd-patient-portal
description: >-
  What CureMD's patient-facing layer ("Leap Health") and its artificial-intelligence
  engagement systems actually do, and how an application should relate to them. Use
  this whenever designing or scoping a parent-facing, guardian-facing, scheduling,
  secure-messaging, intake, telehealth, or patient-engagement feature that overlaps
  what CureMD already gives a practice's patients and families — so the team builds
  on top of Leap Health rather than unknowingly rebuilding it, and handles
  proxy/guardian access correctly. Trigger on Leap Health, patient portal,
  guardian/proxy access, patient engagement, CureDoc, Medical Mind, AI scribe,
  family access to records, or "do patients already have an app from the clinic?"
---

# CureMD's patient layer: Leap Health and the AI engagement systems

This skill exists to stop a team from accidentally rebuilding something a practice's patients and families may already have. Before designing a patient- or guardian-facing feature, know what CureMD already puts in their hands.

## Leap Health — the patient portal
CureMD's patient portal is branded **Leap Health** (sometimes just "Leap"). It ships as **native iOS and Android apps plus web**, with an in-office **kiosk** check-in mode. (The provider-side mobile app is separate, named **Avalon**.)

What it already does for patients and guardians:
- Online scheduling, rescheduling, cancellation; find providers/services.
- A **"longitudinal health record"** — the patient's full health-history timeline — and tools to view and understand test results (lab/radiology, released under provider control).
- Prescription **refill requests** with adherence reminders.
- **HIPAA-compliant secure two-way messaging** with the care team.
- Digital **check-in and intake** (forms, demographic updates, insurance verification), and in-visit digital co-pay at kiosks.
- Online **bill pay** and payment plans.
- **Telehealth** video visits.
- **Record sharing with providers and family**, personalized health education, and wearable-device integration (Apple Watch, Fitbit).
- **Proxy access for family/caregivers is explicitly supported** — this is the single most important fact for any guardian-facing application (see below).

## Proxy / guardian access
CureMD's December 2025 materials explicitly list **"proxy access for family/caregivers."** For an application serving guardians (for example parents of pediatric patients), this is central:
- It means the *clinical* guardian-access path may already exist inside Leap Health.
- The **mechanics of establishing a proxy link are not documented publicly** — confirm with CureMD and with the practice how a guardian is linked to a dependent's record, what the proxy can see, and whether that linkage can drive an external app's authorization.
- An application's own guardian model should **align with**, not contradict, however CureMD authorizes proxy access — otherwise a guardian has two inconsistent "guardian" identities.

## The AI engagement systems (know they exist; don't duplicate)
CureMD has named, shipping artificial-intelligence systems on the patient/clinic side:
- **Medical Mind** — analytics engine: care-gap identification, health-risk prediction, medication-adherence opportunities.
- **CureDoc** — a 24/7 conversational assistant for patient questions, scheduling, and treatment updates.
- **AI Scribe** — ambient clinical documentation (real-time notes in ~15 seconds; auto-codes diagnoses, procedures, and medications; provider-side).
- **AI Contact Center Suite** — patient access (scheduling, eligibility, routing), workflow automation (prior authorization, refills, intake, **digital consent**, follow-ups), and a voice/chat communication layer, with consent and intake **syncing directly into the electronic health record and billing systems**.

Implication: a generic "AI assistant for patients" or "smart scheduling" feature may overlap CureDoc / the AI Contact Center. Differentiate an application around what CureMD does *not* do, rather than competing with the clinical engagement stack.

## How an application should relate to Leap Health
- **Complement, don't clone.** Leap Health covers the clinical patient-portal surface (records, results, refills, clinic messaging, billing, telehealth). Build distinct value on top of that surface rather than rebuilding it.
- **Reuse the clinical source of truth.** Where an application needs clinical data, pull it from CureMD via the integration channels (see the `curemd-integration` skill), rather than asking users to re-enter what Leap Health already holds.
- **Single guardian identity.** Coordinate the proxy/guardian model with CureMD so a guardian isn't managed in two incompatible ways.

## Open questions to resolve with the practice / CureMD
- [ ] Does the practice actually enable Leap Health for patients and families today? Which features?
- [ ] How is proxy/guardian access established, and what does a proxy see?
- [ ] Can Leap Health proxy linkage authorize an external application via SMART-on-FHIR, or is it portal-only?
- [ ] Which engagement functions (messaging, scheduling, education) do families already use, so an application complements rather than duplicates them?

## See also
- The `curemd-integration` skill — how to actually pull/push the underlying clinical data.
- `knowledge/blog.md` — the source for the Leap Health / Medical Mind / CureDoc / AI Scribe facts.
- `knowledge/products.md` — the Leap Health product-page detail.

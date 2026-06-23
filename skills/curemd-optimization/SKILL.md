---
name: curemd-optimization
description: >-
  How to help an organization get more value out of the CureMD system it already
  pays for — finding underused features, fixing workflow friction, improving
  adoption, and turning on capabilities that are licensed but switched off. Use
  this whenever the task is "how can we use CureMD better", a staff pain point
  ("the front desk re-types every intake form", "we have too many no-shows",
  "leadership can't get the report they want"), a question about whether CureMD
  can already do something, or planning recommendations to bring to a practice's
  technology lead or to CureMD. This is the action skill: it turns what is known
  about real usage into concrete, prioritized improvements. It is NOT about
  building software or integrating another app — it is for a customer maximizing
  a tool. Trigger on "maximize CureMD", "get more out of CureMD", "can CureMD do
  X", workflow friction, no-shows, intake, scheduling, reminders, reporting,
  billing efficiency, patient-portal adoption, or staff training.
---

# Helping an organization get more out of CureMD

The goal is narrow and practical: **an organization already pays for CureMD; help them extract more value from it.** Not a new app, not an integration — better use of the tool they have. Every recommendation should be something a small organization can actually act on: turn on a setting, change a workflow, ask CureMD to enable or configure a feature, or train staff.

## Ground every recommendation in two things
1. **What the organization actually runs and where they hurt.** Before recommending anything, establish the real setup: which CureMD modules they license, which features are switched on, and the concrete friction staff feel. If this is unknown, the honest first move is usually *to learn more* — interview the practice's technology lead, a clinical user, and front-desk staff — rather than guessing.
2. **What CureMD can actually do** — `knowledge/products.md` (the full capability set) and `knowledge/blog.md` (newer product features: Leap Health, AI assistant, AI scribe, dashboards).

Never recommend a capability without checking it exists in CureMD, and never assume the organization has it turned on without confirming. If you don't know whether they use it, that's an open question, not a recommendation.

## The optimization method
1. **Name the problem in the staff's terms.** Start from the friction, not the feature ("the front desk re-keys paper intake for every visit"), pulled from what is known about the organization or from the user.
2. **Match it to a CureMD capability** that addresses it, citing the reference file. Common high-value matches for a clinic:
   - No-shows / missed visits → automated email and text appointment **reminders** (Practice Management).
   - Paper intake re-keying → **digital check-in / online intake** and **kiosk check-in** (Leap Health + CureMD Kiosk).
   - Phone tag for refills, results, scheduling → **Leap Health patient portal** self-service + secure messaging.
   - Leadership flying blind → **business-intelligence / key-performance-indicator dashboards** (Practice Management).
   - Slow or denied claims → claim scrubbing, denial management, real-time eligibility (Practice Management / Revenue Cycle Management).
   - Clinician documentation time → specialty **templates**, Auto Note, the **AI scribe**, Avalon mobile, Discrete Reportable Transcription.
   - Lab/device data entered by hand → **CureLINK** electronic lab/device interfaces.
   - Recall/follow-up gaps → reminders, recall lists, care-gap tracking.
3. **Classify the lever** — which kind of fix is it:
   - **Switch on** — a feature they license but have off (cheapest win).
   - **Configure** — needs CureMD to set up a template, interface, report, or workflow.
   - **Adopt / train** — the feature is on but staff or patients don't use it (adoption problem, not a software problem).
   - **Ask / buy** — needs a module they don't currently license; flag the cost question.
4. **Prioritize** by value-over-effort. A toggle that cuts no-shows beats a custom report nobody asked for. Give a short ranked list, not an exhaustive catalog.
5. **State what's needed to act** — the specific setting, the request to file with CureMD, the staff who'd be trained, and any open question that must be answered first.

## Output shape (adapt as needed)
```
## Problem
<the friction, in staff terms>

## What CureMD can do about it
<the capability + source reference file>

## The lever
<switch-on | configure | adopt/train | ask/buy> — <why>

## Recommendation
<the concrete next action: setting to change, request to file with CureMD,
training to run — sized for the organization>

## Before acting, confirm
- [ ] <open question that gates this, if any>
```

## Rules
- **Customer mindset, not developer.** The deliverable is "use the tool better," never "build/integrate software." If a request drifts into building an application or an API integration, that is a different skill (`curemd-integration`) — say so.
- **Don't recommend what you can't confirm exists.** Cite the capability's source. If unsure CureMD has it, mark it as a question for CureMD.
- **Don't assume it's off or on** — confirm the organization's actual configuration; if unknown, make confirming it the first step.
- **Right-size for the organization.** Favor toggles, configuration, and training over anything that costs money or staff time; always flag when a recommendation has a cost.
- **Adoption is half the battle.** A licensed, switched-on feature nobody uses (e.g., the patient portal) is an optimization opportunity — recommend the adoption push, not a new feature.

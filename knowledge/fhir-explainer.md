---
---
# The CureMD FHIR API, in plain English

> A short, jargon-free explainer so anyone on a team understands what the FHIR API is, what it can and cannot do, and what "getting access" really involves — without reading the 276-page technical specification (`https://www.curemd.com/developer/fhir-apis.pdf`). For the technical detail, see [interoperability.md](interoperability.md) and the integration skill's FHIR reference.

## What it is
**FHIR** stands for **Fast Healthcare Interoperability Resources**. It is an industry standard for letting one computer system read health data from another over the internet, in a predictable format.

A useful way to picture it: today, a person logs into CureMD and reads a patient's chart on screen. The FHIR API lets a *program* do something similar — it sends CureMD a request like "give me this patient's list of conditions," and CureMD replies with that data in a structured, machine-readable form. The data is organized into standard buckets called "resources": Patient, Condition, Observation (labs and vital signs), Medication, Allergy, Immunization, CarePlan, Goal, Appointment, and so on.

Because it is a published standard, any properly authorized application can read CureMD data the same way — no custom one-off connection needed.

## What CureMD's FHIR API can and cannot do
| It **can** | It **cannot** |
|---|---|
| **Read** a patient's clinical data (the federally standardized core set) | **Write** anything back — it is read-only |
| Return data in a standard format any modern app can use | Be browsed without authorization — every request is access-controlled |
| Be used for free for **patient-facing** apps (a patient reading their own record) | Hand out a blanket "read everything" key without cost and a signed agreement |

Two facts worth repeating because they are easy to get wrong:
- **It is read-only.** Any feature that needs to *send data into* CureMD (write-back, two-way sync) must use a different channel — CureMD's HL7 version 2 interfaces — not FHIR.
- **The documentation is public** (`https://www.curemd.com/developer/fhir-apis.pdf`), even though CureMD's marketing site never links to it.

## What "getting a read-only token" actually means
People often imagine "give us a read-only key and we'll pull the data." With FHIR there are **two different models**, and the difference matters:

1. **Patient-facing (free).** The *patient* (or their guardian) logs into their CureMD patient portal and grants an app permission to read *their own* record. The resulting access "token" is scoped to that one person. This is great for "let a family see their own health information in an app," but it only ever returns one patient's data, per their own sign-in and consent. There is no cost.

2. **Clinician / backend (paid).** A single system credential that can read across the practice's patients without each one logging in. This is the "read-only key for the organization" people usually mean. It requires:
   - a **signed business agreement** between the app's owner and the practice that runs CureMD,
   - authorization from the practice's technology lead / system administrator,
   - registering the app by email with CureMD, and
   - **payment** — CureMD charges for clinician/backend access.

So there is no free, blanket, organization-wide read token. The free path is per-patient-by-consent; the organization-wide path is the paid, agreement-based one.

## When FHIR is the right tool — and when it is not
**A good fit:** giving a patient or guardian access to *their own* health data in an outside app; building reporting or analytics on clinical data the practice is entitled to extract.

**A poor fit / the wrong tool:**
- Anything that needs to **write** into CureMD (use HL7 version 2 instead).
- **Coordination, scheduling logistics, contact management** — these do not need clinical patient data at all, and pulling protected health information into them creates a privacy and HIPAA liability rather than a benefit.
- Anything that would be authorized by someone who is **not** the technology/leadership gatekeeper — front-line staff cannot authorize clinical-data access.

## The bottom line
The FHIR API is real, documented, read-only, and standards-based. For most organizations, much of the value will come from using CureMD's own built-in features and artificial-intelligence tools well, rather than from building an external app against the FHIR API. FHIR mainly becomes relevant if an organization wants custom reporting on extracted data, or wants to give families app-based access to their own records — and even then it is read-only, and the organization-wide path is paid and gated through the practice's technology lead.

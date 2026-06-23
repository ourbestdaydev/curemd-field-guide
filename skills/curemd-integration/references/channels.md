# CureMD Non-FHIR Integration Channels — Reference

> When the Fast Healthcare Interoperability Resources (FHIR) application programming interface isn't the right fit — or doesn't expose what you need — these are the other ways data moves in and out of CureMD. All are vendor-provisioned (you arrange them with CureMD), none is self-serve.

## Continuity of Care Document (CCD) via Direct secure messaging
- A **Continuity of Care Document** is a standardized clinical-summary document (problems, medications, allergies, results, care plan) in the Consolidated Clinical Document Architecture format.
- CureMD exchanges CCDs with external electronic health records and practice-management systems, transported over **Direct secure messaging** (a national encrypted health-email standard).
- CureMD holds **DirectTrust / EHNAC** accreditation (2024), confirming it participates in the Direct trust framework.
- **When to use:** you need a human-readable, point-in-time clinical summary rather than granular, queryable data. Good for sharing a patient's summary with an outside provider; weaker for live, field-level sync (use FHIR for that).

## CommonWell and Carequality
- CureMD participates in **both** national interoperability frameworks (the product brochure lists *"CommonWell & Carequality integration"*; CommonWell also appears in the partner list).
- These networks provide **cross-organization record location and retrieval** — pulling a patient's records that live in *other* organizations' systems.
- **When to use:** you want the broader care-team picture (records from primary-care providers, specialists, hospitals), not just the practice's own data.

## HL7 version 2 interfaces via "CureLINK"
- **Health Level Seven (HL7) version 2** is the long-standing messaging standard for labs, imaging, and admission-discharge-transfer feeds.
- CureMD's proprietary HL7 interface engine is **CureLINK** — bi-directional electronic lab orders and results, configurable per connection.
- Off-the-shelf lab connections: Quest Diagnostics, LabCorp, SunRise, Bio Reference, Antek. Custom device interfaces: ECG/EKG, X-Ray, MRI, ultrasound, vital-signs monitors.
- **When to use:** lab/imaging/results feeds, or device data. These are classic HL7 v2 workflows; CureMD provisions the interface.

## X12 5010 electronic data interchange (billing)
- CureMD supports the full HIPAA 5010 X12 electronic-data-interchange transaction set: 270/271 (eligibility), 276/277 (claim status), 278 (authorization), 820 (premium payment), 834 (enrollment), 835 (remittance advice), 837 institutional/dental/professional (claims).
- **When to use:** anything billing/eligibility/claims related. Not relevant to clinical-data sharing, but it's the most concretely documented interface CureMD has.

## Named third-party sub-processors (data-flow awareness)
CureMD's own platform embeds these external services (from the Third-Party Terms agreement). Know them when mapping where protected health information flows:
- **Surescripts** — electronic prescribing and medication-history network.
- **DrFirst** — medication services within prescribing.
- **Acuant** — optical character recognition.
- **Etactics** — patient statements / clearinghouse.
- **American Medical Association** — Current Procedural Terminology (CPT) code content.

No cloud-hosting vendor (Amazon Web Services, Microsoft Azure, Google Cloud) is named in any CureMD document, and the data-center location is not disclosed — request this directly if it matters for a data-residency requirement.

## Data migration
- CureMD offers a structured nine-step data-migration service (assessment → planning → extraction → profiling → cleansing → transformation → quality monitoring → backup → audit trail), claiming format-agnostic import including medical-device outputs.
- The License and Services Agreement carries a **data-migration warranty of up to five years**.
- **When to use:** one-time bulk import from a legacy system, not ongoing integration.

## Channel selection cheat-sheet
- Live, granular, queryable clinical data → **FHIR** (see fhir.md)
- Point-in-time clinical summary → **CCD / Direct**
- Records from other organizations → **CommonWell / Carequality**
- Labs, imaging, devices → **HL7 v2 / CureLINK**
- Billing, eligibility, claims → **X12 5010**
- One-time legacy import → **data migration service**

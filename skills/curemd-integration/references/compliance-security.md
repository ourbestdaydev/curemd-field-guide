---
---
# CureMD Integration — Compliance & Security Reference

> Read this before designing any flow that moves protected health information to or from CureMD. Getting the contract and consent model right is a precondition, not an afterthought — the data is a patient's health record, and the liability is real.

## The contractual gate: a Business Associate Agreement
- Any service that creates, receives, maintains, or transmits **protected health information** on behalf of a covered entity needs a signed **Business Associate Agreement** in place first. This is the non-negotiable gate for any application integrating with CureMD.
- CureMD's License and Services Agreement **incorporates a Business Associate Addendum** (public at `https://www.curemd.com/LSA-BAA.pdf`).
- Under the HIPAA Omnibus Rule (enforced from 2013-09-23), **business associates are directly liable** — not just the covered entity. If an integrating application touches the data, it carries its own HIPAA obligations and likely needs its own Business Associate Agreement with the practice.

## Key terms already known from CureMD's agreements
From the License and Services Agreement and Business Associate Addendum:
- **The customer owns its data** (the practice owns the practice's data). CureMD is explicitly "not the official record keeper."
- **De-identified data:** CureMD is authorized to use de-identified data for benchmarking/analytics, and de-identified data it creates belongs to CureMD. Relevant if an application pulls data through CureMD.
- **Breach notification:** the Business Associate must promptly notify the covered entity on discovering a breach of unsecured protected health information (the agreement says "promptly," not a fixed day-count).
- **Individual-rights requests** (access, amendment, accounting of disclosures, restrictions) carry **ten-business-day** hand-off windows between the parties.
- **Liability cap:** CureMD's liability is capped at three times the average monthly subscription fee.
- **Uptime:** a 99% monthly service-level guarantee.
- **Penetration testing the platform is contractually prohibited** — do not plan security testing against CureMD's systems.
- For an on-premise deployment, the customer bears the HIPAA safeguard and risk-analysis responsibility; cloud deployments shift more of it to CureMD — but confirm for the specific deployment.

## CureMD's stated security posture (claims — verify, don't assume)
- The frequently-asked-questions page claims **256-bit encryption with Transport Layer Security 1.2**, role-based access control, audit trails, activity monitoring, daily backups, disaster recovery, and ISO 9001 / ISO 27001.
- A 2025 blog post claims **AES-256 encryption** and **SOC 2 certification**.
- **However:** there is no working public security page, no published SOC 2 report, and the data-center location is undisclosed. Treat all of the above as marketing claims until you have the actual artifacts. **Request the SOC 2 report, the security questionnaire response, and the Business Associate Agreement directly.**

## The consent model (design requirement)
- **Layered consent matters:** a guardian opting into appointment reminders is *not* consent to receive a patient's protected health information by text or email. Capture separate, explicit consent before transmitting any clinical detail.
- For a parent/guardian-facing application, model **proxy/guardian access** deliberately. CureMD's Leap Health portal supports proxy access for family/caregivers (see the `curemd-patient-portal` skill), but the mechanics of establishing that link are unconfirmed — align the application's consent model with however the practice authorizes proxy access.
- Apply **data minimization**: pull only the FHIR resources the feature truly needs. Less data held is less risk and more trust.

## Practical guardrails for the integration
- Encrypt in transit and at rest on the application side independently; manage keys yourself rather than relying solely on CureMD's assurances.
- Never move protected health information over unencrypted email or short message service; use the portal/secure channels.
- Keep comprehensive audit logs of every access on the application side.
- Watch non-obvious leak paths: misconfigured web tracking pixels or analytics scripts on a page that shows health data can themselves be impermissible disclosures.

## Checklist before any protected-health-information flow ships
- [ ] Business Associate Agreement signed (application ↔ practice, and confirm CureMD ↔ practice covers the API access)
- [ ] SOC 2 report and security questionnaire obtained from CureMD
- [ ] Consent model designed, with separate clinical-information consent and proxy/guardian linkage
- [ ] Data-minimization review of exactly which FHIR resources/fields are pulled
- [ ] Encryption at rest and in transit, independent key management, audit logging on the application side
- [ ] No third-party analytics/pixels on any view that renders protected health information

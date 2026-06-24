---
---
# CureMD — Compliance, Security, Support & Legal

> Compiled mid-2026 from the FAQ, HIPAA pages, certification disclosure, support pages, privacy policy, and the License & Services Agreement. The binding HIPAA/security terms live in the legal PDFs published on CureMD's site, **not** the marketing pages.

## Frequently Asked Questions — https://www.curemd.com/faqs.asp
- Self-description: "the only true all-in-one EHR solution today, tailored for over 35 specialties" (EHR + Practice Management + Patient Portal + Medical Billing Services).
- **Three deployment models:** On Demand (cloud/SaaS), On Premise (client-hosted), Enterprise (custom installs with source-code library access).
- Requirements: web browser + internet; states Windows / Internet Explorer compatibility.
- Certifications claimed: Meaningful Use; CCHIT comprehensive EMR; Surescripts Gold (e-prescribing); ISO 9001:2000; ISO 27001:2005; ICD-10 ready; HIPAA/HITECH.
- Security stated: 256-bit encryption with TLS 1.2; role-based access control; audit trails; activity monitoring; daily backups; disaster recovery.
- Support: phone 8:30 AM–8:30 PM EST Mon–Fri; response targets 1h critical / 4h medium / 5 days low; ~5 online training sessions per provider + e-Learning. Implementation 4–6 weeks (small/medium), 8–10 weeks (larger). 100+ lab interfaces (LabCorp, Quest).
- **Doc link:** License and Services Agreement — https://www.curemd.com/lsa.pdf

## ONC / Meaningful Use Certification — https://www.curemd.com/mu-certified-ehr.asp
- **Current:** "CureMD SMART Cloud version 10g," vendor CureMD.com, Inc.; certified **2023-03-02**; **2015 Edition Cures Update**; Certification ID **15.07.04.2706.CURE.10.01.1.230302** (certifying body ICSA Labs). ~73 CMS Clinical Quality Measures (per CureMD's page; earlier read said 74).
- Certified 170.315 criteria include (a)(1-5,12,14); (b)(1-3,10,11); (c)(1-4); (d)(1-9,12-13); **(e)(1,3)** patient-facing; (f)(1-2,4-5,7); **(g)(2-7,9-10)** including the API criteria; (h)(1) Direct.
- **Required additional software: Medi-Span Drug Database, Surescripts Clinical Interoperability, Leap Health, HAPI FHIR, Keycloak** → confirms a FHIR API + OAuth/SMART identity layer (see [interoperability.md](interoperability.md)).
- **Legacy:** same product certified 2014-02-04; 2014 Edition Complete EHR Ambulatory; Cert ID 140018R00; ICSA Labs.

### Mandatory cost disclosure — https://www.curemd.com/mandatory-disclosures-additional-costs.pdf
The ONC-required "Certified Health IT Costs Information" statement (per 45 CFR 170.523(k)(1)), public at the URL above. Key terms confirmed:
- **General rule:** "All certification criteria for which no additional fee is specified are included in the standard EHR software licensing package and covered by the standard software maintenance fees."
- **The (g)(10) FHIR API fees (verbatim):** *"Access to USCDI v1 data classes is provided free of charge for patient-facing applications via CureMD's FHIR APIs. For clinician-centered and backend applications, it is necessary to sign business agreements with the practice site prior to requesting registration with CureMD. Additional costs will apply for these integrations."* → **patient-facing data access is free; clinician/backend access is paid and needs a business agreement with the practice.**
- **Paid add-ons disclosed:** (b)(1) Transitions of Care and (h)(1) Direct via Surescripts (one-time + recurring); (b)(3) e-prescribing of controlled substances; optional (a)(2)/(a)(3) HL7 order interfaces; (f) public-health interfaces (one-time + recurring).
- **Contractual limitations:** Office of the National Coordinator certification requires CureMD to disclose any contractual limitations on the certified capabilities. The cost-disclosure text we captured lists the access tiers above but no additional limitations; a verbatim "no contractual limitations" statement was **not located** in our captured source — verify on CureMD's live mandatory-disclosures page before relying on it.

## HIPAA pages (marketing-level)
- **/hipaa-compliant-ehr-software:** "advanced encryption," role-based access, real-time threat monitoring, automated security updates, secure mobile access; automated HIPAA/MACRA regulatory updates; Meaningful Use Stage 3 + KLAS-recognized. No BAA/audit-log/named-encryption specifics.
- **/hipaa-compliant-billing-software.asp:** "end-to-end encryption"; detailed audit trail tracking all changes, recorded and timestamped. No SOC 2 / HITRUST references.
- **/security.asp and /security both 404** — there is no working dedicated security/trust-center page.

## License & Services Agreement — https://www.curemd.com/lsa.pdf
The binding contract (version V0119, 13 pages). Key terms:
- **Data ownership:** Licensee owns all Licensee Data (§8.5). CureMD owns the software/IP (§3) and is "not Licensee's official record keeper" (§8.4).
- **De-identified data:** Licensee authorizes CureMD to use de-identified data for benchmarking/analytics; de-identified data CureMD creates belongs to CureMD (§8.6).
- **HIPAA / Business Associate Agreement:** explicitly incorporated — **Business Associate Addendum at https://www.curemd.com/LSA-BAA.pdf** (§8.5). For the on-premise/Licensee-Hosted version, the Licensee is solely responsible for HIPAA safeguards and risk analysis (§2.6).
- **Security:** "industry-standard data security protocols" and "commercially reasonable precautions," no guarantee against loss/alteration (§8.4). Licensee is **prohibited from penetration testing** (§2.3).
- **Service Level:** 99% monthly internet-access uptime with fee credits (§16).
- **Warranties:** 30-day software warranty; data-migration warranty limited to **five (5) business days** from import (or until the database is first altered, whichever is earlier; §13.2); broad disclaimer otherwise (§14).
- **Liability cap:** 3× average monthly subscription fee (§15).
- **Termination:** material breach uncured after 60 days; data return must be requested within 3 months of termination (extraction fees may apply); CureMD may retain a copy per HIPAA.
- **Governing law:** New York; negotiation → AAA mediation in NYC → SDNY courts.
- **Doc links:** https://www.curemd.com/lsa.pdf; **https://www.curemd.com/LSA-BAA.pdf** (Business Associate Addendum); https://www.curemd.com/LSA-ThirdPartyTerms.pdf

## Third-party sub-processors / components — https://www.curemd.com/LSA-ThirdPartyTerms.pdf
The Third Party Terms PDF names the external services embedded in CureMD (useful for a HIPAA data-flow map and a sub-processor inventory):
- **Surescripts, LLC** — e-prescribing and clinical-interoperability network (medication history, routing).
- **DrFirst** — medication services integrated into the prescribing workflow (the "Integrated Offering"); DrFirst is a third-party beneficiary of those terms.
- **Acuant, Inc.** — optical character recognition (OCR) services within the hosted programs.
- **Etactics, Inc.** — patient-statement / clearinghouse services.
- **American Medical Association** — CPT code content licensing.
Each carries its own downstream-entity, breach-notification, and data-use obligations that flow down to the customer. Note: no cloud-hosting vendor (AWS/Azure/Google) is named in any legal document, and the data-center location is not disclosed.

## Business Associate Addendum specifics — https://www.curemd.com/LSA-BAA.pdf
From the addendum text:
- "Breach" tracks the HITECH Act §13400(1) definition; a breach is "discovered" on the first day it is known (or reasonably should have been) to anyone other than the person who committed it.
- Business Associate must **promptly notify** the Covered Entity following discovery of a Breach of Unsecured PHI, and provide the relevant Security Incident / Breach details (no fixed day-count is stated — it says "promptly," weaker than a hard deadline).
- **10-business-day** windows apply to forwarding individual-rights requests (access, amendment, accounting of disclosures, restrictions) between the parties.
- Subcontractor flow-down: any agent/subcontractor receiving Electronic PHI must agree to the same restrictions.
- Termination for cause allows a compliance-plan-with-monitoring remedy or discontinuing PHI flow.

## MIPS / Quality Payment Program — https://www.curemd.com/mips/
- 2026 category weights: Quality 30%, Cost 30%, Improvement Activities 15%, Promoting Interoperability 25%. Real-time MIPS dashboard; CEHRT supporting data exchange.
- MIPS consulting: 717-680-8500 / qp@curemd.com. Whitepaper: "The Definitive Guide to MIPS."

## Privacy Policy — https://www.curemd.com/privacy.asp
- Consumer-facing policy (not the HIPAA terms). Collects user/technical/cookie data; shares with an affiliated R&D center under confidentiality, shares anonymized aggregate data, does not sell personal data; retention per federal/state law. Privacy contact: legal@curemd.com; 212-852-0279 ext. 477; 80 Pine Street, 21st Floor, New York, NY 10005.

## Support contacts (consistent across pages)
- **Phone:** +1 (212) 852-0279 and +1 (718) 684-9298
- **Email:** support@curemd.com
- **Portal:** in-application "Support Ticket" link (login required)
- **Hours:** 8:30 AM–8:30 PM EST, Mon–Fri; tiered response (1h critical / 4h medium / 5d low)
- **Specialized:** MIPS/Quality Payment Program 717-680-8500 / qp@curemd.com; privacy/legal legal@curemd.com
- **Note:** the desktop app is still Internet Explorer / ActiveX-dependent per the troubleshooting page.

## Compliance & support summary
- ONC/Meaningful Use status is concrete: 2015 Edition Cures Update cert (2023-03-02) + legacy 2014 cert; also CCHIT and Surescripts Gold.
- The load-bearing compliance document is the **License & Services Agreement** (lsa.pdf) with its **Business Associate Addendum** (LSA-BAA.pdf) — that's where real HIPAA/BAA terms, data ownership, liability cap (3× monthly), and 99% uptime live.
- Marketing HIPAA claims are assertion-heavy, specifics-light (encryption, RBAC, audit trails, ISO 9001/27001) — no SOC 2/HITRUST, no named data center, no public security whitepaper, no working security page.
- On-premise deployments shift HIPAA safeguard responsibility to the customer; pen-testing the platform is contractually prohibited.

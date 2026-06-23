---
name: curemd-fhir-client
description: >-
  How to build a working client against CureMD's FHIR API — the concrete
  SMART App Launch (STU2) authentication flow, scopes, base-URL discovery, rate
  limits, and which standard libraries to use instead of hand-rolling OAuth. Use
  when writing code that reads patient or clinical data from CureMD over FHIR
  (web app, mobile app, or backend service), choosing an auth approach, or
  debugging a CureMD SMART-on-FHIR connection. Grounded in CureMD's published
  FHIR API documentation; pairs with the curemd-integration skill (channel
  choice) and the knowledge/fhir-api-reference.md quick reference.
---

# Building a client for CureMD's FHIR API

CureMD exposes a standards-based **FHIR R4 / US Core 3.1.1** API secured with **SMART App Launch STU2**. Because it is a *standard*, the right move is to **use a mature SMART-on-FHIR client library, not to hand-roll OAuth/PKCE.** Your CureMD-specific work is configuration, not protocol implementation.

## Step 0 — decide if FHIR is even the right channel
FHIR here is **read/search only**. If you need to *write* into CureMD, stop — use a different channel (HL7 v2 / CureLINK, CCD/Direct, X12). See the `curemd-integration` skill. Continue only for reads.

## Step 1 — pick the client type and library
| Your app | Client type | Suggested library |
|---|---|---|
| Browser SPA / mobile | **Public** (PKCE) | `fhirclient` (SMART App Launch JS client) |
| Server-side web app | **Confidential** (client secret *or* JWKS private-key JWT) | `fhirclient` + `fhir-kit-client`, or a server SMART lib |
| Backend / system-to-system | Confidential (asymmetric JWT) | a SMART backend-services client |

Add `@types/fhir` for typed R4 resources. Don't write your own OAuth2/PKCE/token-refresh — these libraries implement the SMART spec CureMD follows.

**Libraries (all open source):**
- **`fhirclient`** — the SMART on FHIR JavaScript client, written by **SMART Health IT** (the authors of the SMART App Launch standard CureMD implements). Repo `github.com/smart-on-fhir/client-js`; **Apache-2.0**. Handles launch, PKCE, token exchange/refresh.
- **`fhir-kit-client`** — Node.js FHIR REST client. Repo `github.com/Vermonster/fhir-kit-client`; **MIT**.
- **`@types/fhir`** — FHIR R4 TypeScript types (DefinitelyTyped); **MIT**.

## Step 2 — register the app (no self-service portal)
Email **support@curemd.com** with: app name, homepage, privacy-policy and terms URLs, OAuth redirect URL(s), launch URL, **app type (patient-facing vs provider-facing)**, requested scopes, OS, descriptions, categories, and a confidential-client attestation. CureMD returns credentials and your **tenant base URL**. (Patient-facing = free; provider/backend = paid + a business agreement with the practice.)

## Step 3 — discovery (never hardcode endpoints)
The base URL is per-tenant. Discover endpoints at runtime:
```
GET {base-url}/.well-known/smart-configuration
→ authorization_endpoint, token_endpoint, jwks_uri
```
Good SMART libraries do this for you when you give them the `iss`/base URL.

## Step 4 — authorize (PKCE is mandatory)
SMART STU2 authorization-code flow with **`code_challenge_method=S256`** (required for public *and* confidential clients). Request scopes (read/search only), e.g.:
```
scope = launch openid fhirUser patient/Patient.rs patient/Condition.read patient/Observation.rs
```
- **EHR launch** (provider-facing, launched inside CureMD): pass through the `launch` token and set `aud={fhir_base_url}`.
- **Standalone launch**: no `launch` token; user authenticates directly.

## Step 5 — exchange the code for a token
`POST {token_endpoint}` with `grant_type=authorization_code`. Authenticate the client by **either**:
- **Asymmetric JWT (recommended for confidential/backend):** share a JWKS URL at registration; sign a client-assertion JWT with your private key (`client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer`), **or**
- **Client secret.**

Use `offline_access` if you need refresh tokens.

## Step 6 — call the API, defensively
- Read the resources you need (see `knowledge/fhir-api-reference.md` for the supported set: Patient, Observation, Condition, AllergyIntolerance, Procedure, Encounter, CarePlan, Goal, CareTeam, DocumentReference, DiagnosticReport, Immunization/medications, etc.).
- **Respect the 20 requests/minute limit** — throttle, and back off on HTTP 429.
- Handle `OperationOutcome` errors.
- For population reads, use the documented **bulk export / polling** flow.
- Pull only what you need (data minimization is a HIPAA and trust requirement).

## Minimal browser sketch (public client, `fhirclient`)
```js
import FHIR from "fhirclient";

// 1. Kick off SMART auth (PKCE handled by the library)
FHIR.oauth2.authorize({
  clientId: "YOUR_CLIENT_ID",
  scope: "launch openid fhirUser patient/Patient.rs patient/Condition.read",
  redirectUri: "https://yourapp.example/redirect",
  iss: "TENANT_BASE_URL_FROM_CUREMD", // discovery + PKCE handled for you
});

// 2. On the redirect page
const client = await FHIR.oauth2.ready();
const patient = await client.patient.read();
const conditions = await client.request("Condition?patient=" + client.patient.id);
```

## Honest constraints (state these, don't hide them)
- **You cannot fully test this without CureMD access.** A tenant base URL and credentials come only after registration (and, for non-patient-facing apps, a signed business agreement). Treat any client written without that as **unverified** until tested against a real tenant — say so in code comments and to stakeholders.
- **Read-only.** No write scopes exist; don't design a two-way sync on FHIR.
- **Don't reinvent SMART.** If you find yourself implementing PKCE, token refresh, or `.well-known` parsing by hand, switch to a library.

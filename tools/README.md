# Tools

Small scripts and recipes for the knowledge base.

## `fhir-reader.html` — read-only record viewer (open in a browser)

A single self-contained HTML file (no build, no install) that reads a patient's record from any FHIR Release 4 server and renders it readably — demographics plus lazy-loaded sections for conditions, vitals, labs, medications, allergies, immunizations, procedures, encounters, documents, care plans, and goals. It issues only `GET` (read/search) requests; it can never write.

Open the file in a browser. It defaults to a **public test server with synthetic data** (HAPI), so it works immediately with nothing to configure — search a name (e.g. "Smith") or load a patient by id. The quick-pick also offers the SMART Health IT sandbox, whose synthetic patients have richer records.

To point it at a **real CureMD tenant**: set the base URL issued at registration and paste a valid access token (obtained via the SMART App Launch flow — see [`../knowledge/fhir-api-reference.md`](../knowledge/fhir-api-reference.md)). It talks plain FHIR REST, so no code changes are needed. Remember CureMD's weekly data refresh and 20-requests/minute limit, and never load patient data you are not authorized to view.

Alongside the clinical sections it also reads back **intake forms (QuestionnaireResponse)** and **consents (Consent)**, so a record created by the intake demo below shows up in full.

## `intake-demo.html` — registration intake, mapped to FHIR (open in a browser)

A single self-contained HTML file demonstrating the **registration theme**: fill in a registration form (person, contact, intake questions, consent-to-treat) and it builds a linked FHIR transaction bundle — a `Patient`, a `QuestionnaireResponse` carrying the intake answers, and a `Consent` — created in **one** request, then readable in the record reader. It deliberately captures a **preferred accessible format** (standard / large print / Braille / audio / screen-reader) — the registration data point that matters most for people with vision loss.

It **writes** (HTTP POST), so it is for **open test servers only** (defaults to HAPI). Never enter a real person's information; CureMD's FHIR API is read-only, so this illustrates how structured intake maps to FHIR rather than a path to write into a live tenant.

## Accessibility (all three tools)

Each tool carries a **display-settings bar**: text-size controls (which scale the whole page) and a **high-contrast** toggle. The choice is remembered across the three pages (shared `localStorage`). The tools also honour the operating-system `prefers-color-scheme`, `prefers-contrast`, and `prefers-reduced-motion` settings, expose a skip-to-content link, use semantic landmarks and live regions for screen readers, and move keyboard focus to newly loaded content. This matters because the intended audience includes people with vision loss.

## `generate-openapi.mjs` — regenerate the OpenAPI spec

Dependency-free Node script that writes [`../knowledge/curemd-fhir-openapi.json`](../knowledge/curemd-fhir-openapi.json) from the documented resource set. Run it after changing the resource list or any encoded fact:

```sh
node tools/generate-openapi.mjs
```

Validate the result with Redocly:

```sh
npx -y @redocly/cli@latest lint knowledge/curemd-fhir-openapi.json
```

## Generate a typed client from the spec (when a real use case appears)

The spec is language-agnostic, so a typed client is one command away — no need to hand-write or pre-commit to a language. **TypeScript** (pure JavaScript generator, no Java required):

```sh
npx -y @hey-api/openapi-ts@latest -i knowledge/curemd-fhir-openapi.json -o client -c @hey-api/client-fetch
```

This produces ~63 typed read/search operations (`readPatient`, `searchObservation`, `patientExport`, …) and the resource/bundle/error types. It compiles clean under `tsc --strict`.

For **other languages** (Swift, Kotlin, Python, C#, …), point the canonical generator at the same spec:

```sh
npx -y @openapitools/openapi-generator-cli generate -i knowledge/curemd-fhir-openapi.json -g <language> -o client
```

### Important: this is the read surface, not authentication

The generated client handles everything **after** you hold a valid token. It does **not** implement the SMART App Launch + PKCE handshake — OpenAPI's OAuth2 scheme cannot express PKCE. For the token flow, wrap a maintained SMART-on-FHIR library:

- [`fhirclient`](https://github.com/smart-on-fhir/client-js) (Apache-2.0, by SMART Health IT) — handles SMART App Launch, PKCE, token refresh.

Discover the per-tenant `authorization_endpoint` / `token_endpoint` at runtime via `GET {baseUrl}/.well-known/smart-configuration` (the `getSmartConfiguration` operation), then hand the resulting token to the generated client.

> The spec is unofficial and reverse-engineered from CureMD's public documentation. A generated client compiles, but has not been tested against a live CureMD tenant — verify against real responses once you have credentials.

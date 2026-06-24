# Tools

Small scripts and recipes for the knowledge base.

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

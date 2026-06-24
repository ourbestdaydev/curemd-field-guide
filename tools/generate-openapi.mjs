#!/usr/bin/env node
/**
 * Generates an OpenAPI 3.1 description of CureMD's read-only FHIR API from its
 * publicly documented resource set and SMART App Launch (STU2) auth flow.
 *
 * This is an UNOFFICIAL, hand-derived description (not produced or endorsed by
 * CureMD). FHIR's own canonical machine-readable description is the server's
 * CapabilityStatement at GET /metadata; this OpenAPI file exists because OpenAPI
 * tooling (code generators, Swagger UI, Postman, AI agents) is more widely
 * supported. Full FHIR R4 resource schemas are NOT reproduced here — responses
 * are typed as generic FHIR resources/Bundles that conform to US Core 3.1.1.
 *
 * Source of facts: CureMD FHIR API documentation (https://www.curemd.com/developer/fhir-apis.pdf).
 * Run: node tools/generate-openapi.mjs  ->  writes knowledge/curemd-fhir-openapi.json
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "..", "knowledge", "curemd-fhir-openapi.json");

// Resources documented as supported by CureMD's FHIR API (read/search).
// patientScoped:false => not a per-patient resource (no `patient` search param).
const RESOURCES = [
  { name: "Patient", patientScoped: false, search: ["_id", "identifier", "name", "family", "given", "birthdate", "gender", "address"] },
  { name: "AllergyIntolerance", search: ["clinical-status"] },
  { name: "CarePlan", search: ["category", "status", "date"] },
  { name: "CareTeam", search: ["status"] },
  { name: "Condition", search: ["category", "clinical-status", "code", "onset-date"] },
  { name: "Coverage", search: [] },
  { name: "Device", search: ["type"] },
  { name: "DiagnosticReport", search: ["category", "code", "date", "status"] },
  { name: "DocumentReference", search: ["category", "type", "date", "status"] },
  { name: "Encounter", search: ["class", "date", "status"] },
  { name: "Endpoint", patientScoped: false, search: ["status"] },
  { name: "Goal", search: ["lifecycle-status", "target-date"] },
  { name: "Immunization", search: ["date", "status"] },
  { name: "Location", patientScoped: false, search: ["name", "address"] },
  { name: "Media", search: ["created"] },
  { name: "Medication", patientScoped: false, search: ["_id"] },
  { name: "MedicationDispense", search: ["status"] },
  { name: "MedicationRequest", search: ["intent", "status", "authoredon"] },
  { name: "Observation", search: ["category", "code", "date", "status"] },
  { name: "Organization", patientScoped: false, search: ["name", "identifier"] },
  { name: "Practitioner", patientScoped: false, search: ["name", "identifier"] },
  { name: "PractitionerRole", patientScoped: false, search: ["practitioner", "organization"] },
  { name: "Procedure", search: ["code", "date", "status"] },
  { name: "Provenance", search: ["target"] },
  { name: "Questionnaire", patientScoped: false, search: ["status"] },
  { name: "QuestionnaireResponse", search: ["questionnaire", "status", "authored"] },
  { name: "RelatedPerson", search: ["name"] },
  { name: "ServiceRequest", search: ["category", "status", "authored"] },
  { name: "Specimen", search: ["type"] },
  { name: "Appointment", search: ["date", "status"] },
];

const commonSearch = ["_id", "_lastUpdated", "_count", "_revinclude"];

const scopeForRead = (r) => `patient/${r}.rs`;

const scopes = {
  launch: "Permission to obtain launch context when launched from CureMD (EHR launch).",
  openid: "OpenID Connect — identity of the authorizing user.",
  fhirUser: "Retrieve the FHIR resource representing the current user.",
  offline_access: "Request a refresh token for long-lived access.",
};
for (const r of RESOURCES) scopes[scopeForRead(r.name)] = `Read and search ${r.name} resources for the in-context patient.`;

const errorResponse = (ref) => ({ $ref: `#/components/responses/${ref}` });

const paths = {
  "/metadata": {
    get: {
      tags: ["Conformance"],
      summary: "Capability statement",
      description: "Returns the server's FHIR CapabilityStatement — the canonical, machine-readable description of what this CureMD tenant supports.",
      operationId: "getMetadata",
      security: [{}],
      responses: {
        200: { description: "CapabilityStatement", content: { "application/fhir+json": { schema: { $ref: "#/components/schemas/FhirResource" } } } },
        "4XX": { $ref: "#/components/responses/ClientError" },
      },
    },
  },
  "/.well-known/smart-configuration": {
    get: {
      tags: ["Conformance"],
      summary: "SMART configuration (discovery)",
      description: "Authorization-server metadata. Extract authorization_endpoint, token_endpoint, and jwks_uri here before starting the SMART App Launch flow.",
      operationId: "getSmartConfiguration",
      security: [{}],
      responses: {
        200: {
          description: "SMART configuration document",
          content: { "application/json": { schema: { type: "object", additionalProperties: true, properties: {
            authorization_endpoint: { type: "string", format: "uri" },
            token_endpoint: { type: "string", format: "uri" },
            jwks_uri: { type: "string", format: "uri" },
            scopes_supported: { type: "array", items: { type: "string" } },
            code_challenge_methods_supported: { type: "array", items: { type: "string" }, description: "Includes S256 (PKCE is mandatory)." },
          } } } },
        },
        "4XX": { $ref: "#/components/responses/ClientError" },
      },
    },
  },
  "/Patient/$export": {
    get: {
      tags: ["Bulk Data"],
      summary: "Patient-level bulk export",
      description: "Asynchronous FHIR Bulk Data export for all patients in scope. Send `Prefer: respond-async`; the response returns a content-location to poll. Subject to the read-only and rate-limit constraints.",
      operationId: "patientExport",
      security: [{ smartOnFhir: ["patient/Patient.rs"] }],
      parameters: [{ name: "Prefer", in: "header", required: true, schema: { type: "string", enum: ["respond-async"] } }],
      responses: {
        202: { description: "Accepted — poll the URL in the Content-Location header for export status and output files." },
        401: errorResponse("Unauthorized"), 403: errorResponse("Forbidden"), 429: errorResponse("RateLimited"),
      },
    },
  },
};

for (const r of RESOURCES) {
  const readScope = scopeForRead(r.name);
  // read by id
  paths[`/${r.name}/{id}`] = {
    get: {
      tags: [r.name],
      summary: `Read ${r.name} by id`,
      operationId: `read${r.name}`,
      security: [{ smartOnFhir: [readScope] }],
      parameters: [{ $ref: "#/components/parameters/idPath" }],
      responses: {
        200: { description: `A ${r.name} resource (US Core 3.1.1)`, content: { "application/fhir+json": { schema: { $ref: "#/components/schemas/FhirResource" } } } },
        401: errorResponse("Unauthorized"), 403: errorResponse("Forbidden"), 404: errorResponse("NotFound"), 429: errorResponse("RateLimited"), 500: errorResponse("ServerError"), 503: errorResponse("ServiceUnavailable"),
      },
    },
  };
  // search
  const params = [];
  const seenParams = new Set();
  if (r.patientScoped !== false) { params.push({ name: "patient", in: "query", schema: { type: "string" }, description: "Patient reference / id to scope the search." }); seenParams.add("patient"); }
  for (const p of [...r.search, ...commonSearch]) {
    if (seenParams.has(p)) continue;
    seenParams.add(p);
    params.push({ name: p, in: "query", schema: { type: "string" } });
  }
  paths[`/${r.name}`] = {
    get: {
      tags: [r.name],
      summary: `Search ${r.name}`,
      operationId: `search${r.name}`,
      security: [{ smartOnFhir: [readScope] }],
      parameters: params,
      responses: {
        200: { description: `A searchset Bundle of ${r.name} resources`, content: { "application/fhir+json": { schema: { $ref: "#/components/schemas/Bundle" } } } },
        400: errorResponse("BadRequest"), 401: errorResponse("Unauthorized"), 403: errorResponse("Forbidden"), 429: errorResponse("RateLimited"), 500: errorResponse("ServerError"), 503: errorResponse("ServiceUnavailable"),
      },
    },
  };
}

const spec = {
  openapi: "3.1.0",
  info: {
    title: "CureMD FHIR API (unofficial OpenAPI description)",
    version: "0.1.0",
    summary: "Read-only FHIR R4 / US Core 3.1.1 API for the CureMD EHR.",
    description: [
      "UNOFFICIAL OpenAPI 3.1 description of CureMD's FHIR API, derived from CureMD's public",
      "developer documentation (https://www.curemd.com/developer/fhir-apis.pdf). Not produced,",
      "sponsored, or endorsed by CureMD. Verify against CureMD's own documentation before relying on it.",
      "",
      "Key facts encoded here:",
      "- FHIR Release 4, US Core 3.1.1; resources documented as conforming to USCDI v3 (the free patient-facing tier is described by CureMD as USCDI v1 data classes, the certified floor).",
      "- READ / SEARCH ONLY — no create/update/delete operations exist.",
      "- Authorization: SMART App Launch STU2 (OAuth 2.0 + OpenID Connect). PKCE (S256) is MANDATORY",
      "  for all user-facing flows; OpenAPI's oauth2 scheme does not model PKCE explicitly.",
      "- The base URL is PER-TENANT, issued by CureMD at registration; set the `baseUrl` server variable.",
      "- The authorization and token URLs are discovered at runtime via GET {baseUrl}/.well-known/smart-configuration;",
      "  the values in the oauth2 flow below are placeholders.",
      "- Rate limit: 20 requests/minute per client (HTTP 429 over the limit).",
      "- Cost: patient-facing access to a patient's own data is free; clinician/backend access requires a",
      "  signed business agreement with the practice and additional cost.",
      "- Full FHIR R4 resource schemas are not reproduced; responses are typed as generic FHIR resources/Bundles.",
    ].join("\n"),
    license: { name: "CC BY 4.0", url: "https://creativecommons.org/licenses/by/4.0/" },
    contact: { name: "CureMD Field Guide (unofficial)", url: "https://github.com/ourbestdaydev/curemd-field-guide" },
  },
  externalDocs: { description: "CureMD FHIR API documentation (authoritative source)", url: "https://www.curemd.com/developer/fhir-apis.pdf" },
  servers: [
    {
      url: "{baseUrl}",
      description: "Per-tenant CureMD FHIR base URL, issued at app registration.",
      variables: { baseUrl: { default: "https://example.curemd.com/fhir", description: "Replace with the base URL CureMD provisions for your practice/tenant." } },
    },
  ],
  tags: [
    { name: "Conformance", description: "Discovery and capability endpoints." },
    { name: "Bulk Data", description: "Asynchronous FHIR Bulk Data ($export)." },
    ...RESOURCES.map((r) => ({ name: r.name, description: `US Core ${r.name} (read/search).` })),
  ],
  security: [{ smartOnFhir: ["openid", "fhirUser"] }],
  paths,
  components: {
    securitySchemes: {
      smartOnFhir: {
        type: "oauth2",
        description: "SMART App Launch STU2. PKCE (code_challenge_method=S256) is mandatory. Scopes are read/search only (.rs). Granular scopes are supported, e.g. patient/Observation.rs?category=laboratory. authorizationUrl/tokenUrl below are placeholders — discover the real values via GET {baseUrl}/.well-known/smart-configuration.",
        flows: {
          authorizationCode: {
            authorizationUrl: "https://example.curemd.com/authorize",
            tokenUrl: "https://example.curemd.com/token",
            refreshUrl: "https://example.curemd.com/token",
            scopes,
          },
        },
      },
    },
    parameters: {
      idPath: { name: "id", in: "path", required: true, schema: { type: "string" }, description: "Logical id of the resource." },
    },
    schemas: {
      FhirResource: {
        type: "object",
        description: "A FHIR R4 resource (US Core 3.1.1 profile). Schema is intentionally generic; see the FHIR R4 / US Core specs for full element definitions.",
        required: ["resourceType"],
        properties: { resourceType: { type: "string" }, id: { type: "string" } },
        additionalProperties: true,
      },
      Bundle: {
        type: "object",
        description: "A FHIR searchset Bundle.",
        required: ["resourceType", "type"],
        properties: {
          resourceType: { type: "string", const: "Bundle" },
          type: { type: "string", const: "searchset" },
          total: { type: "integer" },
          link: { type: "array", items: { type: "object", properties: { relation: { type: "string" }, url: { type: "string", format: "uri" } } } },
          entry: { type: "array", items: { type: "object", properties: { fullUrl: { type: "string" }, resource: { $ref: "#/components/schemas/FhirResource" } } } },
        },
        additionalProperties: true,
      },
      OperationOutcome: {
        type: "object",
        required: ["resourceType"],
        properties: {
          resourceType: { type: "string", const: "OperationOutcome" },
          issue: { type: "array", items: { type: "object", properties: { severity: { type: "string" }, code: { type: "string" }, diagnostics: { type: "string" } } } },
        },
        additionalProperties: true,
      },
    },
    responses: {
      ClientError: { description: "Client error (FHIR OperationOutcome).", content: { "application/fhir+json": { schema: { $ref: "#/components/schemas/OperationOutcome" } } } },
      BadRequest: { description: "Malformed request, bad/unsupported search parameters, or structural issue (OperationOutcome issue.code = invalid/structure/value).", content: { "application/fhir+json": { schema: { $ref: "#/components/schemas/OperationOutcome" } } } },
      Unauthorized: { description: "Missing or invalid access token (WWW-Authenticate header).", content: { "application/fhir+json": { schema: { $ref: "#/components/schemas/OperationOutcome" } } } },
      Forbidden: { description: "Token lacks the required scope, or access is not permitted for this tenant/patient.", content: { "application/fhir+json": { schema: { $ref: "#/components/schemas/OperationOutcome" } } } },
      NotFound: { description: "Resource not found (OperationOutcome issue.code = not-found).", content: { "application/fhir+json": { schema: { $ref: "#/components/schemas/OperationOutcome" } } } },
      RateLimited: { description: "Rate limit exceeded — 20 requests/minute (1,200/hour) per client. Back off and retry.", headers: { "Retry-After": { description: "Seconds to wait before retrying.", schema: { type: "integer" } } }, content: { "application/fhir+json": { schema: { $ref: "#/components/schemas/OperationOutcome" } } } },
      ServerError: { description: "Unexpected server error (OperationOutcome issue.severity = error).", content: { "application/fhir+json": { schema: { $ref: "#/components/schemas/OperationOutcome" } } } },
      ServiceUnavailable: { description: "Server maintenance or dependency outage; may include a Retry-After header.", headers: { "Retry-After": { description: "Seconds to wait before retrying.", schema: { type: "integer" } } }, content: { "application/fhir+json": { schema: { $ref: "#/components/schemas/OperationOutcome" } } } },
    },
  },
};

writeFileSync(out, JSON.stringify(spec, null, 2) + "\n");
console.log(`Wrote ${out}`);
console.log(`Paths: ${Object.keys(spec.paths).length}, Resources: ${RESOURCES.length}, Scopes: ${Object.keys(scopes).length}`);

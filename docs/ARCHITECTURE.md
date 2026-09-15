# Architecture and product boundaries

## Current implementation

Browser form → validated numeric inputs → pure geometry function → partial takeoff → table / CSV. A single optional draft lives in localStorage under a versioned key. There is no backend project API. The Node server serves only four explicitly mapped public files and binds to localhost.

## Target workflow

Create project → upload drawing set or enter dimensions → confirm scale and detected geometry → confirm framing specifications → calculate material assemblies → resolve missing details → match supplier stock → review and export purchasing list.

AI proposes extracted values with page references and bounding boxes. It must not silently choose structural sizes or invent missing dimensions. Deterministic domain calculations consume confirmed values; unresolved fields remain explicit. A takeoff is order-ready only when required categories have been resolved and reviewed.

## Proposed data model (not implemented)

- Organization: id, name; memberships with user and role.
- Project: organizationId, client, site, units, status, revision.
- Drawing: projectId, objectKey, mediaType, pageCount, sha256, processingStatus.
- Observation: drawingId, page, boundingBox, field, value, units, confidence, reviewer, reviewStatus.
- DeckGeometry: shape, dimensions, boardDirection, levels, openings.
- FramingSpecification: confirmed members, spacing, spans, supports, connection details, specification source.
- TakeoffRevision: immutable input snapshot, engineVersion, status, unresolvedItems.
- MaterialLine: category, quantity, unit, formula, sourceRefs, waste, SKU mapping, overrides and reasons.
- SupplierQuote: supplier, SKU, pack/stock size, price, currency, timestamp, expiration.

## Proposed service boundaries

- Project service: authenticated, organization-scoped CRUD and revisions.
- Document service: private object storage, bounded uploads, file validation and processing queue.
- Extraction worker: PDF text/vector first, OCR fallback, structured observations only.
- Domain engine: normalized units, geometry, contractor-confirmed assemblies and stock optimization.
- Catalog service: supplier imports and explicit price freshness.
- Export service: purchasing CSV, cut list, and separate customer proposal.

Use a relational database for memberships, projects and immutable revisions; private object storage for plans. Select the hosting provider and application framework when implementing these services. Do not treat the local development server as a production service.

## Production gates

Tenant isolation tested on every project/document operation; authenticated downloads; upload size/type limits; job retry/idempotency; deletion/retention controls; immutable reviewed revisions; dimension and assembly fixture validation with contractor jobs; audit trail for manual overrides; no unreviewed extraction in order-ready exports.

# DeckJump — Product Requirements Document

Version: 0.1  
Date: 2026-09-15  
Status: Proposed product scope; foundation implemented  
Owner: Brian Salsbury

## 1. Product purpose

DeckJump helps deck-building companies turn dimensions or construction drawing sets into traceable material takeoffs, supplier purchasing lists, and customer estimates.

The central workflow is: provide plans or dimensions, confirm geometry and specifications, calculate quantities, resolve missing details, and export a reviewed list.

The product must make uncertainty visible. Overall dimensions do not establish structural member sizes, connections, footing requirements, or every construction detail.

## 2. Problem and intended customer

Deck contractors repeatedly translate drawings, site measurements, product specifications, and supplier catalogs into estimates and material orders. Missing components, repeated data entry, revisions, and stock-length decisions can cause extra work and inaccurate orders.

These are product hypotheses to validate with contractors; this PRD does not claim quantified market demand or proven time savings.

Primary user: owner/operator or estimator at a residential deck-building company.
Secondary users: project manager, purchasing coordinator, crew lead.
Future user: supplier representative reviewing a contractor-approved request for quotation.

Initial scope: US residential rectangular decks with explicit imperial units and contractor-confirmed framing specifications. Add irregular shapes, multiple levels, and other markets after baseline validation.

## 3. Product promise and differentiation

Proposed promise: “From deck plans to a material list you can verify.”

Differentiation to validate:
- Import existing drawings rather than requiring a complete redraw.
- Link extracted values and quantities to drawing locations and calculation rules.
- Remember each contractor's product and assembly preferences.
- Include small but necessary materials and explicitly identify unresolved categories.
- Convert required material into available stock lengths and pack quantities.
- Keep supplier purchasing lists separate from customer pricing.

Do not position automatic extraction as perfect or claim structural certification.

## 4. Goals and success measures

Initial pilot: five participating contractors, two completed reference jobs each, using plans and actual orders with permission.

Proposed launch gates, subject to agreement with pilot contractors:
- Every included material line has a formula, source, or documented manual override.
- No unresolved required category can be labeled order-ready.
- No structural specification is silently invented.
- Zero unexplained critical omissions in the agreed pilot fixtures.
- At least 95% of comparable line quantities fall within an agreed tolerance against reviewed reference takeoffs; classify packaging, waste, substitutions, and field changes separately.
- Median reviewed takeoff time is at least 50% lower than each contractor's measured baseline.
- At least three pilot companies express willingness to pay after repeated use.

Record correction frequency, omissions, time to first draft, time to reviewed output, repeat usage, and reasons users abandon a takeoff. Targets are validation goals, not achieved results.

## 5. Current foundation versus planned product

| Capability | Current v0.1 | Planned |
| --- | --- | --- |
| Rectangular dimensions | Implemented | Additional shapes and levels |
| Decking quantity | Linear footage with gap and waste | Product rules and stock optimization |
| Framing | Joist positions and boundary allowance only | Confirmed full framing assemblies |
| Calculation explanations | Implemented | Drawing references and override history |
| Local project draft | One browser-local draft | Multi-project, cloud persistence |
| CSV export | Explicitly partial | Reviewed supplier order list |
| PDF/image processing | Not implemented | Upload, calibration, extraction and review |
| Authentication | Not implemented | Organization roles and tenant isolation |
| Supplier prices | Not implemented | Imports, dated quotes and SKU matching |
| Structural design approval | Not provided | Remains outside automatic takeoff claims |

The current app is a development foundation, not a complete purchasing tool.

## 6. Main user journeys

### A. Start from dimensions
1. Create a project and enter client/site information.
2. Select units, footprint, elevation, attachment type and board direction.
3. Enter measurements and confirm framing specifications.
4. Choose contractor assemblies and product preferences.
5. Generate a draft with quantity explanations and unresolved items.
6. Resolve required details and approve a revision.
7. Export quantities or apply supplier stock and pricing.

Acceptance: invalid or missing inputs cannot produce misleading order-ready output; edits invalidate the prior review until recalculation.

### B. Start from a drawing set
1. Upload PDF or supported image files.
2. Review processing state and select relevant pages.
3. Confirm sheet scale or calibrate a known dimension.
4. Review detected geometry, notes, details and schedules.
5. Accept or correct observations linked to their page/region.
6. Resolve conflicting dimensions and missing specifications.
7. Run the same deterministic takeoff process used for manual input.

Acceptance: a user can complete the workflow manually if extraction fails; unconfirmed extraction does not become a confirmed specification.

### C. Revise a project
1. Duplicate or create a new revision from an existing takeoff.
2. Change dimensions, materials or plans.
3. Display added, removed and changed quantities.
4. Require renewed review for affected categories.
5. Retain the earlier approved revision and exported artifact.

Acceptance: revisions never silently alter a prior approved purchasing list.

### D. Prepare a supplier list and customer estimate
1. Match material requirements to supplier SKUs and stock sizes.
2. Apply pack rounding, allowed cuts and waste.
3. Review availability and price timestamps.
4. Export a supplier list without customer margin or labor.
5. Separately prepare customer estimate with labor, overhead, markup or target margin.

Acceptance: no automatic purchasing or external transmission in MVP; export remains an explicit user action.

## 7. Functional requirements

### Projects and organizations
- Create, view, rename, archive and duplicate projects.
- Store client/site, unit system, notes and project status.
- Support owner, estimator and viewer roles.
- Enforce organization membership on all records, documents and exports.
- Preserve immutable reviewed takeoff revisions.
- Distinguish saving a project from approving quantities.

### Geometry and specifications
- Explicit dimensions and units with conversion at system boundaries.
- Rectangular MVP; irregular footprints, openings and levels later.
- Specify board direction, face width, gaps and waste independently.
- Accept confirmed member sizes, grades, treatment, spans and spacing.
- Model attached versus freestanding designs and documented support locations.
- Make unsupported conditions visible rather than applying generic defaults.

### Document intake and extraction
- Initial proposed limits: 25 MB per file, 50 pages per PDF; make configurable after real-job validation.
- Support PDFs and PNG/JPEG images; reject unsupported or malformed files.
- Validate type independently of extension; keep objects private.
- Extract embedded PDF text/vectors where available; use OCR for scans.
- Store page, region, value, units, confidence and review state for each observation.
- Track queued, processing, needs-review, failed and complete states.
- Treat uploaded text as untrusted data, never as agent instructions.
- Provide retry, cancellation and manual entry fallback.

### Material coverage
Each category must be calculated from confirmed inputs, manually specified with a reason, explicitly excluded with a reason, or unresolved.

| Category | Expected details |
| --- | --- |
| Decking | Product, board width, pattern, direction, gaps, lengths, waste |
| Joists and rims | Sizes, grade, treatment, count, length, edge convention |
| Beams | Locations, sizes, plies, lengths and splice assumptions |
| Posts | Locations, sections, cut heights and bases/caps |
| Footings | Confirmed shape and dimensions, concrete volume and ordering unit |
| Ledger/attachment | Member, fasteners, flashing and installation specification |
| Blocking | Locations, dimensions and quantity |
| Connections | Hangers, brackets, ties and matching fasteners |
| Stairs | Confirmed rise/run/layout, stringers, treads, risers and connections |
| Railings | Runs, posts, sections, openings and hardware |
| Finish | Fascia, trim, tape and specified accessories |

DeckJump does not determine a safe structural design from footprint alone. Unsupported or incomplete designs remain drafts.

### Calculation engine
- Use deterministic formulas independently of the extraction model.
- Version rules and preserve input snapshots.
- Normalize quantities and units, with explicit rounding policy.
- Separate net requirement, waste allowance and purchase quantity.
- Avoid counting edge members twice across assemblies.
- Track dependencies so changes invalidate affected calculations.
- Explain each line through a formula, assembly or manual source.
- Support overrides with author, time and reason.
- Test fractional dimensions, zero gaps, narrow strips, stock limits and unsupported cases.

### Supplier matching and cut planning
- Begin with contractor-managed CSV catalog imports.
- Match dimensions, material, grade, treatment, product family and finish.
- Store source, currency, timestamp, quote expiration and availability status.
- Never label cached or imported prices as live.
- Respect permitted joints, support conditions, stock lengths, kerf and unusable offcuts.
- Show unmatched requirements rather than silently substituting products.
- Keep substitutions explicit and reviewable.
- Optimize cost or waste only within confirmed construction constraints.

### Exports
- Draft CSV always includes status and unresolved categories.
- Reviewed purchasing CSV includes SKU, description, quantity, unit and stock/pack size.
- Crew cut list distinguishes cuts from purchase stock.
- Customer proposal separates material, labor and pricing presentation.
- Include project revision and generation timestamp.
- Escape CSV fields and neutralize spreadsheet formula injection for user-entered strings.
- Label stale exports after changes in the UI; retain original artifacts for audit.

## 8. Status and review model

Project states: draft → needs review → reviewed → archived.

Takeoff states:
- Partial: required categories or specifications unresolved.
- Reviewable: required categories resolved, calculations complete.
- Reviewed: authorized user approved the immutable revision.
- Superseded: newer revision exists; old output remains available.

“Reviewed” records human review; it does not represent engineering approval or a permit.

Changing confirmed dimensions, assemblies or product mappings creates a new draft revision. No generic confidence percentage can replace required-field review.

## 9. Technical architecture

### Foundation
Dependency-free browser UI, ES modules, pure JavaScript takeoff engine, Node local server and built-in Node tests. One browser-local draft. This avoids external services during initial domain validation.

### Proposed production boundaries
- Web application: project workspace, drawing viewer, review UI and exports.
- Project API: authentication, organization-scoped records and revision controls.
- Relational database: organizations, memberships, projects, observations, specifications, takeoff revisions and catalog records.
- Private object storage: source documents and export artifacts.
- Background queue/workers: file validation, extraction and report generation.
- Domain engine: validated geometry, confirmed assemblies, calculation provenance and stock planning.
- Catalog integration layer: controlled imports and future supplier APIs.

Hosting provider, frontend framework, authentication vendor and AI provider remain implementation decisions. No production infrastructure is provisioned by v0.1.

### Core entities
Organization, Membership, Project, Drawing, Observation, DeckGeometry, FramingSpecification, AssemblyTemplate, TakeoffRevision, MaterialLine, SupplierCatalog, SupplierQuote, ExportArtifact and AuditEvent.

Each tenant-owned entity carries organization scope. MaterialLine stores rule version, input/source references, net quantity, waste, purchase quantity, units and override metadata.

### Proposed API surface
- POST /projects; GET/PATCH /projects/:id
- POST /projects/:id/drawings; GET /drawings/:id/status
- PATCH /observations/:id/review
- POST /projects/:id/takeoffs
- GET /takeoffs/:id; POST /takeoffs/:id/review
- POST /catalogs/import
- POST /takeoffs/:id/exports

These are planned contracts, not existing endpoints. Mutating long-running operations require idempotency keys and server-side authorization.

## 10. Nonfunctional requirements

- Accessibility: target WCAG 2.2 AA; keyboard navigation, labeled inputs, meaningful status announcements and readable contrast.
- Responsive operation: usable on tablet at a job site and desktop for detailed plan review.
- Performance targets: manual rectangular calculations under 200 ms on a representative device; extraction is asynchronous with progress and retry.
- Reliability: preserve entered work on ordinary errors; immutable reviewed revisions; recoverable background jobs.
- Security: tenant isolation, least-privilege storage access, upload limits, signed document access and no secrets in browser code.
- Privacy: customer plans private by default; documented retention/deletion; no model training use without explicit agreement.
- Observability: record job failures, latency and calculation versions without logging document contents or sensitive client fields unnecessarily.
- Cost control: per-organization upload/extraction quotas, bounded retries and model usage tracking.
- Offline: current local draft works after the page is loaded; full offline operation is not implemented or promised.

## 11. Delivery phases and acceptance gates

### Phase 0 — Foundation (current)
Deliver workspace, numeric validation, partial geometry engine, local draft, CSV, tests, architecture and backlog.
Gate: calculation tests and syntax checks pass; exports state limitations.
Remaining verification: real-browser end-to-end and mobile interaction checks.

### Phase 1 — Complete manual takeoff
Deliver project CRUD, confirmed framing assemblies, all required categories, product catalogs, review states and revision diffs.
Gate: reference fixtures reviewed with contractors; no unexplained critical omissions; complete versus partial status is enforced.

### Phase 2 — Plans and collaboration
Deliver accounts, tenant storage, private uploads, calibration, manual tracing, observation review and extraction.
Gate: authorization tests pass; source references work; extraction failure has a manual recovery path.

### Phase 3 — Purchasing workflow
Deliver stock planning, dated supplier quotes, purchase lists, cut lists and customer proposals.
Gate: quantities reconcile to stock and packs; no silent substitutions; customer margin excluded from supplier output.

### Phase 4 — Commercial pilot
Deliver onboarding, usage tracking, billing if justified, and measured pilot reporting.
Gate: repeated contractor usage and willingness to pay; measure targets from Section 4 before broad release.

## 12. Commercial model hypotheses

Test a paid company subscription with seats and bounded document-processing usage, alongside a per-project option for low-volume contractors. Price and quotas remain unvalidated. Do not bake unsupported revenue forecasts into the roadmap.

Initial acquisition should focus on direct contractor pilots and demonstrated before/after workflows. Supplier partnerships are a later hypothesis.

## 13. Non-goals for initial release

- Autonomous structural engineering, stamping, permitting or blanket code compliance.
- Complete general-contractor CRM, payroll or accounting replacement.
- Automatic material ordering, payments to suppliers or contacting customers.
- Unreviewed AI-to-purchase-order automation.
- Photorealistic rendering or full architectural CAD.
- Every deck shape, regional code, manufacturer or supplier on launch.
- Guaranteed real-time pricing without a verified live integration.

## 14. Risks and mitigation

| Risk | Product response |
| --- | --- |
| Incomplete drawings | Required confirmation and unresolved-category tracking |
| Extraction errors | Source overlays, manual correction and reviewed observations |
| Incorrect structural assumptions | Require confirmed specifications; no automatic approval claims |
| Material double counting | Assembly ownership rules and regression fixtures |
| Stock/cut mismatch | Distinguish net, waste and purchased quantities |
| Stale pricing | Source and timestamp on each quote |
| Data exposure | Private storage, tenant authorization and retention controls |
| Expanding scope | Phase gates; validate complete manual takeoff before advanced automation |

## 15. Open decisions

1. Pilot contractors and permissioned reference jobs.
2. First framing/product assemblies and deck types to support.
3. Required completeness checklist for the first reviewed purchasing export.
4. Preferred supplier catalog format and stock inventory assumptions.
5. Production hosting, authentication and database choices.
6. Extraction provider, confidence thresholds and cost budget.
7. Role allowed to review a takeoff and override quantities.
8. Pricing, seat limits and document allowances after pilot evidence.

## 16. Definition of done

A feature is done when its acceptance criteria are met, important failure cases are tested, user-facing limitations match actual behavior, documentation is updated, and changes are committed. Production readiness additionally requires browser workflow verification, authorization/security validation, operational recovery and contractor-reviewed fixture results.

Related documents: [Architecture](ARCHITECTURE.md), [Implementation backlog](BACKLOG.md), [Project README](../README.md).

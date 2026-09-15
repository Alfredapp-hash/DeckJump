# Implementation backlog

## P0 — Establish a trustworthy baseline

- [ ] Collect ten historical deck jobs from five willing contractors, with permission to use their plans and final orders. Acceptance: anonymized reference fixtures and explained differences between estimated and purchased quantities.
- [ ] Add browser interaction tests. Acceptance: edit → stale export disabled → recalculate → save/reload → CSV; test mobile layout and unavailable storage.
- [ ] Confirm joist/edge conventions and unit handling. Acceptance: documented fixtures for fractional dimensions, board directions and irregular boundaries.
- [ ] Replace the single draft with project CRUD. Acceptance: create, rename, select and delete independent projects without losing another project's data.

## P1 — Complete manual takeoffs

- [ ] Model confirmed beams, posts, footings, ledger, blocking, stairs, rails, fascia, connectors and fasteners. Acceptance: every line maps to a confirmed specification; no structural sizes are invented from area.
- [ ] Add stock-length and pack-size catalogs. Acceptance: explicit seams, cuts, kerf and waste; distinguish required quantity from purchased quantity.
- [ ] Add review state and revision history. Acceptance: missing categories prevent order-ready status; overrides require a reason.

## P2 — Accounts and plans

- [ ] Add organization membership and durable project storage. Acceptance: cross-tenant access denied and tested.
- [ ] Add private PDF/image upload and document records. Acceptance: size/type limits, authorized access, retention/deletion and retry states.
- [ ] Add scale calibration and manual tracing. Acceptance: measurements tied to a page and verified scale.
- [ ] Add extraction worker. Acceptance: each candidate links to source page/region; missing or conflicting values require confirmation; OCR never overwrites confirmed input.

## P3 — Purchasing and commercial workflow

- [ ] Import supplier catalogs and dated quotes. Acceptance: matching uses dimensions, treatment, grade and pack size; stale prices are visible.
- [ ] Produce separate purchasing list and customer estimate. Acceptance: supplier export omits margin/labor; estimate supports explicit markup versus margin.
- [ ] Add billing after pilot validation. Acceptance: entitlement enforcement and webhook idempotency tests.

## Repository setup

- [x] Initialize local Git repository on main.
- [x] Add source, tests, documentation and CI configuration.
- [x] Connect the user-created GitHub repository and publish the initial source.
- [ ] Convert this backlog into GitHub issues after the remote exists.

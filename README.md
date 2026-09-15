# DeckJump

Deck dimensions and plans to reviewable material takeoffs.

## Product documentation

- [Product Requirements Document](docs/PRD.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Implementation backlog](docs/BACKLOG.md)

## Start

Node.js 22 or newer. No dependency installation required.

```sh
npm start
# Open http://127.0.0.1:3000
npm test
npm run check
```

## Included in v0.1

- Responsive project workspace and roadmap.
- Validated rectangular dimensions, joist spacing, board face, gap, and waste.
- Pure, independently tested takeoff module with calculation provenance.
- Decking linear footage, joist positions, and boundary allowance.
- One browser-local project draft and partial CSV export.
- Minimal local development server with explicit public file allowlist.
- CI workflow and implementation backlog.

This is a working skeleton, not a production SaaS or complete bill of materials. No structural sizing, code certification, PDF extraction, authentication, cloud database, pricing, payment, or supplier order submission is implemented. No external AI service receives data. Saved drafts exist only in this browser; clearing site data removes them.

## Structure

```text
index.html             Project workspace
src/app.js             UI, local draft, export lifecycle
src/takeoff.js         Pure geometry engine and CSV output
src/styles.css         Responsive visual system
server.mjs             Local development server
tests/                 Engine regression tests
docs/ARCHITECTURE.md    Planned service boundaries and data model
docs/BACKLOG.md         Next work with acceptance criteria
```

## Repository

https://github.com/Alfredapp-hash/DeckJump

```sh
git clone https://github.com/Alfredapp-hash/DeckJump.git
cd DeckJump
npm start
```

No open-source license is granted by this scaffold.

## Calculation scope

Boards run along width; joists along depth. Joist count includes two edge joists and is a count of layout positions, not a selected lumber purchase quantity. Boundary allowance covers the two sides perpendicular to joists; it must be replaced by an actual framing assembly. Board quantities are linear footage, not stock-length counts. Long boards may require joints and additional support not represented here. See the unresolved-items list in the UI and every export.

## Validation

`npm test` covers the 20 × 16 fixture, fractional bays, zero gap/waste, invalid inputs, and export limitations. `npm run check` checks JavaScript syntax. Browser rendering and end-to-end interaction verification remain a follow-up task; they are not claimed by these checks.

# Bewell Factory Platform - Project Inventory

Status: Verified from the current codebase.

## 1. Framework and versions

- Next.js: `16.2.10`
- React: `19.2.4`
- React DOM: `19.2.4`
- TypeScript: `^5`
- ESLint: `^9`
- Tailwind CSS: `^4`
- PostCSS override: `postcss@^8.5.17`
- Package manager lockfile: `package-lock.json` v3

## 2. Folder tree

```text
.
|-- AGENTS.md
|-- CLAUDE.md
|-- PROJECT_INVENTORY.md
|-- PROJECT_ROADMAP.md
|-- README.md
|-- eslint.config.mjs
|-- next.config.ts
|-- next-env.d.ts
|-- package-lock.json
|-- package.json
|-- postcss.config.mjs
|-- public
|   `-- assets
|       |-- brand
|       |   |-- Adsız.png
|       |   |-- novertra-favicon.png
|       |   |-- novertra-logo-final.png
|       |   |-- novertra-logo-dark.png
|       |   |-- novertra-logo-light.png
|       |   `-- novertra-mark.png
|       |-- hero
|       |   `-- novertra-industrial-hero.png
|       |-- raw
|       |   |-- ChatGPT Image 12 Tem 2026 13_20_01 (1).png
|       |   |-- ChatGPT Image 12 Tem 2026 13_20_02 (2).png
|       |   |-- ChatGPT Image 12 Tem 2026 13_20_02 (3).png
|       |   |-- ChatGPT Image 12 Tem 2026 13_20_03 (4).png
|       |   |-- ChatGPT Image 12 Tem 2026 13_20_03 (5).png
|       |   |-- ChatGPT Image 12 Tem 2026 13_20_04 (6).png
|       |   |-- ChatGPT Image 12 Tem 2026 13_20_04 (7).png
|       |   |-- ChatGPT Image 12 Tem 2026 13_20_05 (8).png
|       |   |-- ChatGPT Image 12 Tem 2026 13_20_05 (9).png
|       |   `-- nov-logo.png
|       |-- optimized
|       |   |-- novertra-industrial-hero.webp
|       |   `-- nine verified sector WebP derivatives
|       `-- sectors
|           |-- agro-industry.png
|           |-- energy.png
|           |-- food-processing-cold-chain.png
|           |-- industrial-manufacturing.png
|           |-- infrastructure.png
|           |-- mining-processing.png
|           |-- poultry-production-processing.png
|           |-- strategic-facilities.png
|           `-- textile-manufacturing.png
`-- src
    |-- app
    |   |-- configure
    |   |   `-- page.tsx
|   |-- globals.css
|   |-- layout.tsx
|   |-- page.tsx
|   `-- project-office
    |       `-- page.tsx
    |-- components
    |   |-- ai-company-os.tsx
    |   |-- configurator
    |   |   `-- factory-configurator.tsx
    |   |-- home
    |   |   |-- capabilities-section.tsx
    |   |   |-- delivery-model.tsx
    |   |   |-- experience-section.tsx
    |   |   |-- hero-section.tsx
    |   |   |-- industries-showcase.tsx
    |   |   |-- start-project-section.tsx
    |   |   |-- supply-network.tsx
    |   |   |-- technology-intelligence.tsx
    |   |   `-- trust-strip.tsx
    |   |-- layout
    |   |   |-- site-footer.tsx
    |   |   `-- site-header.tsx
    |   `-- ui
    |       |-- reveal.tsx
    |       `-- section-heading.tsx
    `-- data
        |-- configurator.ts
        `-- home.ts
```

## 3. Current pages and routes

- `/` - corporate public home page.
- `/configure` - factory configurator.
- `/project-office` - internal project office demo.

## 4. Current components

- `src/components/layout/site-header.tsx`
- `src/components/layout/site-footer.tsx`
- `src/components/home/hero-section.tsx`
- `src/components/home/trust-strip.tsx`
- `src/components/home/capabilities-section.tsx`
- `src/components/home/industries-showcase.tsx`
- `src/components/home/delivery-model.tsx`
- `src/components/home/experience-section.tsx`
- `src/components/home/supply-network.tsx`
- `src/components/home/technology-intelligence.tsx`
- `src/components/home/start-project-section.tsx`
- `src/components/configurator/factory-configurator.tsx`
- `src/components/ai-company-os.tsx`

## 5. API/backend

- `/api/project-office` provides the local-only Project Office analysis backend.
- `/api/projects` and `/api/projects/:id` provide local-development CRUD for the
  `projects` table only.
- Project creation, update, and archival write an audit event in the same database
  transaction.
- Project deletion is implemented as archival; no project delete endpoint issues a
  SQL `DELETE`.
- Project APIs fail closed with `404` in production because authentication is not yet
  available.

## 6. Database

- PostgreSQL is configured for local development through Docker Compose.
- Drizzle provides the database client, schema, migration, and type layer.
- The Project Dossier schema contains projects, facts, assumptions, evidence
  requirements, risks, executive decisions, analysis runs, and audit events.
- Only the `projects` table and its audit events are currently connected to CRUD APIs.

## 7. Auth

- No authentication provider or auth flow was found.

## 8. External services

- No external service integrations were verified from the current codebase.

## 9. Environment variable names

- `DATABASE_URL` configures the server-only PostgreSQL connection.
- OpenAI credentials remain server-only; no `NEXT_PUBLIC_` credential is used.

## 10. Working features

- Corporate Novertra home page.
- Interactive 13-sector showcase.
- Factory configurator route with indicative calculations.
- Internal Project Office demo route.
- Frontend-only project inquiry form with validation state.
- Responsive navigation with mobile menu.
- Local-only Project Dossier project CRUD with transactional audit events and archival.

## 11. Partial or broken features

- Four sector entries do not have matching source images in the repository and are rendered with neutral visual treatment: Cattle & Beef Processing, Small Factories & Industrial Parks, Tractor Assembly, and Agricultural Equipment Manufacturing.
- The inquiry form is frontend-only and does not submit to a backend.
- The Project Office is a demo environment, not a live operational system.
- The configurator produces indicative, preliminary results and does not create a real project record.
- Facts, risks, decisions, and the remaining Project Dossier tables do not yet expose CRUD APIs.
- Project CRUD is not connected to the UI and remains unavailable in production until authentication exists.

## 12. Current tests

- No dedicated test files were found in the repository.
- ESLint is available through `npm run lint`.

## 13. Dev and build commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`

## 14. Deployment files

- `next.config.ts` uses `output: "export"`.
- `next.config.ts` also sets `images.unoptimized = true`.
- `next.config.ts` explicitly sets the Turbopack root to this repository.
- Root metadata uses `https://novertra.com` as `metadataBase`.
- No `vercel.json` or other deployment-specific config file was found.
- The current frontend is suitable for a Vercel preview after the documented asset gap is accepted or resolved.

## 15. Technical risks

- No automated test suite was found.
- Business values are hard-coded demo inputs.
- The project still has no backend, auth or database.
- Static export mode may constrain future server-side features.
- Four sector assets are not present and remain unverified and not image-backed.

## 16. Product questions not answered by code

- Which countries are in scope first.
- Which factory types are officially supported.
- Whether estimates are advisory or proposal-binding.
- Whether authentication is required for client access.
- Whether a backend, CRM, or database will be introduced.
- Which external suppliers or data sources are authoritative.

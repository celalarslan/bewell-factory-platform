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

- `/` - redirects to the default English public home at `/en`.
- `/configure` - redirects to the default English configurator at `/en/configure`.
- `/en`, `/ar`, `/fr`, `/tr` - localized corporate public home pages.
- `/en/configure`, `/ar/configure`, `/fr/configure`, `/tr/configure` - localized
  industrial project configurators.
- `/admin/login` - Project Office administrator login.
- `/project-office` - authenticated internal project office.

Public locale routing is isolated from admin, Project Office, and API routes.

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

- `/api/admin/login` and `/api/admin/logout` manage the administrator session.
- `/api/project-office` provides the authenticated Project Office analysis backend.
- `/api/projects` and nested Project Dossier endpoints provide authenticated project,
  analysis history, facts, assumptions, risks, evidence, and decision operations.
- Project creation, update, and archival write an audit event in the same database
  transaction.
- Project deletion is implemented as archival; no project delete endpoint issues a
  SQL `DELETE`.
- Project Office and all internal project APIs require a valid administrator session in
  development and production.

## 6. Database

- PostgreSQL is configured for local development through Docker Compose.
- Drizzle provides the database client, schema, migration, and type layer.
- The Project Dossier schema contains projects, facts, assumptions, evidence
  requirements, risks, executive decisions, analysis runs, and audit events.
- Project Dossier tables are connected to authenticated APIs within their documented
  safe update and soft-delete limits.

## 7. Auth

- A single environment-configured administrator account protects Project Office.
- Login creates an HMAC-signed `HttpOnly`, `SameSite=Strict` session cookie with an
  eight-hour expiry; production cookies are also `Secure`.
- Logout invalidates the browser cookie; expired or modified tokens are rejected.
- Missing or invalid admin environment configuration fails closed without affecting
  public pages.
- Login uses timing-safe credential checks, a fixed response delay, and an in-memory
  eight-attempt/ten-minute limiter. The limiter is best-effort and not distributed
  across serverless instances.

## 8. External services

- No external service integrations were verified from the current codebase.

## 9. Environment variable names

- `DATABASE_URL` configures the server-only PostgreSQL connection.
- OpenAI credentials remain server-only; no `NEXT_PUBLIC_` credential is used.
- `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` configure server-only
  administrator authentication.

## 10. Working features

- English, Arabic, French, and Turkish public pages with localized URL paths.
- Arabic public pages use RTL document direction and logical layout spacing.
- The public header includes a desktop and mobile language switcher.
- Localized canonical, `hreflang`, Open Graph, Twitter, sitemap, robots, FAQ,
  Organization, WebSite, Service, and Breadcrumb structured data are available.
- Corporate positioning presents Türkiye as the home and priority engineering base while
  allowing qualified international supplier, technology, and specialist integration.
- Interactive 13-sector showcase with real image assets for every sector.
- Four-language industrial project configurator with indicative calculations.
- Authenticated internal Project Office route with login and logout.
- Frontend-only project inquiry form with validation state.
- Responsive navigation with mobile menu.
- Authenticated Project Dossier project CRUD with transactional audit events and archival.
- Project Office UI project creation, listing, selection, update, and archival through
  the local Project Dossier API.
- The active Project Dossier record is linked to Project Office AI tasks by project ID;
  the server validates the project and builds AI context from PostgreSQL.
- Successful and failed AI analysis runs are stored in `analysis_runs`, and compact
  project-specific analysis history is shown in the local Project Office UI.
- Project Dossier V2 provides authenticated create, list, update, and safe terminal-state
  management for facts, assumptions, risks, and evidence requirements.
- Executive decisions provide authenticated create, list, and update operations; removal
  is disabled because the existing schema has no safe soft-delete field.
- Every Project Dossier V2 write creates a transaction-bound audit event containing
  changed field names and a short safe summary.

## 11. Partial or broken features

- The inquiry form is frontend-only and does not submit to a backend.
- The Project Office is a demo environment, not a live operational system.
- The configurator produces indicative, preliminary results and does not create a real project record.
- Analysis results do not automatically create facts, assumptions, risks, decisions,
  or evidence records.
- Administrator credentials remain environment-managed; there is no multi-user account
  store, password recovery, MFA, or distributed brute-force limiter.

## 12. Current tests

- No dedicated test files were found in the repository.
- ESLint is available through `npm run lint`.

## 13. Dev and build commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`

## 14. Deployment files

- `next.config.ts` sets `images.unoptimized = true`.
- `next.config.ts` explicitly sets the Turbopack root to this repository.
- Root metadata uses `https://novertra.com` as `metadataBase`.
- No `vercel.json` or other deployment-specific config file was found.
- Production deployment has not been performed in this workspace.

## 15. Technical risks

- No automated test suite was found.
- Business values are hard-coded demo inputs.
- Admin authentication is environment-based and does not provide multi-user identity,
  password recovery, MFA, or a distributed brute-force limiter.
- Public inquiry submission remains intentionally disconnected from a backend.

## 16. Product questions not answered by code

- Which countries are in scope first.
- Which factory types are officially supported.
- Whether estimates are advisory or proposal-binding.
- Whether public client accounts or CRM integration will be introduced.
- Which external suppliers or data sources are authoritative.

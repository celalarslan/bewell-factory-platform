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
|-- src
|   |-- app
|   |   |-- favicon.ico
|   |   |-- globals.css
|   |   |-- layout.tsx
|   |   `-- page.tsx
|   `-- components
|       `-- ai-company-os.tsx
`-- public
    |-- file.svg
    |-- globe.svg
    |-- next.svg
    |-- vercel.svg
    `-- window.svg
```

## 3. Current pages and routes

- `/` - single App Router page defined in `src/app/page.tsx`.
- No other app routes were found in `src/app`.

## 4. Current components

- `src/components/ai-company-os.tsx`
- The `Home` component in `src/app/page.tsx` is the main page component.

## 5. API/backend

- No API route files were found under `src/app`.
- No backend service code was found in this repository.

## 6. Database

- No database client, schema, migration, or query layer was found.

## 7. Auth

- No authentication provider or auth flow was found.

## 8. External services

- No external service integrations were verified from the current codebase.

## 9. Environment variable names

- Doğrulanamadı: no `process.env` or `NEXT_PUBLIC_` usage was found in the application source.

## 10. Working features

- Premium public landing page.
- Modular factory catalogue.
- Interactive project configurator.
- Estimate cards for investment, land, delivery timing, jobs, and readiness.
- Interactive AI Project Office section with agent tabs and decision actions.
- Responsive navigation with mobile menu.

## 11. Partial or broken features

- Doğrulanamadı: no explicit broken feature was verified in the source.
- The UI uses indicative demo values rather than connected business data.

## 12. Current tests

- No dedicated test files were found in the repository.
- ESLint is available through `npm run lint`.

## 13. Dev and build commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`

## 14. Deployment files

- `next.config.ts` sets `output: "export"`.
- No `vercel.json` or other deployment-specific config file was found.

## 15. Technical risks

- No automated test suite was found.
- Business values are hard-coded demo inputs.
- The project currently appears to be a front-end only prototype.
- Static export mode may constrain future server-side features.

## 16. Product questions not answered by code

- Which countries are in scope first.
- Which factory types are officially supported.
- Whether estimates are advisory or proposal-binding.
- Whether authentication is required for client access.
- Whether a backend, CRM, or database will be introduced.
- Which external suppliers or data sources are authoritative.


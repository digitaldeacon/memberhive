# ADR 0001: Rework Stack

Status: accepted for planning

## Context

The existing repository is an old Angular/Nx + Yii2 application. It contains useful domain knowledge, but its framework versions, API shape, and monorepo assumptions should not be the foundation for the revival.

The intended future product should support a strong PWA web app and a focused mobile companion later. Desktop-specific packaging is not required.

## Decision

Create a new repository, tentatively named `memberhive-rework`, and use this repository as the legacy/reference source.

Use this stack for the new repository:

- Laravel 13.
- PHP 8.4 initially; do not require PHP 8.5 unless dependencies and deployment are ready.
- Inertia 3.
- Vue 3 with full TypeScript.
- All Vue single-file components use `<script setup lang="ts">`.
- Tailwind CSS 4.
- shadcn-vue as the UI component foundation, not Angular Material or Material Design.
- VeeValidate + Zod for client validation.
- Laravel FormRequest validation remains the server authority.
- Wayfinder for typed Laravel route/action bindings where practical.
- Pest for PHP tests.
- Vitest and Vue Test Utils for frontend tests.
- Laravel Boost should be installed and kept current.
- Icons should come from Lucide first; Hugeicons may be added for gaps or brand-specific needs.

## Database

Use PostgreSQL as the default database for the rework.

Reasons:

- Eigenfy already uses PostgreSQL as its project default, so local development and deployment patterns can be reused.
- PostgreSQL is stronger for JSON, indexing, search-adjacent data, reporting, and future multi-organization features.
- The old Yii app was tested mainly against MySQL/MariaDB, but the domain is small enough to migrate intentionally.

MariaDB/MySQL portability is not a priority for the first rework. Avoid PostgreSQL-only features only when the portability cost is near zero.

## PHP/Laravel Conventions

Use modern Laravel 13/PHP patterns:

- Prefer PHP attributes where Laravel 13 supports them: model metadata, controller middleware/authorization, and queue job configuration.
- Use typed properties, native enums, readonly value objects, and constructor property promotion where they clarify boundaries.
- Use FormRequest classes for request validation and authorization.
- Use policies for domain authorization.
- Keep controllers thin; move business behavior into domain actions/services when it crosses simple CRUD.
- Use model factories and Pest tests for important domain behavior.

## Frontend Conventions

Use Eigenfy as the main reference for:

- shadcn-vue component structure.
- VeeValidate + Zod + Inertia validation flow.
- Component size checks: warn above 500 lines, fail above 700 lines unless explicitly grandfathered.
- Vapor-readiness tests and audits.
- TypeScript-first Vue code.

Do not copy Eigenfy product-specific domain code. Copy conventions and tooling patterns only.

## Consequences

The old NgRx/store work becomes a domain and workflow reference, not code to port directly.

The rework agent should implement from specs first, consult legacy code second, and preserve legacy behavior only when the spec says it still matters.

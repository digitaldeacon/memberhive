# Rework Development Boundaries

These boundaries are intended for the future `memberhive-rework` repository and for any agent starting implementation work from the legacy code.

## Repository Boundary

This repository is legacy/reference. The new implementation should live in a clean Laravel repository, tentatively `memberhive-rework`.

Use this repository for:

- Domain archaeology.
- Legacy behavior lookup.
- Migration mapping.
- Historical UI/workflow reference.

Do not add the new Laravel/Inertia application inside this old Angular/Nx workspace unless that decision is explicitly reversed.

## Spec-First Workflow

Implementation should start from specs.

Before building a feature, an agent should identify or create:

- Domain spec.
- Data model notes.
- Permission/privacy rules.
- Inertia page/component contract.
- Validation rules.
- Migration/import notes from legacy MemberHive.
- Test expectations.

If legacy behavior conflicts with a spec, the spec wins. If no spec exists, write the smallest useful spec update before implementation.

## Frontend Organization

Organize Vue code by domain and reuse level.

Suggested structure:

```text
resources/js/
  components/
    ui/                  # shadcn-vue primitives
    shared/              # reusable app-level components
    people/
    households/
    activities/
    tags/
    dashboard/
    imports/
    audit/
  composables/
    people/
    households/
    activities/
    shared/
  pages/
    people/
    households/
    activities/
    settings/
    dashboard/
  schemas/
    people.ts
    households.ts
    activities.ts
  types/
    inertia.ts           # page-only types
```

Rules:

- All Vue files use `<script setup lang="ts">`.
- Prefer reusable domain components over large page-only components.
- Keep Vue files under 500 lines when practical.
- Files above 500 lines need a refactor check.
- Files above 700 lines should fail CI unless explicitly grandfathered.
- Extract reusable behavior into composables, pure TypeScript helpers, or smaller domain components.
- Do not split into tiny components without a real reuse, testability, or readability reason.
- Use shadcn-vue UI primitives consistently.
- Use Lucide icons first. Use Hugeicons only where Lucide lacks a suitable icon or a specific visual language is needed.
- Avoid Material UI patterns and Angular-era assumptions.

## Form Validation

Use the Eigenfy pattern:

- VeeValidate manages client form state.
- Zod schemas define client validation.
- Laravel FormRequest classes define authoritative server validation.
- Inertia handles server 422 errors.
- Use a shared composable similar to Eigenfy's `useValidatedForm`.
- Zod schemas should live in `resources/js/schemas/{domain}.ts`.
- Error messages should be i18n-ready from the start.

## Backend Organization

Organize Laravel by domain, while staying idiomatic:

```text
app/
  Actions/
    People/
    Households/
    Activities/
    Imports/
  Enums/
  Http/
    Controllers/
      People/
      Households/
      Activities/
    Requests/
      People/
      Households/
      Activities/
  Models/
  Policies/
```

Rules:

- Use Laravel 13 attributes where supported.
- Use native enums for stable domain vocabularies.
- Use FormRequest authorization and validation.
- Use policies for record-level access.
- Keep controllers thin.
- Put cross-model workflows in actions/services.
- Model privacy-sensitive behavior explicitly.
- Add tests for policies, imports, audit, and interaction/task lifecycle.

## Vapor Upgrade Path

Vue Vapor should remain an upgrade path this year.

To preserve that path:

- Avoid undocumented component internals.
- Keep templates predictable and typed.
- Prefer explicit props/emits.
- Avoid excessive dynamic component magic.
- Maintain a small set of Vapor smoke tests for shared components.
- Keep component size low so conversion issues are isolated.

## Mobile Companion Boundary

The future mobile app is a companion, not a full CRM clone.

Mobile scope should be limited to:

- Quick people lookup.
- Assigned follow-ups/tasks.
- Add quick note after visit/call/message.
- Complete, defer, or reassign task.
- Offline draft capture if privacy and sync rules are clear.
- Push reminders later.

Do not force the web app into a cross-platform monorepo shape for the sake of hypothetical mobile parity.

## Database Boundary

Use PostgreSQL by default.

Schema design should support:

- Future multi-organization scoping.
- JSON where it is genuinely flexible metadata, not where relational querying is core.
- Soft deletes for sensitive entities where recovery/audit matters.
- Audit-friendly timestamps and actor references.
- Import provenance and external ids.

Avoid preserving old table names unless it materially simplifies migration.

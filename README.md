# MemberHive Rework

This branch is the clean Laravel/Inertia rework line for MemberHive.

The legacy Angular/Nx + Yii2 application is preserved at:

- tag: `legacy-angular-yii-final`
- historical branches: `master`, `upgrd7`, `upgradeto6`, and other legacy refs

## Planned Stack

- Laravel 13
- PHP 8.4+
- PostgreSQL
- Inertia 3
- Vue 3 with full TypeScript
- shadcn-vue
- Tailwind CSS 4
- VeeValidate + Zod
- Laravel Boost
- Pest, Vitest, Vue Test Utils
- Lucide icons first, Hugeicons where needed

## Working Rule

Implement from specs first and consult legacy code second.

Start with:

- `docs/rework-feature-overview.md`
- `docs/architecture/decisions/0001-rework-stack.md`
- `docs/architecture/rework-boundaries.md`
- `docs/specs/README.md`

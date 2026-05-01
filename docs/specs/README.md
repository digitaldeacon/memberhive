# Specs Index

Future rework agents should implement from specs first and legacy code second.

This directory should move into the new `memberhive-rework` repository and become the source of truth for product behavior.

Recommended spec files:

- `product-vision.md`
- `glossary.md`
- `people.md`
- `households.md`
- `activities.md`
- `tags.md`
- `auth-rbac.md`
- `audit.md`
- `imports.md`
- `settings.md`
- `dashboard.md`
- `search.md`
- `pwa.md`
- `mobile-companion.md`
- `legacy-migration.md`

Each feature spec should include:

- Purpose.
- User roles.
- Data model.
- Permissions and privacy.
- User flows.
- Validation rules.
- Inertia pages and props.
- Reusable components expected.
- Legacy behavior to preserve.
- Legacy behavior to drop.
- Tests required.
- Open questions.

Initial architecture decisions:

- See `../architecture/decisions/0001-rework-stack.md`.
- See `../architecture/rework-boundaries.md`.

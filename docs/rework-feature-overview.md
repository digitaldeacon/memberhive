# MemberHive Rework Feature Overview

This document summarizes the existing MemberHive domains and feature surface for a future rework. It is based on the current Angular/Nx frontend and Yii2 API code, not on a fresh product specification. Treat it as a broad map: preserve the useful domain concepts, then decide deliberately what belongs in a 2026 church/nonprofit CRM.

## Product Intent

MemberHive is a relationship management system for churches and similar community organizations. The existing product centers on people, households, pastoral interactions, follow-up tasks, lightweight settings, search, and audit history.

The original monorepo aimed at shared web/mobile/desktop code. For a rework, desktop can be covered by a PWA. Mobile should be a companion experience, not a 1:1 port of the back-office CRM.

The accepted planning direction is a clean `memberhive-rework` repository using Laravel 13, Inertia 3, Vue 3 with full TypeScript, shadcn-vue, VeeValidate + Zod, PostgreSQL, Laravel Boost, and Lucide/Hugeicons for icons. See `docs/architecture/decisions/0001-rework-stack.md` and `docs/architecture/rework-boundaries.md`.

## Existing Domains

### People

People are the primary entity.

Existing data:
- UUID plus numeric database id.
- First, middle, and last name.
- Email, home phone, work phone, mobile phone.
- Gender, marital status, birthday, baptism date, anniversary date, deceased date in the model.
- Avatar image path and upload flow.
- Home and postal address stored as JSON, including optional geocode.
- Social contact stored as JSON/string, but not strongly modeled.
- Status tags.
- Optional linked user account with username and role.
- Derived full name, age, formatted age, default avatar, family member ids.

Existing features:
- List all people.
- Search people.
- View person detail.
- Create person.
- Edit person.
- Delete person and detach family/tag links.
- Upload/crop avatar.
- Calculate geocode for a person address using Google Maps.
- Show previous/next navigation while viewing a person.
- Show person interactions, family, edit form, and audit logs as tabs.
- Configure which attributes appear in the people list.

Important rework notes:
- The person model mixes member profile, user account, address book entry, family membership, and pastoral profile.
- Gender and family roles are binary/traditional in the old code. A 2026 version should separate household roles from gender and support neutral/non-church organizations.
- Email is unique in the old model; this can be too strict for families, children, shared inboxes, and imported records.

### Families / Households

Families represent households or close relational groups.

Existing data:
- Name.
- Members through a `person_family` junction table.
- Member role: husband, wife, child, mother, father, brother, sister, grandmother, grandfather, in-law.
- Primary member flag.
- Stored `ref` to person UUID.
- `unrelated` list to suppress future suggestions.

Existing features:
- List families.
- Create a new family from a person.
- Link a person to an existing family.
- Accept suggested family members.
- Ignore suggested family members.
- Remove a member from a family.
- Set/change a member role.
- Rename family.
- Mark/suppress unrelated suggested people.
- Suggest possible family members by matching last name.
- Map families using primary member geocodes.

Important rework notes:
- Rename domain to "Households" or "Relationship Groups" for broader use. Keep "Family" as one possible group type.
- Relationship modeling should support guardians, partners, caregivers, roommates, emergency contacts, organization-specific roles, and custom labels.
- A person may need multiple households or relationship groups.

### Interactions / Notes / Follow-ups

Interactions are the main pastoral/workflow record. They combine notes, communication logs, assignments, and tasks.

Existing data:
- UUID plus numeric database id.
- Rich text body.
- Type.
- Action type.
- Owner/reference person UUID.
- Author person UUID.
- Visibility.
- Due date.
- Recipients/assignees through `person_interaction`.
- Per-recipient action state: done date, completed date, completed by, response, delegated by, delegated date.

Existing features:
- List interactions.
- Create person interaction.
- Edit interaction.
- Delete interaction, restricted to author.
- View interaction.
- List interactions for a person.
- "My interactions" dashboard dashlet.
- Mark assigned interaction complete/incomplete.
- End an interaction.
- Quick note entry from interaction list/person view.
- Rich text editing with TinyMCE.
- Visibility selector in UI.

Important rework notes:
- This is one of the most valuable domains. Rework as a first-class "Activities" or "Care Notes & Tasks" module.
- Separate note, task, reminder, communication, and assignment semantics while keeping a unified timeline.
- Define privacy levels carefully: public, team-only, private, sensitive/care-restricted.
- Add notifications/reminders if tasks remain part of the module.

### Tags / Statuses

Tags are generic labels. The current implemented use is person status tags.

Existing data:
- Text.
- Type.
- Context.
- Updated by.
- Updated timestamp.

Existing features:
- List tags.
- Assign status tags to a person during create/update.
- Auto-create missing status tags.
- Store person-tag links.

Important rework notes:
- Tags should be generalized by context: person, household, interaction, group, event.
- Preserve system tags vs user-created tags.
- Add color, description, archive flag, and merge/rename tooling.

### Users, Auth, and RBAC

Users are linked to people.

Existing data:
- Username.
- Password hash.
- Auth key/access token.
- Password reset token fields.
- Linked person id.
- Role string.
- Yii RBAC tables.

Existing roles:
- member.
- staff.
- admin.

Existing permissions:
- Login.
- Create/edit/delete members.
- Create/edit/delete staff.
- Create/edit/delete admins.
- Create/view/edit/delete interactions.
- View private interactions.
- View/edit system settings.

Existing features:
- Login by username or person email.
- JWT auth with RSA keys.
- Sessionless API auth.
- Re-auth/alive check.
- Assign RBAC roles from console.
- Send credentials email when a user is created/updated, though the old code currently targets a fixed email address.

Important rework notes:
- Move to Laravel auth, policies, permissions, and audit-friendly user management.
- Support invitation flow, password reset, MFA/passkeys if needed, and organization scoping.
- Do not assume every person is a login user.

### Settings

Settings are JSON values grouped by section.

Existing sections:
- system.
- people.
- layout.
- dashboard.

Existing data/features:
- Church/organization name.
- Church/organization address with geocode.
- Google API key.
- People list column/attribute configuration.
- Saved people filters per user.
- Drawer/title/context button state in frontend store.
- Auto-save settings after debounce.

Important rework notes:
- Separate persisted organization settings from transient UI state.
- Support organization-neutral naming.
- Add localization, timezone, date format, privacy defaults, retention policy, and map provider configuration.

### Search

Existing features:
- Search people by first name, last name, nickname, and address.
- Return typed search result with icon, display text, and route.

Important rework notes:
- Rework as global search over people, households, interactions, tags, and possibly groups/events.
- Consider Laravel Scout once data model is stable.

### Dashboard

Existing dashboard:
- Draggable dashlets.
- Upcoming birthdays dashlet.
- My interactions dashlet with outstanding and completed sections.
- Dashlet settings dialog exists for birthday range.

Important rework notes:
- Dashboard should become role-aware: staff/care users need follow-ups and recent activity; admins need data quality and imports; volunteers may need only assigned tasks.

### Audit Log

Existing data:
- Context/table.
- Reference UUID.
- Actor display name.
- Insert/update type.
- JSON diff of changed attributes.
- Created/updated timestamps.

Existing features:
- Log person, tag-link, interaction-link, and user-related changes.
- Show audit logs on person detail.
- Display changed values.

Important rework notes:
- Preserve audit as a first-class compliance feature.
- Track before/after values, actor id, impersonation/admin actions, IP/user agent where useful.
- Include deletes and privacy-sensitive reads if compliance requires it.

### Sermons / Content

Sermons are present in the API but not prominent in the current Angular app.

Existing data:
- Sermon title.
- Language.
- Picture.
- Notes.
- Files JSON.
- Scriptures JSON.
- Date.
- Hits.
- Category id.

Existing features:
- Increment hit/download counter.
- List sermons by group.
- Create sermon.

Important rework notes:
- This looks legacy or peripheral. Decide whether it belongs in the revived product.
- For non-church organizations, this could become "Resources" or be dropped.

### Import / External Systems

Existing import support:
- Import tracking table: type, ref table, local ref id, remote id.
- Console import from Elvanto people API.
- Imports people, geocodes, family structures, and relationship roles.
- MemberHive-to-MemberHive person import command.

Important rework notes:
- Imports are strategically important for revival.
- Build a generic import pipeline: CSV first, then selected integrations.
- Track source, external id, last sync, conflict state, and field-level provenance.

## Existing Frontend Structure

Major routes:
- `/login`
- `/dashboard`
- `/person`
- `/person/list`
- `/person/create`
- `/person/map`
- `/person/view/:id`
- `/interaction`
- `/interaction/list`
- `/interaction/create`
- `/interaction/edit/:id`
- `/settings`

Store/effects modules:
- auth: login, re-authenticate, sign out.
- people: list, view, create, update, delete, geocode, avatar upload.
- families: list, create, update, link, accept, ignore, remove, set role.
- interactions: list, create, update, delete, complete, end, get for person.
- settings: list, update, drawer/title/context buttons, saved people filters.
- tags: list and update actions, with only list effect implemented.

The NgRx work documents useful async boundaries. In a Laravel/Inertia rework, most of this should become server-side page props, form actions, policies, events, jobs, and notifications rather than a direct store port.

## Existing Feature List

Core CRM:
- People directory.
- Person profile.
- Person create/edit/delete.
- Avatar upload/crop.
- Address and geocoding.
- People map.
- Configurable people list fields.
- Saved people filters.
- Family/household management.
- Suggested household matching.
- Status tagging.
- Interaction timeline.
- Follow-up/task assignment.
- My assigned interactions.
- Birthday reminders.
- Global people search.
- User login and roles.
- System settings.
- Audit history.
- Demo data generation.
- External people import.

Partial/legacy:
- Sermons/resources.
- Personal relationships dialog.
- Groups tab placeholder.
- Group interactions placeholder.
- Mobile/desktop monorepo intent.
- Drag/drop dashboard layout persistence appears incomplete.
- Tag management beyond listing/auto-create appears incomplete.

## 2026 Product Gaps

Organization model:
- Multi-organization or at least organization-ready data model.
- Neutral terminology for churches, nonprofits, clubs, small communities, and care teams.
- Branches/campuses/locations/teams.

People and relationships:
- Custom fields.
- Consent and privacy preferences.
- Communication preferences.
- Emergency contacts.
- Household and non-household relationships.
- Membership/lifecycle stages.
- Data quality tools: duplicates, merges, incomplete profiles, stale records.
- Soft deletes and archival.

Care/workflow:
- Clear separation of notes, tasks, reminders, and communications.
- Recurring follow-ups.
- Assignments to teams, not just individuals.
- Notifications via email/push/in-app.
- Sensitive note access controls.
- Activity timeline across person and household.

Groups and participation:
- Small groups/teams/classes.
- Group membership history.
- Attendance/check-ins.
- Events and recurring gatherings.
- Volunteer roles and serving schedules.

Communication:
- Email/SMS templates.
- Bulk messaging with consent filters.
- Message history.
- Mailchimp/Brevo/etc. integration optional.

Imports/integrations:
- CSV import with mapping UI.
- Duplicate detection during import.
- Export.
- Webhooks/API tokens.
- Optional integrations for church/nonprofit tools.

Mobile companion:
- Quick people lookup.
- Add quick note after visit/call.
- See assigned follow-ups.
- Complete/defer task.
- Capture offline note and sync later.
- Basic push reminders.
- No full admin/settings/import surface.

PWA:
- Installable desktop/tablet experience.
- Offline read cache for selected records if privacy allows.
- Background sync for drafts/tasks.
- Responsive navigation for repeated staff use.

Security/compliance:
- Fine-grained permissions and policies.
- Audit reads/writes/deletes for sensitive areas.
- Data retention controls.
- GDPR-style export/delete/anonymization workflows.
- MFA/passkeys for staff/admins.
- Session/device management.

Reporting:
- Birthdays and anniversaries.
- Follow-up backlog.
- New/changed people.
- Missing data.
- Tags/status counts.
- Care workload by team/person.

## Recommended Rework Slices

1. Foundation: Laravel app, auth, organizations/settings, roles/policies, audit base.
2. People MVP: directory, profile, create/edit, address, avatar, tags.
3. Households: relationship groups, roles, suggestions, merge/ignore.
4. Activities: notes, tasks, assignments, visibility, person/household timelines.
5. Dashboard/search: global search, birthdays, my tasks, data-quality widgets.
6. Imports: CSV import, duplicate matching, migration from old schema.
7. PWA/mobile companion: installable PWA first, then focused mobile companion API/app.

## Rework Agent Starting Points

When walking the old code, start with:
- Yii models in `api/models`.
- Yii controllers in `api/controllers`.
- Angular domain models in `libs/core/src/lib/modules/*/*.model.ts`.
- NgRx actions/effects in `libs/core/src/lib/modules/*`.
- Routes in `apps/web/src/app/*routing*.ts`.
- Person, family, interaction, dashboard, settings, search, and audit components in `apps/web/src/app`.

Do not start by upgrading dependencies. Start by confirming domain behavior and deciding the target data model.

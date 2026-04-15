# F08: Top Navigation (Dashboard / Logs / Sync)

## Goal
Provide page switching between key application sections.

## Pages in Navigation
- Dashboard
- Logs
- Sync

## Requirements
- Use top horizontal navigation (tabs-like), not sidebar.
- Active page is highlighted.
- Navigation preserves current month context when possible.
- Order of items: `Дашборд`, `Логи`, `Синхронизация`.
- First data sync starts automatically on app load.
- `Синхронизация` page keeps manual re-sync action, available months counter, loaded logs summary, and parsing warnings list.

## Acceptance Criteria
- User can switch pages in one click.
- Active state is always accurate.

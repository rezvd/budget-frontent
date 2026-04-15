# F02: Month Navigation

## Goal
Allow browsing dashboard analytics by month.

## Requirements
- Default month is the latest available month in parsed transactions.
- Provide `Previous month` and `Next month` navigation with angle arrows.
- Disable `Next month` if no data exists.
- Selected month is always visible in UI.
- Month title is shown in Russian (`Месяц Год`) with capitalized first letter.
- Month switcher is a single inline picker between arrows.
- Month navigation uses full content width and is not wrapped in a separate emphasized card.

## Data Dependencies
- `Transaction.month`
- `MonthlyBudgetPlan.month`
- `MonthlyComment.month`

## Acceptance Criteria
- Switching month updates all dashboard widgets consistently.
- Navigation never leads to an empty non-existing month state by mistake.

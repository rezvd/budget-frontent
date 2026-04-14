# F02: Month Navigation

## Goal
Allow browsing dashboard analytics by month.

## Requirements
- Default month is the latest available month in parsed transactions.
- Provide `Previous month` and `Next month` navigation.
- Disable `Next month` if no data exists.
- Selected month is always visible in UI.

## Data Dependencies
- `Transaction.month`
- `MonthlyBudgetPlan.month`
- `MonthlyComment.month`

## Acceptance Criteria
- Switching month updates all dashboard widgets consistently.
- Navigation never leads to an empty non-existing month state by mistake.


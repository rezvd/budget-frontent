# F06: Budget vs Actual Table

## Goal
Compare monthly plan and factual spending by category.

## Table Columns
- `category`
- `planned`
- `actual`
- `delta`

## Status Rules
- `within_budget`
- `near_limit` (optional threshold)
- `over_budget`
- `no_plan` (actual exists, plan missing)

## Current UI Behavior
- `status` text column is hidden in UI.
- Delta color text highlighting is not used.
- For planned categories only, delta includes a circular indicator with 7 discrete colors from green to red by `actual / planned` ratio.
- If plan is missing, delta shows `—` and no indicator is rendered.
- Rows are sorted:
1. Categories with plan first.
2. Inside each group by `actual` descending.
- Categories without plan are hidden behind toggle button `Показать незапланированные категории`.
- `.одолжения` is excluded from this table (both plan and fact side).

## Data Model
- Inputs: `MonthlyBudgetPlan[]` and expense `Transaction[]`.
- Output: `BudgetVsActualRow[]`.

## Acceptance Criteria
- Category matching is deterministic.
- Categories from plan and fact are both represented.
- Status and delta are calculated correctly.

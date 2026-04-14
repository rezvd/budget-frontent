# F06: Budget vs Actual Table

## Goal
Compare monthly plan and factual spending by category.

## Table Columns
- `category`
- `planned`
- `actual`
- `delta`
- `status`

## Status Rules
- `within_budget`
- `near_limit` (optional threshold)
- `over_budget`
- `no_plan` (actual exists, plan missing)

## Data Model
- Inputs: `MonthlyBudgetPlan[]` and expense `Transaction[]`.
- Output: `BudgetVsActualRow[]`.

## Acceptance Criteria
- Category matching is deterministic.
- Categories from plan and fact are both represented.
- Status and delta are calculated correctly.


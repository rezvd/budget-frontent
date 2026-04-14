# F03: Month Summary

## Goal
Show top-level monthly numbers before detailed analytics.

## Metrics
- Total expenses for selected month.
- Total income for selected month.
- Net result (`income - expenses`).

## Data Model
- Build from `Transaction` and expose as `MonthSummary`.

## Acceptance Criteria
- Numbers are recalculated on month change.
- Values match source transactions exactly.


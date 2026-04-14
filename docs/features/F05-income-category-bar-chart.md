# F05: Income Category Bar Chart

## Goal
Visualize income structure for the selected month.

## Chart Spec
- Vertical bar chart.
- One bar per income category.
- Sorted descending by amount.
- Uses only `Transaction` with `type = 'income'`.

## Tooltip Spec
- Category name.
- Income amount.
- Share of total monthly income.

## Data Model
- Input: `Transaction`.
- Aggregated output: `CategoryBarItem[]`.

## Acceptance Criteria
- Income totals match month summary.
- Ordering is stable and descending by amount.

# F05: Income Category Bar Chart

## Goal
Visualize income structure for the selected month.

## Chart Spec
- Horizontal bar chart.
- One bar per income category.
- Sorted descending by amount.
- Uses only `Transaction` with `type = 'income'`.
- Rendered in the same `Расходы и доходы` block under `Крупные расходы`.
- Uses the same static category color mapping system as expense charts.

## Row Spec
- Category label + bar + rounded amount.
- Percent value is rendered in-bar as integer.
- No dedicated tooltip is required for MVP in current UX.

## Data Model
- Input: `Transaction`.
- Aggregated output: `CategoryBarItem[]`.

## Acceptance Criteria
- Income totals match month summary.
- Ordering is stable and descending by amount.
- Category selection behavior for details is identical to expense bars.

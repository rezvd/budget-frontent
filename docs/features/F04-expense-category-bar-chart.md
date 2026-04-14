# F04: Expense Bar Charts (Regular vs Non-Regular)

## Goal
Visualize expense distribution for the selected month in two separate charts.

## Chart Spec
- Two vertical bar charts:
- `Regular expenses`
- `Non-regular expenses`
- Bars are categories, sorted descending by amount.
- Data source: `Transaction` with `type = 'expense'`.
- Split by `is_regular_type` field from `logs`.
- Exclude category `.одолжения` from both charts.

## Additional Block Under Charts
- Show excluded `.одолжения` expenses in a separate list below charts.
- List items are sorted descending by amount.

## Tooltip Spec (both charts)
- Category name.
- Expense amount.
- Share of corresponding chart total.

## Data Model
- Input: `Transaction`.
- Aggregated output: `CategoryBarItem[]` for each chart.

## Acceptance Criteria
- Two charts always reflect selected month.
- `.одолжения` never appears in bars.
- Excluded `.одолжения` block is visible only when amount > 0.

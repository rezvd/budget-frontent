# F04: Expense Bar Charts (Regular vs Non-Regular)

## Goal
Visualize expense distribution for the selected month in two separate charts.

## Chart Spec
- Two horizontal bar charts:
- `Повседневные расходы`
- `Крупные расходы`
- Bars are categories, sorted descending by amount.
- Data source: `Transaction` with `type = 'expense'`.
- Split by `is_regular_type` field from `logs`.
- Exclude category `.одолжения` from analytics display.
- Each category has a static color mapping (shared with income chart), with same-prefix category groups sharing one color (for example `еда вне дома:*`, `проезд:*`, `развлечения:*`).
- Bar row height is fixed regardless of label length.
- Percent is rendered inside each bar as integer (no decimal digits).

## Layout
- Section title: `Расходы и доходы`.
- Left column: `Повседневные расходы`.
- Right column: `Крупные расходы` and below it `Доходы`.
- When at least one category is selected, details panel appears on the right, and charts switch to one-column flow.

## Category Row Spec
- Show category name, horizontal bar, rounded amount.
- Amount formatting uses thousand separators and ruble sign.
- Amounts are rounded to nearest `100 ₽` for display.

## Interaction
- Category details are shown by click (not hover).
- Multi-select is supported.
- A `Сбросить` text button is shown only when at least one category is selected.

## Acceptance Criteria
- Two charts always reflect selected month.
- `.одолжения` never appears in bars.
- Colors are stable across months and browser sessions.
- Bar widths are scaled consistently independent of text length.

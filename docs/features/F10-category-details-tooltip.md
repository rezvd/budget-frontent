# F10: Detailed Category Tooltip for Expense Bars

## Goal
Add a richer hover details block for expense categories.

## Placement
- Located immediately after the income chart section in dashboard flow.

## Behavior
- On hover over an expense bar, show category spend breakdown entries.
- Breakdown items are sorted descending by amount.
- Primary use case: explain what forms the category total.

## Content
- Row label (shop/comment or normalized sub-item title).
- Amount for each row.
- Percentage inside selected category total.
- Do not show transaction count.

## Acceptance Criteria
- Details update instantly when hovered category changes.
- Items are always sorted high to low.

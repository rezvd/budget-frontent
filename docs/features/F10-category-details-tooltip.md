# F10: Detailed Category Breakdown Panel

## Goal
Add a richer details block for selected categories.

## Placement
- Appears as separate panel to the right of charts when categories are selected.

## Behavior
- On click over a category bar, toggle category selection.
- Multiple categories can be selected simultaneously.
- Breakdown panel is hidden when no categories are selected.
- Breakdown items are sorted descending by amount.
- Primary use case: explain what forms the category total.

## Content
- Row label (shop/comment or normalized sub-item title).
- If `shop` exists, append it in parentheses to main label.
- Empty fallback label is `—`.
- Amount for each row.
- Percentage inside selected category total.
- Do not show transaction count.

## Acceptance Criteria
- Details update instantly when selected categories change.
- Items are always sorted high to low.

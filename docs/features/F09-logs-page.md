# F09: Logs Page (Newest First)

## Goal
Provide a dedicated page with transaction logs.

## Requirements
- Separate route/page for logs.
- Show transactions sorted from new to old.
- Default sorting key: date descending, then stable fallback by id.
- Reuse domain `Transaction` model.

## Columns (MVP)
- Date
- Amount
- Type
- Category
- Shop
- Comment

## Acceptance Criteria
- Latest transaction appears first.
- Switching month updates logs list to selected month.

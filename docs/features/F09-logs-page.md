# F09: Logs Page (Newest First)

## Goal
Provide a dedicated page with transaction logs.

## Requirements
- Separate route/page for logs.
- Show all transactions (not only selected month).
- Group transactions by month.
- Show month groups from new to old.
- Inside each month group, show transactions from new to old.
- Default sorting key: date descending, then stable fallback by id.
- Reuse domain `Transaction` model.

## Columns (MVP)
- Date
- Amount
- Category
- Shop
- Comment
- Additional Comment

## Acceptance Criteria
- Latest transaction appears first.
- Logs are grouped under month headings.

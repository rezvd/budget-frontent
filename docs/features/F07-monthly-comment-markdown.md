# F07: Monthly Comment (Markdown)

## Goal
Show monthly context as rich formatted text.

## Requirements
- Render comment from `month_comments.comment` as Markdown.
- Read-only mode for MVP.
- Show empty state if comment is missing.
- Show block title `Комментарий`.
- Preserve markdown line breaks/lists (no whitespace flattening).
- Treat literal `FALSE/false` as missing comment.
- Place block on dashboard to the right of `План vs факт`.

## Data Model
- Input: `MonthlyComment`.
- Field: `markdown`.

## Acceptance Criteria
- Markdown syntax (lists, emphasis, links) is rendered.
- Content switches with selected month.

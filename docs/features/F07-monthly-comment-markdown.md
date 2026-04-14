# F07: Monthly Comment (Markdown)

## Goal
Show monthly context as rich formatted text.

## Requirements
- Render comment from `month_comments.comment` as Markdown.
- Read-only mode for MVP.
- Show empty state if comment is missing.

## Data Model
- Input: `MonthlyComment`.
- Field: `markdown`.

## Acceptance Criteria
- Markdown syntax (lists, emphasis, links) is rendered.
- Content switches with selected month.


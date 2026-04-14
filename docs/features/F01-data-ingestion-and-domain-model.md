# F01: Data Ingestion and Domain Model

## Goal
Load dashboard data from Google Sheets and transform it to stable frontend models.

## Scope
- Parse rows from `logs`, `month_plans`, `month_comments`.
- Ignore technical/summary rows (for example `month = 0`, empty rows, subtotal lines).
- Normalize category and date fields.
- Infer transaction type from signed amount.

## Input Mapping (from `docs/data_example.xlsx`)
- `logs` columns: `month`, `day`, `amount`, `shop`, `category`, `comment`, `additional_comment`, `is_regular_type`.
- `month_plans` columns: `month`, `category`, `max_amount`.
- `month_comments` columns: `month`, `comment`.

## Output Models (TypeScript)
- External/source models: [`external-data-models.ts`](/home/drezvanova/projects/budget-frontent/docs/external-data-models.ts)
- Domain/app models: [`data-models.ts`](/home/drezvanova/projects/budget-frontent/docs/data-models.ts)

## Acceptance Criteria
- All valid rows map to typed domain entities.
- Invalid rows are skipped with non-blocking warnings.
- Parsing result is deterministic for the same sheet snapshot.

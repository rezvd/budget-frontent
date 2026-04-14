/**
 * External (source/API) models.
 * Source: docs/data_example.xlsx
 * Sheets: logs, month_plans, month_comments
 */

// Raw row from sheet "logs" (external API shape).
export interface RawLogRow {
  month: string | 0;
  day?: number | null;
  amount?: number | null;
  shop?: string | null;
  category?: string | null;
  comment?: string | null;
  additional_comment?: string | null;
  is_regular_type?: string | null;
  useless?: 0 | 1 | null;
}

// Raw row from sheet "month_plans" (external API shape).
export interface RawMonthPlanRow {
  month: string;
  category: string;
  max_amount: number;
}

// Raw row from sheet "month_comments" (external API shape).
export interface RawMonthCommentRow {
  month: string;
  comment: string;
}

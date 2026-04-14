/**
 * External (source/API) models.
 * Source sheets: logs, month_plans, month_comments
 */

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

export interface RawMonthPlanRow {
  month: string;
  category: string;
  max_amount: number;
}

export interface RawMonthCommentRow {
  month: string;
  comment: string;
}


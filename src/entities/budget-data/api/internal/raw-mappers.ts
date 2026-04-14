import { RawLogRow, RawMonthCommentRow, RawMonthPlanRow } from '../external-models';
import { RawCell } from './types';
import { normalizeText } from './normalize';

export const toRawLogRow = (row: RawCell[]): RawLogRow => ({
  month: normalizeText(row[0]) === '0' ? 0 : normalizeText(row[0]),
  day: row[1] == null || normalizeText(row[1]) === '' ? null : Number(normalizeText(row[1])),
  amount: row[2] == null || normalizeText(row[2]) === '' ? null : Number(normalizeText(row[2])),
  shop: normalizeText(row[3]) || null,
  category: normalizeText(row[4]) || null,
  comment: normalizeText(row[5]) || null,
  additional_comment: normalizeText(row[6]) || null,
  is_regular_type: normalizeText(row[12]) || null,
});

export const toRawMonthPlanRow = (row: RawCell[]): RawMonthPlanRow => ({
  month: normalizeText(row[0]),
  category: normalizeText(row[1]),
  max_amount: Number(normalizeText(row[2])),
});

export const toRawMonthCommentRow = (row: RawCell[]): RawMonthCommentRow => ({
  month: normalizeText(row[0]),
  comment: normalizeText(row[1]),
});

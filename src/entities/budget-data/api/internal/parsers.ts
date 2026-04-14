import { MonthlyBudgetPlan, MonthlyComment, Transaction } from '../../model/models';
import { DataIngestionWarning, RawCell } from './types';
import { createDate, isTechnicalCategory, normalizeSpaces, parseSignedAmount, toDay, toMonthId, toRegularity } from './normalize';
import { toRawLogRow, toRawMonthCommentRow, toRawMonthPlanRow } from './raw-mappers';

export const parseLogs = (rows: RawCell[][], warnings: DataIngestionWarning[]): Transaction[] => {
  const out: Transaction[] = [];

  rows.slice(1).forEach((row, index) => {
    const rowNumber = index + 2;
    const raw = toRawLogRow(row);

    const month = toMonthId(raw.month);
    const rawMonthIsEmpty = raw.month === 0 || String(raw.month ?? '').trim() === '';
    const category = normalizeSpaces(raw.category ?? '');
    const rawAmountText = String(raw.amount ?? '').trim();
    const signedAmount = parseSignedAmount(raw.amount);
    const day = toDay(raw.day);

    const isEmpty = !month && !category && signedAmount == null;
    if (isEmpty) {
      return;
    }

    if (rawMonthIsEmpty || rawAmountText === '') {
      return;
    }

    if (!month) {
      warnings.push({ sheet: 'logs', row: rowNumber, message: 'Skipped row with invalid month.' });
      return;
    }

    if (isTechnicalCategory(category)) {
      return;
    }

    if (!category) {
      warnings.push({ sheet: 'logs', row: rowNumber, message: 'Skipped row with empty category.' });
      return;
    }

    if (signedAmount == null || signedAmount === 0) {
      warnings.push({ sheet: 'logs', row: rowNumber, message: 'Skipped row with invalid or zero amount.' });
      return;
    }

    if (!day) {
      warnings.push({ sheet: 'logs', row: rowNumber, message: 'Skipped row with invalid day.' });
      return;
    }

    const shop = normalizeSpaces(raw.shop ?? '');
    const comment = normalizeSpaces(raw.comment ?? '');
    const additionalComment = normalizeSpaces(raw.additional_comment ?? '');

    out.push({
      id: `logs-${month}-${String(day).padStart(2, '0')}-${rowNumber}`,
      month,
      day,
      date: createDate(month, day),
      amountAbs: Math.abs(signedAmount),
      signedAmount,
      type: signedAmount > 0 ? 'income' : 'expense',
      category,
      shop: shop || undefined,
      comment: comment || undefined,
      additionalComment: additionalComment || undefined,
      tags: [],
      isRegularType: toRegularity(normalizeSpaces(raw.is_regular_type ?? '')),
    });
  });

  return out;
};

export const parseMonthPlans = (rows: RawCell[][], warnings: DataIngestionWarning[]): MonthlyBudgetPlan[] => {
  const out: MonthlyBudgetPlan[] = [];

  rows.slice(1).forEach((row, index) => {
    const rowNumber = index + 2;
    const raw = toRawMonthPlanRow(row);
    const month = toMonthId(raw.month);
    const category = normalizeSpaces(raw.category);
    const amount = parseSignedAmount(raw.max_amount);

    const isEmpty = !month && !category && amount == null;
    if (isEmpty) {
      return;
    }

    if (!month || !category || amount == null || amount < 0) {
      warnings.push({ sheet: 'month_plans', row: rowNumber, message: 'Skipped invalid month plan row.' });
      return;
    }

    out.push({
      month,
      category,
      plannedAmount: amount,
    });
  });

  return out;
};

export const parseMonthComments = (rows: RawCell[][], warnings: DataIngestionWarning[]): MonthlyComment[] => {
  const out: MonthlyComment[] = [];

  rows.slice(1).forEach((row, index) => {
    const rowNumber = index + 2;
    const raw = toRawMonthCommentRow(row);
    const month = toMonthId(raw.month);
    const markdown = raw.comment.trim();

    if (!month && !markdown) {
      return;
    }

    if (!month || !markdown) {
      warnings.push({ sheet: 'month_comments', row: rowNumber, message: 'Skipped invalid month comment row.' });
      return;
    }

    out.push({
      month,
      markdown,
    });
  });

  return out;
};

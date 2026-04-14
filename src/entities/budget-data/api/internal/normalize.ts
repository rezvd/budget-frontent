import { ExpenseRegularity, MonthId } from '../../model/models';
import { RawCell } from './types';

export const normalizeText = (value: RawCell) => String(value ?? '').trim();

export const normalizeSpaces = (value: string) => value.replace(/\s+/g, ' ').trim();

export const parseSignedAmount = (value: RawCell) => {
  const raw = normalizeText(value).replace(/[\s\u00A0]/g, '').replace(',', '.').replace('−', '-');
  const parsed = Number(raw);

  return Number.isFinite(parsed) ? parsed : null;
};

export const toMonthId = (value: RawCell): MonthId | null => {
  const raw = normalizeText(value);

  if (!raw || raw === '0') {
    return null;
  }

  const monthOnlyMatch = raw.match(/^(\d{4})-(\d{1,2})$/);
  if (monthOnlyMatch) {
    const year = monthOnlyMatch[1];
    const month = monthOnlyMatch[2].padStart(2, '0');

    if (Number(month) >= 1 && Number(month) <= 12) {
      return `${year}-${month}` as MonthId;
    }
  }

  const dateMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (dateMatch) {
    const year = dateMatch[1];
    const month = dateMatch[2];

    if (Number(month) >= 1 && Number(month) <= 12) {
      return `${year}-${month}` as MonthId;
    }
  }

  return null;
};

export const toDay = (value: RawCell): number | null => {
  const parsed = Number(normalizeText(value));

  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 31) {
    return null;
  }

  return parsed;
};

export const toRegularity = (value: string): ExpenseRegularity => {
  const normalized = value.toLowerCase();
  if (!normalized) {
    return ExpenseRegularity.UNKNOWN;
  }
  if (
    normalized.includes('нерегуляр') ||
    normalized.includes('круп') ||
    normalized.includes('non_regular') ||
    normalized.startsWith('non') ||
    normalized.includes('non-regular')
  ) {
    return ExpenseRegularity.NON_REGULAR;
  }
  if (normalized.includes('регуляр') || normalized === 'regular' || normalized.includes('regular')) {
    return ExpenseRegularity.REGULAR;
  }
  return ExpenseRegularity.UNKNOWN;
};

export const isTechnicalCategory = (category: string) => {
  const normalized = category.toLowerCase();
  return normalized === 'всего' || normalized === 'доход' || normalized === 'расход';
};

export const createDate = (month: MonthId, day: number) => `${month}-${String(day).padStart(2, '0')}`;

import { CategoryBarItem, ExpenseRegularity, Transaction } from './models';

export type ExpenseBreakdownItem = {
  label: string;
  amount: number;
  percentOfCategoryTotal: number;
};

export type ExpenseChartsData = {
  regular: CategoryBarItem[];
  nonRegular: CategoryBarItem[];
  breakdownByCategory: Record<string, ExpenseBreakdownItem[]>;
};

const LOANS_CATEGORY = '.одолжения';

const isLoansCategory = (category: string) => category.trim().toLowerCase() === LOANS_CATEGORY;
const sanitizeLabelText = (value: string) => {
  const normalized = value.replace(/\s+/g, ' ').trim();

  if (!normalized || /^false$/i.test(normalized)) {
    return '';
  }

  return normalized;
};

const toCategoryBars = (transactions: Transaction[]): CategoryBarItem[] => {
  const grouped = new Map<string, number>();

  transactions.forEach((item) => {
    const current = grouped.get(item.category) ?? 0;
    grouped.set(item.category, current + item.amountAbs);
  });

  const total = [...grouped.values()].reduce((sum, value) => sum + value, 0);

  return [...grouped.entries()]
    .map(([category, amount]) => ({
      category,
      amount,
      percentOfMonthTotal: total > 0 ? (amount / total) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
};

const normalizeBreakdownLabel = (transaction: Transaction) => {
  const comment = sanitizeLabelText(transaction.comment ?? '');
  const additionalComment = sanitizeLabelText(transaction.additionalComment ?? '');
  const shop = sanitizeLabelText(transaction.shop ?? '');

  const base = comment || additionalComment;

  if (base && shop && base.toLowerCase() !== shop.toLowerCase()) {
    return `${base} (${shop})`;
  }

  if (base) {
    return base;
  }

  if (shop) {
    return shop;
  }

  return '—';
};

const buildBreakdownByCategory = (transactions: Transaction[]) => {
  const byCategory = new Map<string, Map<string, number>>();

  transactions.forEach((item) => {
    const categoryMap = byCategory.get(item.category) ?? new Map<string, number>();
    const label = normalizeBreakdownLabel(item);
    const current = categoryMap.get(label) ?? 0;
    categoryMap.set(label, current + item.amountAbs);
    byCategory.set(item.category, categoryMap);
  });

  const out: Record<string, ExpenseBreakdownItem[]> = {};

  byCategory.forEach((labelMap, category) => {
    const total = [...labelMap.values()].reduce((sum, value) => sum + value, 0);
    out[category] = [...labelMap.entries()]
      .map(([label, amount]) => ({
        label,
        amount,
        percentOfCategoryTotal: total > 0 ? (amount / total) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  });

  return out;
};

export const buildExpenseChartsData = (transactions: Transaction[]): ExpenseChartsData => {
  const expenses = transactions.filter((item) => item.type === 'expense');
  const withoutLoans = expenses.filter((item) => !isLoansCategory(item.category));
  const regular = withoutLoans.filter((item) => item.isRegularType === ExpenseRegularity.REGULAR);
  const nonRegular = withoutLoans.filter((item) => item.isRegularType !== ExpenseRegularity.REGULAR);

  return {
    regular: toCategoryBars(regular),
    nonRegular: toCategoryBars(nonRegular),
    breakdownByCategory: buildBreakdownByCategory(transactions.filter((item) => !isLoansCategory(item.category))),
  };
};

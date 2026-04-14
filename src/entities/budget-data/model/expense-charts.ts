import { CategoryBarItem, ExpenseRegularity, Transaction } from './models';

export type ExpenseChartsData = {
  regular: CategoryBarItem[];
  nonRegular: CategoryBarItem[];
  excludedLoans: Transaction[];
};

const LOANS_CATEGORY = '.одолжения';

const isLoansCategory = (category: string) => category.trim().toLowerCase() === LOANS_CATEGORY;

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

export const buildExpenseChartsData = (transactions: Transaction[]): ExpenseChartsData => {
  const expenses = transactions.filter((item) => item.type === 'expense');
  const excludedLoans = expenses.filter((item) => isLoansCategory(item.category)).sort((a, b) => b.amountAbs - a.amountAbs);

  const withoutLoans = expenses.filter((item) => !isLoansCategory(item.category));
  const regular = withoutLoans.filter((item) => item.isRegularType === ExpenseRegularity.REGULAR);
  const nonRegular = withoutLoans.filter((item) => item.isRegularType !== ExpenseRegularity.REGULAR);

  return {
    regular: toCategoryBars(regular),
    nonRegular: toCategoryBars(nonRegular),
    excludedLoans,
  };
};

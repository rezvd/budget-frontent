import { CategoryBarItem, Transaction } from './models';

export const buildIncomeCategoryBars = (transactions: Transaction[]): CategoryBarItem[] => {
  const incomes = transactions.filter((item) => item.type === 'income');
  const grouped = new Map<string, number>();

  incomes.forEach((item) => {
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

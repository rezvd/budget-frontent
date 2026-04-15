import { BudgetVsActualRow, MonthId, MonthlyBudgetPlan, Transaction } from './models';

const NEAR_LIMIT_RATIO = 0.9;
const LOANS_CATEGORY = '.одолжения';

const normalizeCategory = (value: string) => value.toLowerCase().replace(/\s+/g, ' ').trim();
const isLoansCategory = (value: string) => normalizeCategory(value) === LOANS_CATEGORY;

export const buildBudgetVsActualRows = (
  selectedMonth: MonthId | null,
  monthlyPlans: MonthlyBudgetPlan[],
  transactions: Transaction[],
): BudgetVsActualRow[] => {
  if (!selectedMonth) {
    return [];
  }

  const plansByCategory = new Map<string, { category: string; planned: number }>();
  monthlyPlans
    .filter((item) => item.month === selectedMonth)
    .filter((item) => !isLoansCategory(item.category))
    .forEach((item) => {
      const key = normalizeCategory(item.category);
      const prev = plansByCategory.get(key);
      plansByCategory.set(key, {
        category: item.category,
        planned: (prev?.planned ?? 0) + item.plannedAmount,
      });
    });

  const actualByCategory = new Map<string, { category: string; actual: number }>();
  transactions
    .filter((item) => item.month === selectedMonth && item.type === 'expense')
    .filter((item) => !isLoansCategory(item.category))
    .forEach((item) => {
      const key = normalizeCategory(item.category);
      const prev = actualByCategory.get(key);
      actualByCategory.set(key, {
        category: item.category,
        actual: (prev?.actual ?? 0) + item.amountAbs,
      });
    });

  const keys = new Set([...plansByCategory.keys(), ...actualByCategory.keys()]);

  return [...keys]
    .map((key) => {
      const planned = plansByCategory.get(key)?.planned ?? 0;
      const actual = actualByCategory.get(key)?.actual ?? 0;
      const category = plansByCategory.get(key)?.category ?? actualByCategory.get(key)?.category ?? key;
      const delta = planned - actual;

      let status: BudgetVsActualRow['status'] = 'within_budget';
      if (planned <= 0 && actual > 0) {
        status = 'no_plan';
      } else if (planned > 0 && actual > planned) {
        status = 'over_budget';
      } else if (planned > 0 && actual / planned >= NEAR_LIMIT_RATIO) {
        status = 'near_limit';
      }

      return {
        category,
        planned,
        actual,
        delta,
        status,
      };
    })
    .sort((a, b) => {
      const aHasPlan = a.planned > 0 ? 1 : 0;
      const bHasPlan = b.planned > 0 ? 1 : 0;

      if (bHasPlan !== aHasPlan) {
        return bHasPlan - aHasPlan;
      }

      if (b.actual !== a.actual) {
        return b.actual - a.actual;
      }

      return a.category.localeCompare(b.category, 'ru-RU');
    });
};

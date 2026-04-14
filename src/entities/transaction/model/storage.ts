import { BudgetTransaction } from './types';

const STORAGE_KEY = 'budget-transactions';

export const readLocalTransactions = (): BudgetTransaction[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as BudgetTransaction[];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const writeLocalTransactions = (transactions: BudgetTransaction[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

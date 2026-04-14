export type TransactionType = 'income' | 'expense';

export type BudgetTransaction = {
  id: string;
  date: string;
  type: TransactionType;
  category: string;
  amount: number;
  note: string;
};

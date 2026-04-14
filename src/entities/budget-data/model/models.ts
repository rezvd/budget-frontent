/**
 * Domain/application models.
 */

export type MonthId =
  `${number}-${'01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'}`;
export type TransactionType = 'income' | 'expense';

export enum ExpenseRegularity {
  REGULAR = 'regular',
  NON_REGULAR = 'non_regular',
  UNKNOWN = 'unknown',
}

export interface Transaction {
  id: string;
  month: MonthId;
  day: number;
  date: string;
  amountAbs: number;
  signedAmount: number;
  type: TransactionType;
  category: string;
  subcategory?: string;
  shop?: string;
  comment?: string;
  additionalComment?: string;
  tags: string[];
  isRegularType: ExpenseRegularity;
}

export interface MonthlyBudgetPlan {
  month: MonthId;
  category: string;
  plannedAmount: number;
}

export interface MonthlyComment {
  month: MonthId;
  markdown: string;
}


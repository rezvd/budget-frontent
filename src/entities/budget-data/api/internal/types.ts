import { MonthlyBudgetPlan, MonthlyComment, Transaction } from '../../model/models';

export type RawCell = string | number | boolean | null | undefined;

export type SheetName = 'logs' | 'month_plans' | 'month_comments';

export type ValueRangeResponse = {
  range?: string;
  values?: RawCell[][];
};

export type BatchGetResponse = {
  valueRanges?: ValueRangeResponse[];
};

export type DataIngestionWarning = {
  sheet: SheetName;
  row: number;
  message: string;
};

export type BudgetDataIngestionResult = {
  transactions: Transaction[];
  monthlyPlans: MonthlyBudgetPlan[];
  monthlyComments: MonthlyComment[];
  warnings: DataIngestionWarning[];
};

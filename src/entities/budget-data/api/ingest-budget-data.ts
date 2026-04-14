import { parseLogs, parseMonthComments, parseMonthPlans } from './internal/parsers';
import { extractRows, fetchBudgetSheets } from './internal/sheets-client';
import { BudgetDataIngestionResult, DataIngestionWarning } from './internal/types';

export type { BudgetDataIngestionResult, DataIngestionWarning };

export const ingestBudgetDataFromGoogleSheets = async (): Promise<BudgetDataIngestionResult> => {
  const payload = await fetchBudgetSheets();
  const warnings: DataIngestionWarning[] = [];

  const transactions = parseLogs(extractRows(payload, 'logs'), warnings);
  const monthlyPlans = parseMonthPlans(extractRows(payload, 'month_plans'), warnings);
  const monthlyComments = parseMonthComments(extractRows(payload, 'month_comments'), warnings);

  return {
    transactions,
    monthlyPlans,
    monthlyComments,
    warnings,
  };
};

import { useMemo, useState } from 'react';

import {
  BudgetDataIngestionResult,
  DataIngestionWarning,
  ingestBudgetDataFromGoogleSheets,
} from '@/entities/budget-data/api/ingest-budget-data';
import { buildExpenseChartsData } from '@/entities/budget-data/model/expense-charts';
import { buildIncomeCategoryBars } from '@/entities/budget-data/model/income-chart';
import { MonthId, MonthSummary, Transaction } from '@/entities/budget-data/model/models';

const getLatestMonth = (months: MonthId[]) => {
  if (months.length === 0) {
    return null;
  }

  return [...months].sort().at(-1) ?? null;
};

const getAvailableMonths = (data: BudgetDataIngestionResult): MonthId[] => {
  const set = new Set<MonthId>();

  data.transactions.forEach((item) => set.add(item.month));
  data.monthlyPlans.forEach((item) => set.add(item.month));
  data.monthlyComments.forEach((item) => set.add(item.month));

  return [...set].sort();
};

export const useBudgetSync = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [availableMonths, setAvailableMonths] = useState<MonthId[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<MonthId | null>(null);
  const [warnings, setWarnings] = useState<DataIngestionWarning[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const monthSummary = useMemo<MonthSummary | null>(() => {
    if (!selectedMonth) {
      return null;
    }

    const selectedTransactions = transactions.filter((item) => item.month === selectedMonth);
    const totalIncome = selectedTransactions
      .filter((item) => item.type === 'income')
      .reduce((sum, item) => sum + item.amountAbs, 0);
    const totalExpense = selectedTransactions
      .filter((item) => item.type === 'expense')
      .reduce((sum, item) => sum + item.amountAbs, 0);

    return {
      month: selectedMonth,
      totalIncome,
      totalExpense,
      net: totalIncome - totalExpense,
    };
  }, [selectedMonth, transactions]);

  const selectedMonthTransactions = useMemo(() => {
    if (!selectedMonth) {
      return [];
    }

    return transactions.filter((item) => item.month === selectedMonth);
  }, [selectedMonth, transactions]);

  const expenseCharts = useMemo(() => buildExpenseChartsData(selectedMonthTransactions), [selectedMonthTransactions]);
  const incomeCategoryBars = useMemo(() => buildIncomeCategoryBars(selectedMonthTransactions), [selectedMonthTransactions]);

  const syncFromSheet = async () => {
    if (!import.meta.env.VITE_GOOGLE_SHEET_ID || !import.meta.env.VITE_GOOGLE_SHEETS_API_KEY) {
      setMessage('Не заполнены переменные Google Sheets (.env).');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const data = await ingestBudgetDataFromGoogleSheets();
      const months = getAvailableMonths(data);
      const latestMonth = getLatestMonth(months);

      setTransactions(data.transactions);
      setAvailableMonths(months);
      setSelectedMonth(latestMonth);
      setWarnings(data.warnings);

      setMessage(`Данные загружены: ${data.transactions.length} логов, предупреждений: ${data.warnings.length}.`);
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Не удалось загрузить данные из таблицы.';
      setMessage(text);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    availableMonths,
    selectedMonth,
    setSelectedMonth,
    warnings,
    isLoading,
    message,
    monthSummary,
    expenseCharts,
    incomeCategoryBars,
    syncFromSheet,
  };
};

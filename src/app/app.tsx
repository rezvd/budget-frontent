import { useState } from 'react';

import {
  BudgetDataIngestionResult,
  DataIngestionWarning,
  ingestBudgetDataFromGoogleSheets,
} from '@/entities/budget-data/api/ingest-budget-data';
import { MonthId } from '@/entities/budget-data/model/models';
import { BudgetPage } from '@/pages/budget/ui/budget-page';
import { WarningsPage } from '@/pages/warnings/ui/warnings-page';
import { AppSidebar } from '@/widgets/app-sidebar/ui/app-sidebar';

type AppPage = 'dashboard' | 'warnings';

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

export const App = () => {
  const [activePage, setActivePage] = useState<AppPage>('dashboard');
  const [availableMonths, setAvailableMonths] = useState<MonthId[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<MonthId | null>(null);
  const [warnings, setWarnings] = useState<DataIngestionWarning[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  return (
    <div className="app-shell">
      <AppSidebar
        activePage={activePage}
        onNavigate={setActivePage}
        onSync={syncFromSheet}
        isLoading={isLoading}
        message={message}
        warnings={warnings}
      />

      {activePage === 'dashboard' ? (
        <BudgetPage
          availableMonths={availableMonths}
          selectedMonth={selectedMonth}
          warningsCount={warnings.length}
          onSelectMonth={setSelectedMonth}
        />
      ) : (
        <WarningsPage warnings={warnings} />
      )}
    </div>
  );
};

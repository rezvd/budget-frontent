import { useEffect, useRef, useState } from 'react';

import { useBudgetSync } from '@/features/budget-sync/model/use-budget-sync';
import { BudgetPage } from '@/pages/budget/ui/budget-page';
import { LogsPage } from '@/pages/logs/ui/logs-page';
import { SyncPage } from '@/pages/sync/ui/sync-page';
import { AppSidebar } from '@/widgets/app-sidebar/ui/app-sidebar';

type AppPage = 'dashboard' | 'logs' | 'sync';

export const App = () => {
  const [activePage, setActivePage] = useState<AppPage>('dashboard');
  const hasAutoSyncedRef = useRef(false);
  const {
    availableMonths,
    selectedMonth,
    setSelectedMonth,
    warnings,
    isLoading,
    message,
    selectedMonthComment,
    expenseCharts,
    incomeCategoryBars,
    budgetVsActualRows,
    allLogs,
    syncFromSheet,
  } = useBudgetSync();

  useEffect(() => {
    if (hasAutoSyncedRef.current) {
      return;
    }

    hasAutoSyncedRef.current = true;
    void syncFromSheet();
  }, [syncFromSheet]);

  return (
    <div className="app-shell">
      <AppSidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      {activePage === 'dashboard' ? (
        <BudgetPage
          availableMonths={availableMonths}
          selectedMonth={selectedMonth}
          expenseCharts={expenseCharts}
          incomeCategoryBars={incomeCategoryBars}
          budgetVsActualRows={budgetVsActualRows}
          monthlyComment={selectedMonthComment}
          onSelectMonth={setSelectedMonth}
        />
      ) : activePage === 'logs' ? (
        <LogsPage rows={allLogs} />
      ) : (
        <SyncPage
          onSync={syncFromSheet}
          isLoading={isLoading}
          message={message}
          monthsCount={availableMonths.length}
          warnings={warnings}
        />
      )}
    </div>
  );
};

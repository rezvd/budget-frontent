import { useEffect, useRef, useState } from 'react';

import { useBudgetSync } from '@/features/budget-sync/model/use-budget-sync';
import { BudgetPage } from '@/pages/budget/ui/budget-page';
import { SyncPage } from '@/pages/sync/ui/sync-page';
import { AppSidebar } from '@/widgets/app-sidebar/ui/app-sidebar';

type AppPage = 'dashboard' | 'sync';

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
    monthSummary,
    expenseCharts,
    incomeCategoryBars,
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
          summary={monthSummary}
          expenseCharts={expenseCharts}
          incomeCategoryBars={incomeCategoryBars}
          onSelectMonth={setSelectedMonth}
        />
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

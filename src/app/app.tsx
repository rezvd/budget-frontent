import { useState } from 'react';

import { useBudgetSync } from '@/features/budget-sync/model/use-budget-sync';
import { BudgetPage } from '@/pages/budget/ui/budget-page';
import { WarningsPage } from '@/pages/warnings/ui/warnings-page';
import { AppSidebar } from '@/widgets/app-sidebar/ui/app-sidebar';

type AppPage = 'dashboard' | 'warnings';

export const App = () => {
  const [activePage, setActivePage] = useState<AppPage>('dashboard');
  const { availableMonths, selectedMonth, setSelectedMonth, warnings, isLoading, message, monthSummary, syncFromSheet } =
    useBudgetSync();

  return (
    <div className="app-shell">
      <AppSidebar
        activePage={activePage}
        onNavigate={setActivePage}
        onSync={syncFromSheet}
        isLoading={isLoading}
        message={message}
        monthsCount={availableMonths.length}
        warnings={warnings}
      />

      {activePage === 'dashboard' ? (
        <BudgetPage
          availableMonths={availableMonths}
          selectedMonth={selectedMonth}
          summary={monthSummary}
          onSelectMonth={setSelectedMonth}
        />
      ) : (
        <WarningsPage warnings={warnings} />
      )}
    </div>
  );
};

import { CategoryBarItem, MonthId, MonthSummary } from '@/entities/budget-data/model/models';
import { ExpenseChartsData } from '@/entities/budget-data/model/expense-charts';
import { MonthNavigation } from '@/widgets/month-navigation/ui/month-navigation';
import { ExpenseCharts } from '@/widgets/expense-charts/ui/expense-charts';
import { MonthSummaryWidget } from '@/widgets/month-summary/ui/month-summary';

type BudgetPageProps = {
  availableMonths: MonthId[];
  selectedMonth: MonthId | null;
  summary: MonthSummary | null;
  expenseCharts: ExpenseChartsData;
  incomeCategoryBars: CategoryBarItem[];
  onSelectMonth: (month: MonthId) => void;
};

export const BudgetPage = ({ availableMonths, selectedMonth, summary, expenseCharts, incomeCategoryBars, onSelectMonth }: BudgetPageProps) => {
  return (
    <main className="page-content">
      <MonthNavigation availableMonths={availableMonths} selectedMonth={selectedMonth} onSelectMonth={onSelectMonth} />
      <MonthSummaryWidget summary={summary} />
      <ExpenseCharts
        regular={expenseCharts.regular}
        nonRegular={expenseCharts.nonRegular}
        income={incomeCategoryBars}
        breakdownByCategory={expenseCharts.breakdownByCategory}
        excludedLoans={expenseCharts.excludedLoans}
      />
    </main>
  );
};

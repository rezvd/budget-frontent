import { BudgetVsActualRow, CategoryBarItem, MonthId } from '@/entities/budget-data/model/models';
import { ExpenseChartsData } from '@/entities/budget-data/model/expense-charts';
import { MonthNavigation } from '@/widgets/month-navigation/ui/month-navigation';
import { BudgetVsActualTable } from '@/widgets/budget-vs-actual-table/ui/budget-vs-actual-table';
import { ExpenseCharts } from '@/widgets/expense-charts/ui/expense-charts';

type BudgetPageProps = {
  availableMonths: MonthId[];
  selectedMonth: MonthId | null;
  expenseCharts: ExpenseChartsData;
  incomeCategoryBars: CategoryBarItem[];
  budgetVsActualRows: BudgetVsActualRow[];
  onSelectMonth: (month: MonthId) => void;
};

export const BudgetPage = ({
  availableMonths,
  selectedMonth,
  expenseCharts,
  incomeCategoryBars,
  budgetVsActualRows,
  onSelectMonth,
}: BudgetPageProps) => {
  return (
    <main className="page-content">
      <MonthNavigation availableMonths={availableMonths} selectedMonth={selectedMonth} onSelectMonth={onSelectMonth} />
      <ExpenseCharts
        regular={expenseCharts.regular}
        nonRegular={expenseCharts.nonRegular}
        income={incomeCategoryBars}
        breakdownByCategory={expenseCharts.breakdownByCategory}
        excludedLoans={expenseCharts.excludedLoans}
      />
      <BudgetVsActualTable rows={budgetVsActualRows} />
    </main>
  );
};

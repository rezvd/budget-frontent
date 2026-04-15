import { BudgetVsActualRow, CategoryBarItem, MonthId } from '@/entities/budget-data/model/models';
import { ExpenseChartsData } from '@/entities/budget-data/model/expense-charts';
import { MonthNavigation } from '@/widgets/month-navigation/ui/month-navigation';
import { BudgetVsActualTable } from '@/widgets/budget-vs-actual-table/ui/budget-vs-actual-table';
import { ExpenseCharts } from '@/widgets/expense-charts/ui/expense-charts';
import { MonthComment } from '@/widgets/month-comment/ui/month-comment';

type BudgetPageProps = {
  availableMonths: MonthId[];
  selectedMonth: MonthId | null;
  monthlyComment: string | null;
  expenseCharts: ExpenseChartsData;
  incomeCategoryBars: CategoryBarItem[];
  budgetVsActualRows: BudgetVsActualRow[];
  onSelectMonth: (month: MonthId) => void;
};

export const BudgetPage = ({
  availableMonths,
  selectedMonth,
  monthlyComment,
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
      <div className="budget-comment-layout">
        <BudgetVsActualTable rows={budgetVsActualRows} />
        <MonthComment markdown={monthlyComment} />
      </div>
    </main>
  );
};

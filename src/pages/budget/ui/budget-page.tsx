import { MonthId, MonthSummary } from '@/entities/budget-data/model/models';
import { MonthNavigation } from '@/widgets/month-navigation/ui/month-navigation';
import { MonthSummaryWidget } from '@/widgets/month-summary/ui/month-summary';

type BudgetPageProps = {
  availableMonths: MonthId[];
  selectedMonth: MonthId | null;
  summary: MonthSummary | null;
  onSelectMonth: (month: MonthId) => void;
};

export const BudgetPage = ({ availableMonths, selectedMonth, summary, onSelectMonth }: BudgetPageProps) => {
  return (
    <main className="page-content">
      <MonthNavigation availableMonths={availableMonths} selectedMonth={selectedMonth} onSelectMonth={onSelectMonth} />
      <MonthSummaryWidget summary={summary} />
    </main>
  );
};

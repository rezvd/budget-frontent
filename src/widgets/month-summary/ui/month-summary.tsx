import { MonthSummary } from '@/entities/budget-data/model/models';
import { formatCurrency } from '@/shared/lib/format/format-currency';

type MonthSummaryWidgetProps = {
  summary: MonthSummary | null;
};

export const MonthSummaryWidget = ({ summary }: MonthSummaryWidgetProps) => {
  return (
    <section className="panel">
      <h2>Сводка за месяц</h2>
      {!summary ? (
        <p className="empty">Сначала синхронизируй данные и выбери месяц.</p>
      ) : (
        <div style={{ display: 'grid', gap: 8, marginTop: 12 }}>
          <p>Доходы: {formatCurrency(summary.totalIncome)}</p>
          <p>Расходы: {formatCurrency(summary.totalExpense)}</p>
        </div>
      )}
    </section>
  );
};

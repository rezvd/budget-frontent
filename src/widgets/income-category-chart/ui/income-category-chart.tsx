import { CategoryBarItem } from '@/entities/budget-data/model/models';
import { formatCurrency } from '@/shared/lib/format/format-currency';
import { useCategoryColors } from '@/widgets/expense-charts/model/use-category-colors';

type IncomeCategoryChartProps = {
  items: CategoryBarItem[];
};

export const IncomeCategoryChart = ({ items }: IncomeCategoryChartProps) => {
  const max = items[0]?.amount ?? 0;
  const categoryColors = useCategoryColors(items.map((item) => item.category).sort());

  return (
    <section className="panel">
      <h2>Доходы по категориям</h2>
      {items.length === 0 ? (
        <p className="empty">Нет доходов за выбранный месяц.</p>
      ) : (
        <div className="income-hbars-grid">
          {items.map((item) => {
            const width = max > 0 ? (item.amount / max) * 100 : 0;
            const tooltip = `${item.category} · ${formatCurrency(item.amount)} · ${item.percentOfMonthTotal.toFixed(1)}%`;

            return (
              <div key={item.category} className="income-hbar-row" title={tooltip}>
                <div className="income-hbar-label">{item.category}</div>
                <div className="income-hbar-track">
                  <div
                    className="income-hbar"
                    style={{ width: `${Math.max(width, 3)}%`, background: categoryColors[item.category] }}
                  />
                </div>
                <div className="income-hbar-value">{formatCurrency(item.amount)}</div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

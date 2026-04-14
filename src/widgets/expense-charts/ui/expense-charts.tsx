import { CategoryBarItem, Transaction } from '@/entities/budget-data/model/models';
import { formatCurrency } from '@/shared/lib/format/format-currency';
import { useCategoryColors } from '../model/use-category-colors';

type ExpenseChartsProps = {
  regular: CategoryBarItem[];
  nonRegular: CategoryBarItem[];
  excludedLoans: Transaction[];
};

const Bars = ({ title, items, colors }: { title: string; items: CategoryBarItem[]; colors: Record<string, string> }) => {
  const max = items[0]?.amount ?? 0;

  return (
    <section className="expense-subchart">
      <h3>{title}</h3>
      {items.length === 0 ? (
        <p className="empty">Нет данных за выбранный месяц.</p>
      ) : (
        <div className="hbars-grid">
          {items.map((item) => {
            const width = max > 0 ? (item.amount / max) * 100 : 0;
            const tooltip = `${item.category} · ${formatCurrency(item.amount)} · ${item.percentOfMonthTotal.toFixed(1)}%`;

            return (
              <div key={item.category} className="hbar-row" title={tooltip}>
                <div className="hbar-label">{item.category}</div>
                <div className="hbar-track">
                  <div className="hbar" style={{ width: `${Math.max(width, 3)}%`, background: colors[item.category] }} />
                </div>
                <div className="hbar-value">{formatCurrency(item.amount)}</div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export const ExpenseCharts = ({ regular, nonRegular, excludedLoans }: ExpenseChartsProps) => {
  const categoryColors = useCategoryColors(
    [...regular.map((item) => item.category), ...nonRegular.map((item) => item.category)].sort(),
  );

  return (
    <>
      <section className="panel">
        <h2>Расходы по категориям</h2>
        <div className="charts-2col">
          <Bars title="Повседневные расходы" items={regular} colors={categoryColors} />
          <Bars title="Крупные расходы" items={nonRegular} colors={categoryColors} />
        </div>
      </section>

      {excludedLoans.length > 0 && (
        <section className="panel">
          <h2>Исключённые .одолжения</h2>
          <ul className="list">
            {excludedLoans.map((item) => (
              <li key={item.id} className="row">
                <div>
                  <strong>{item.category}</strong>
                  <p>{new Date(item.date).toLocaleDateString('ru-RU')}</p>
                </div>
                <b>{formatCurrency(item.amountAbs)}</b>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

import { useMemo, useState } from 'react';

import { CategoryBarItem } from '@/entities/budget-data/model/models';
import { ExpenseBreakdownItem } from '@/entities/budget-data/model/expense-charts';
import { formatCurrency } from '@/shared/lib/format/format-currency';
import { useCategoryColors } from '../model/use-category-colors';

type ExpenseChartsProps = {
  regular: CategoryBarItem[];
  nonRegular: CategoryBarItem[];
  income: CategoryBarItem[];
  breakdownByCategory: Record<string, ExpenseBreakdownItem[]>;
};

const Bars = ({
  title,
  items,
  colors,
  selectedCategories,
  onToggleCategory,
}: {
  title: string;
  items: CategoryBarItem[];
  colors: Record<string, string>;
  selectedCategories: Set<string>;
  onToggleCategory: (category: string) => void;
}) => {
  const max = items[0]?.amount ?? 0;
  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <section className="expense-subchart">
      <div className="expense-subchart-header">
        <h3>{title}</h3>
        <b className="expense-subchart-total">{formatCurrency(total)}</b>
      </div>
      {items.length === 0 ? (
        <p className="empty">Нет данных за выбранный месяц.</p>
      ) : (
        <div className="hbars-grid">
          {items.map((item) => {
            const width = max > 0 ? (item.amount / max) * 100 : 0;
            const tooltip = `${item.category} · ${formatCurrency(item.amount)} · ${Math.round(item.percentOfMonthTotal)}%`;

            return (
              <div
                key={item.category}
                className={`hbar-row ${selectedCategories.has(item.category) ? 'is-selected' : ''}`}
                title={tooltip}
                onClick={() => onToggleCategory(item.category)}
              >
                <div className="hbar-label">{item.category}</div>
                <div className="hbar-track">
                  <div className="hbar" style={{ width: `${Math.max(width, 3)}%`, background: colors[item.category] }} />
                  <span className="hbar-percent">{Math.round(item.percentOfMonthTotal)}%</span>
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

export const ExpenseCharts = ({ regular, nonRegular, income, breakdownByCategory }: ExpenseChartsProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const categoryColors = useCategoryColors(
    [...regular.map((item) => item.category), ...nonRegular.map((item) => item.category), ...income.map((item) => item.category)].sort(),
  );
  const selectedCategorySet = useMemo(() => new Set(selectedCategories), [selectedCategories]);

  const details = useMemo(
    () =>
      selectedCategories
        .map((category) => ({
          category,
          items: breakdownByCategory[category] ?? [],
        }))
        .filter((entry) => entry.items.length > 0),
    [breakdownByCategory, selectedCategories],
  );

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => (prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]));
  };

  const hasDetails = details.length > 0;

  return (
    <>
      <div className={hasDetails ? 'charts-with-details' : ''}>
        <section className="panel">
          <div className="panel-header-row">
            <h2>Расходы и доходы</h2>
            {selectedCategories.length > 0 && (
              <button type="button" className="text-reset-button" onClick={() => setSelectedCategories([])}>
                Сбросить
              </button>
            )}
          </div>
          <div className={`charts-layout ${hasDetails ? 'charts-layout-stacked' : ''}`}>
            <Bars
              title="Повседневные расходы"
              items={regular}
              colors={categoryColors}
              selectedCategories={selectedCategorySet}
              onToggleCategory={toggleCategory}
            />
            <div className="charts-right-col">
              <Bars
                title="Крупные расходы"
                items={nonRegular}
                colors={categoryColors}
                selectedCategories={selectedCategorySet}
                onToggleCategory={toggleCategory}
              />
              <div className="income-section">
                <Bars
                  title="Доходы"
                  items={income}
                  colors={categoryColors}
                  selectedCategories={selectedCategorySet}
                  onToggleCategory={toggleCategory}
                />
              </div>
            </div>
          </div>
        </section>

        {hasDetails && (
          <section className="panel">
            <h2>Детали категорий</h2>
            <div className="details-grid">
              {details.map((entry) => (
                <section key={entry.category} className="details-card">
                  <h3>{entry.category}</h3>
                  <ul className="details-list">
                    {entry.items.map((item) => (
                      <li key={`${entry.category}-${item.label}`} className="details-row">
                        <span className="details-label">{item.label}</span>
                        <span className="details-meta">{Math.round(item.percentOfCategoryTotal)}%</span>
                        <b className="details-amount">{formatCurrency(item.amount)}</b>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </section>
        )}
      </div>

    </>
  );
};

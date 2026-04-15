import { useMemo, useState } from 'react';

import { BudgetVsActualRow } from '@/entities/budget-data/model/models';
import { formatCurrency } from '@/shared/lib/format/format-currency';

type BudgetVsActualTableProps = {
  rows: BudgetVsActualRow[];
};

export const BudgetVsActualTable = ({ rows }: BudgetVsActualTableProps) => {
  const [showUnplanned, setShowUnplanned] = useState(false);

  const getDeltaIndicatorColor = (row: BudgetVsActualRow) => {
    if (row.status === 'no_plan' || row.planned <= 0) {
      return '#94a3b8';
    }

    const ratio = row.actual / row.planned;
    if (ratio <= 0.7) {
      return '#15803d';
    }
    if (ratio <= 0.9) {
      return '#22c55e';
    }
    if (ratio <= 1.0) {
      return '#84cc16';
    }
    if (ratio <= 1.1) {
      return '#facc15';
    }
    if (ratio <= 1.2) {
      return '#fb923c';
    }
    if (ratio <= 1.35) {
      return '#f97316';
    }
    return '#dc2626';
  };

  const plannedRows = useMemo(() => rows.filter((row) => row.status !== 'no_plan'), [rows]);
  const unplannedRows = useMemo(() => rows.filter((row) => row.status === 'no_plan'), [rows]);
  const visibleRows = showUnplanned ? [...plannedRows, ...unplannedRows] : plannedRows;

  return (
    <section className="panel">
      <h2>План vs факт</h2>
      {rows.length === 0 ? (
        <p className="empty">Нет данных по планам и расходам за выбранный месяц.</p>
      ) : (
        <>
          {unplannedRows.length > 0 && (
            <button type="button" className="text-reset-button" onClick={() => setShowUnplanned((prev) => !prev)}>
              {showUnplanned ? 'Скрыть незапланированные категории' : 'Показать незапланированные категории'}
            </button>
          )}
          <div className="budget-table-wrap">
            <table className="budget-table">
              <thead>
                <tr>
                  <th>Категория</th>
                  <th>План</th>
                  <th>Факт</th>
                  <th>Дельта</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row) => (
                  <tr key={row.category}>
                    <td>{row.category}</td>
                    <td>{row.status === 'no_plan' ? '—' : formatCurrency(row.planned)}</td>
                    <td>{formatCurrency(row.actual)}</td>
                    <td>
                      <span className="delta-cell">
                        {row.status === 'no_plan' ? '—' : formatCurrency(row.delta)}
                        {row.status !== 'no_plan' && <span className="delta-dot" style={{ background: getDeltaIndicatorColor(row) }} aria-hidden />}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

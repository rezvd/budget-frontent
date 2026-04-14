import { MonthId } from '@/entities/budget-data/model/models';

type BudgetPageProps = {
  availableMonths: MonthId[];
  selectedMonth: MonthId | null;
  warningsCount: number;
  onSelectMonth: (month: MonthId) => void;
};

export const BudgetPage = ({ availableMonths, selectedMonth, warningsCount, onSelectMonth }: BudgetPageProps) => {
  const selectedMonthIndex = selectedMonth ? availableMonths.indexOf(selectedMonth) : -1;

  const canGoPrev = selectedMonthIndex > 0;
  const canGoNext = selectedMonthIndex >= 0 && selectedMonthIndex < availableMonths.length - 1;

  const goPrevMonth = () => {
    if (!canGoPrev) {
      return;
    }

    onSelectMonth(availableMonths[selectedMonthIndex - 1]);
  };

  const goNextMonth = () => {
    if (!canGoNext) {
      return;
    }

    onSelectMonth(availableMonths[selectedMonthIndex + 1]);
  };

  return (
    <main className="page-content">
      <section className="panel">
        <h2>Навигация по месяцам</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
          <button type="button" onClick={goPrevMonth} disabled={!canGoPrev}>
            Previous month
          </button>
          <strong>{selectedMonth ?? '—'}</strong>
          <button type="button" onClick={goNextMonth} disabled={!canGoNext}>
            Next month
          </button>
        </div>
        <p className="message">Доступно месяцев: {availableMonths.length}. Предупреждений парсинга: {warningsCount}.</p>
      </section>
    </main>
  );
};

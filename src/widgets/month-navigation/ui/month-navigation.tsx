import { MonthId } from '@/entities/budget-data/model/models';

type MonthNavigationProps = {
  availableMonths: MonthId[];
  selectedMonth: MonthId | null;
  onSelectMonth: (month: MonthId) => void;
};

export const MonthNavigation = ({ availableMonths, selectedMonth, onSelectMonth }: MonthNavigationProps) => {
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

  const handleMonthChange = (month: string) => onSelectMonth(month as MonthId);
  const formatMonthOption = (month: MonthId) => {
    const formatted = new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' })
      .format(new Date(`${month}-01`))
      .replace(/\sг\.$/, '');

    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  return (
    <nav className="month-nav" aria-label="Навигация по месяцам">
      <button type="button" onClick={goPrevMonth} disabled={!canGoPrev} className="nav-arrow" aria-label="Предыдущий месяц">
        ‹
      </button>

      <div className="month-inline-picker">
        <select value={selectedMonth ?? ''} onChange={(event) => handleMonthChange(event.target.value)} disabled={availableMonths.length === 0}>
          {availableMonths.map((month) => (
            <option key={month} value={month}>
              {formatMonthOption(month)}
            </option>
          ))}
        </select>
      </div>

      <button type="button" onClick={goNextMonth} disabled={!canGoNext} className="nav-arrow" aria-label="Следующий месяц">
        ›
      </button>
    </nav>
  );
};

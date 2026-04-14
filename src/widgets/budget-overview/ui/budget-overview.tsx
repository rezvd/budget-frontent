import { formatCurrency } from '@/shared/lib/format/format-currency';

type BudgetOverviewProps = {
  income: number;
  expense: number;
  balance: number;
  isLoading: boolean;
  onSync: () => void;
};

export const BudgetOverview = ({ income, expense, balance, isLoading, onSync }: BudgetOverviewProps) => {
  return (
    <section className="header-card">
      <h1>Личный бюджет</h1>
      <p>Один экран для доходов и расходов, источник данных: Google Sheets + локальный fallback.</p>
      <div className="totals">
        <div>
          <span>Баланс</span>
          <strong>{formatCurrency(balance)}</strong>
        </div>
        <div>
          <span>Доходы</span>
          <strong>{formatCurrency(income)}</strong>
        </div>
        <div>
          <span>Расходы</span>
          <strong>{formatCurrency(expense)}</strong>
        </div>
      </div>
      <button type="button" onClick={onSync} disabled={isLoading}>
        {isLoading ? 'Загрузка...' : 'Синхронизировать из Google Sheets'}
      </button>
    </section>
  );
};

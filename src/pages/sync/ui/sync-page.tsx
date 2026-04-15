import { DataIngestionWarning } from '@/entities/budget-data/api/ingest-budget-data';

type SyncPageProps = {
  onSync: () => void;
  isLoading: boolean;
  message: string;
  monthsCount: number;
  warnings: DataIngestionWarning[];
};

export const SyncPage = ({ onSync, isLoading, message, monthsCount, warnings }: SyncPageProps) => {
  const getSheetLabel = (sheet: DataIngestionWarning['sheet']) => {
    if (sheet === 'logs') return 'Логи';
    if (sheet === 'month_plans') return 'Планы по месяцам';
    return 'Комментарии по месяцам';
  };

  return (
    <main className="page-content">
      <section className="panel">
        <h2>Синхронизация</h2>
        <button type="button" className="sync-primary-button" onClick={onSync} disabled={isLoading}>
          {isLoading ? 'Загрузка...' : 'Синхронизировать из Google Sheets'}
        </button>
        <p className="message">Доступно месяцев: {monthsCount}.</p>
        {message && <p className="message">{message}</p>}
      </section>

      <section className="panel">
        <h2>Предупреждения парсинга</h2>
        {warnings.length === 0 ? (
          <p className="empty">Предупреждений нет.</p>
        ) : (
          <ul className="list">
            {warnings.map((warning, index) => (
              <li key={`${warning.sheet}-${warning.row}-${index}`} className="row">
                <div>
                  <strong>{getSheetLabel(warning.sheet)}</strong>
                  <p>Строка: {warning.row}</p>
                </div>
                <b>{warning.message}</b>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

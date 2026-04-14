import { DataIngestionWarning } from '@/entities/budget-data/api/ingest-budget-data';

type WarningsPageProps = {
  warnings: DataIngestionWarning[];
};

export const WarningsPage = ({ warnings }: WarningsPageProps) => {
  return (
    <main className="page-content">
      <section className="panel">
        <h2>Предупреждения парсинга</h2>
        {warnings.length === 0 ? (
          <p className="empty">Предупреждений нет.</p>
        ) : (
          <ul className="list">
            {warnings.map((warning, index) => (
              <li key={`${warning.sheet}-${warning.row}-${index}`} className="row">
                <div>
                  <strong>{warning.sheet}</strong>
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

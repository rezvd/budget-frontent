import { DataIngestionWarning } from '@/entities/budget-data/api/ingest-budget-data';

type AppPage = 'dashboard' | 'warnings';

type AppSidebarProps = {
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
  onSync: () => void;
  isLoading: boolean;
  message: string;
  warnings: DataIngestionWarning[];
};

export const AppSidebar = ({ activePage, onNavigate, onSync, isLoading, message, warnings }: AppSidebarProps) => {
  return (
    <aside className="sidebar panel">
      <h2>Меню</h2>
      <div className="sidebar-actions">
        <button type="button" onClick={() => onNavigate('dashboard')} disabled={activePage === 'dashboard'}>
          Dashboard
        </button>
        <button type="button" onClick={() => onNavigate('warnings')} disabled={activePage === 'warnings'}>
          Warnings ({warnings.length})
        </button>
      </div>

      <hr className="sidebar-divider" />

      <h2>Синхронизация</h2>
      <button type="button" onClick={onSync} disabled={isLoading}>
        {isLoading ? 'Загрузка...' : 'Синхронизировать из Google Sheets'}
      </button>
      {message && <p className="message">{message}</p>}
    </aside>
  );
};

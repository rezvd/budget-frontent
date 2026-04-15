type AppPage = 'dashboard' | 'logs' | 'sync';

type AppSidebarProps = {
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
};

export const AppSidebar = ({ activePage, onNavigate }: AppSidebarProps) => {
  return (
    <header className="top-menu panel">
      <nav className="top-menu-nav" aria-label="Разделы приложения">
        <button
          type="button"
          className={`top-menu-link ${activePage === 'dashboard' ? 'is-active' : ''}`}
          onClick={() => onNavigate('dashboard')}
          aria-current={activePage === 'dashboard' ? 'page' : undefined}
        >
          Дашборд
        </button>
        <button
          type="button"
          className={`top-menu-link ${activePage === 'logs' ? 'is-active' : ''}`}
          onClick={() => onNavigate('logs')}
          aria-current={activePage === 'logs' ? 'page' : undefined}
        >
          Логи
        </button>
        <button
          type="button"
          className={`top-menu-link ${activePage === 'sync' ? 'is-active' : ''}`}
          onClick={() => onNavigate('sync')}
          aria-current={activePage === 'sync' ? 'page' : undefined}
        >
          Синхронизация
        </button>
      </nav>
    </header>
  );
};

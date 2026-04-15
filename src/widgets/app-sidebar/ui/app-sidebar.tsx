type AppPage = 'dashboard' | 'sync';

type AppSidebarProps = {
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
};

export const AppSidebar = ({ activePage, onNavigate }: AppSidebarProps) => {
  return (
    <header className="top-menu panel">
      <div className="top-menu-nav">
        <button type="button" onClick={() => onNavigate('dashboard')} disabled={activePage === 'dashboard'}>
          Дашборд
        </button>
        <button type="button" onClick={() => onNavigate('sync')} disabled={activePage === 'sync'}>
          Синхронизация
        </button>
      </div>
    </header>
  );
};

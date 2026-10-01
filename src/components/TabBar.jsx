const TABS = [
    { id: 'note', label: 'Note' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'stats', label: 'Stats' },
  ];
  
  function TabBar({ activeTab, onTabChange }) {
    return (
      <nav className="tab-bar">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={tab.id === activeTab ? 'tab active' : 'tab'}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    );
  }
  
  export default TabBar;
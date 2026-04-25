import { useEffect } from 'react';
import { useStore } from './store';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { Dashboard } from './components/Dashboard';
import { Navigation } from './components/Navigation';
import { Vendors } from './components/Vendors';
import { Facilities } from './components/Facilities';
import { ControlRoom } from './components/ControlRoom';
import { twMerge } from 'tailwind-merge';

function App() {
  const { startSimulation, stopSimulation, activeTab, surgeProtocolActive } = useStore();

  useEffect(() => {
    startSimulation();
    return () => stopSimulation();
  }, [startSimulation, stopSimulation]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'navigation': return <Navigation />;
      case 'food': return <Vendors />;
      case 'facilities': return <Facilities />;
      case 'admin': return <ControlRoom />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] overflow-hidden font-sans relative selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* App Layout */}
      <div className="relative z-10 flex w-full h-full">
        <Sidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden relative transition-all duration-300">
          <Topbar />
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth customized-scrollbar bg-[var(--color-background)]">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation (Mock) */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 bg-white/80 backdrop-blur-xl border border-slate-200 p-2 z-50 flex justify-around items-center rounded-3xl shadow-xl">
         {['dashboard', 'navigation', 'food', 'facilities', 'admin'].map(tab => (
           <button 
             key={tab}
             onClick={() => useStore.setState({ activeTab: tab })}
             className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
           >
             {tab.charAt(0).toUpperCase()}
           </button>
         ))}
      </div>
    </div>
  );
}

export default App;

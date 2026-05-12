import { useEffect } from 'react';
import { useStore } from './store';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { Dashboard } from './components/Dashboard';
import { Navigation } from './components/Navigation';
import { Vendors } from './components/Vendors';
import { Facilities } from './components/Facilities';
import { ControlRoom } from './components/ControlRoom';
import { CrowdIntelligence } from './components/CrowdIntelligence';
import { Stadium3D } from './components/Stadium3D';
import { AnalyticsPanels } from './components/AnalyticsPanels';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const { startSimulation, stopSimulation, activeTab, isSidebarOpen, toggleSidebar } = useStore();

  useEffect(() => {
    startSimulation();
    return () => stopSimulation();
  }, [startSimulation, stopSimulation]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'intelligence': return <Dashboard />;
      case 'topology': return <Stadium3D />;
      case 'density': return <CrowdIntelligence />;
      case 'routing': return <Navigation />;
      case 'surge': return <ControlRoom />;
      case 'vendors': return <Vendors />;
      case 'gtm': return <Vendors />;
      case 'analytics': return <AnalyticsPanels />;
      case 'facilities': return <Facilities />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-100 overflow-hidden font-sans relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          // className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 md:hidden cursor-pointer pointer-events-auto"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex w-full h-full">
        <Sidebar />

        <main className={twMerge(
          "flex-1 flex flex-col h-full overflow-hidden relative transition-all duration-500 ease-in-out",
          isSidebarOpen ? "md:ml-[280px]" : "md:ml-[80px]"
        )}>
          <Topbar />
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative customized-scrollbar p-4 md:p-6 lg:p-8">
            <div className="max-w-[1600px] mx-auto w-full">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

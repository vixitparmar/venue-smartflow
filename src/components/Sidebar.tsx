import { useStore } from '../store';
import { Activity, Map, Pizza, Bath, ShieldAlert, Cpu, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

export const Sidebar = () => {
  const { activeTab, setActiveTab, isSidebarOpen, toggleSidebar } = useStore();
  
  const tabs = [
    { id: 'dashboard', label: 'Live Dashboard', icon: Activity },
    { id: 'admin', label: 'Agent Console', icon: ShieldAlert },
    { id: 'navigation', label: 'Smart Navigation', icon: Map },
    { id: 'food', label: 'Food & Drinks', icon: Pizza },
    { id: 'facilities', label: 'Facilities Tracker', icon: Bath },
  ];

  return (
    <>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside 
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 260 : 80,
          x: 0
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className={twMerge(
          "h-full bg-white border-r border-slate-200 flex flex-col py-6 z-40 fixed left-0 top-0 overflow-hidden shadow-soft",
          !isSidebarOpen && "md:w-20"
        )}
      >
        <div className="px-5 mb-10 flex items-center gap-4">
          <div className="w-10 h-10 min-w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <Cpu className="text-white" size={20} />
          </div>
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.h1 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-xl font-bold text-slate-900 whitespace-nowrap"
              >
                APL <span className="text-indigo-600">OS</span>
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
        
        <nav className="flex-1 px-3 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={twMerge(
                'w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group relative',
                activeTab === tab.id 
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              <tab.icon size={20} className={twMerge(
                "min-w-5 shrink-0 transition-colors",
                activeTab === tab.id ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
              )} />
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="whitespace-nowrap font-medium text-sm"
                  >
                    {tab.label}
                  </motion.span>
                )}
              </AnimatePresence>
              
              {!isSidebarOpen && (
                <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-2 group-hover:translate-x-0 whitespace-nowrap z-50 shadow-xl">
                  {tab.label}
                </div>
              )}
            </button>
          ))}
        </nav>
        
        <div className="px-4 mt-auto">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative shadow-sm border border-white"></span>
              </div>
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-[10px] text-emerald-600 font-bold tracking-tighter">SECURE.LINK</p>
                    <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">Active System</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

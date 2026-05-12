import { useStore } from '../store';
import { 
  LayoutDashboard, 
  Trophy, 
  Map, 
  Users, 
  Route, 
  ShieldAlert, 
  Utensils, 
  BarChart3, 
  Activity, 
  Settings,
  ShieldCheck,
  Package,
  Home
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

export const Sidebar = () => {
  const { activeTab, setActiveTab, isSidebarOpen } = useStore();
  
  const tabs = [
    { id: 'dashboard', label: 'OVERVIEW', icon: LayoutDashboard, sub: 'Command Center' },
    { id: 'intelligence', label: 'MATCH INTELLIGENCE', icon: Trophy, sub: 'Live Score & Analytics' },
    { id: 'topology', label: 'STADIUM TOPOLOGY', icon: Map, sub: '3D Visualization' },
    { id: 'density', label: 'ZONE DENSITY', icon: Users, sub: 'Heatmap & Flow' },
    { id: 'routing', label: 'SMART ROUTING', icon: Route, sub: 'Gate & Facility Hub' },
    { id: 'surge', label: 'SURGE PROTOCOLS', icon: ShieldAlert, sub: 'Alerts & Actions' },
    { id: 'vendors', label: 'FOOD & BEVERAGE', icon: Utensils, sub: 'Concessions Hub' },
    { id: 'gtm', label: 'MATERIAL INTEL', icon: Package, sub: 'Inventory & GTM' },
    { id: 'facilities', label: 'FACILITIES', icon: Home, sub: 'Stadium Amenities' },
    { id: 'analytics', label: 'ANALYTICS CENTER', icon: BarChart3, sub: 'Reports & Insights' },
    { id: 'health', label: 'SYSTEM HEALTH', icon: Activity, sub: 'IoT & Connectivity' },
    { id: 'settings', label: 'SETTINGS', icon: Settings, sub: 'Configuration' },
  ];

  return (
    <motion.aside 
      initial={false}
      animate={{ 
        width: isSidebarOpen ? 280 : 80,
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 120 }}
      className={twMerge(
        "h-full bg-[#05070a] border-r border-white/5 flex flex-col py-6 z-40 fixed left-0 top-0 overflow-hidden transition-transform duration-300",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        !isSidebarOpen && "md:w-20"
      )}
    >
      {/* Logo Section */}
      <div className="px-6 mb-10 flex items-center gap-4">
        <div className="w-10 h-10 min-w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <img src="/stadium-icon.svg" className="w-6 h-6 invert" alt="Logo" onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement!.innerHTML = '<div class="w-6 h-6 border-2 border-white rounded-full"></div>';
          }} />
        </div>
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex flex-col"
            >
              <h1 className="text-sm font-black text-white tracking-[0.2em] leading-tight">
                VENUE
              </h1>
              <h1 className="text-sm font-black text-white tracking-[0.2em] leading-tight">
                SMARTFLOW
              </h1>
              <p className="text-[9px] text-indigo-400 font-bold tracking-widest mt-1">STADIUM OPERATIONS OS</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto customized-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={twMerge(
              'w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group relative',
              activeTab === tab.id 
                ? 'bg-indigo-600/10 text-white border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            )}
          >
            <tab.icon size={20} className={twMerge(
              "min-w-5 shrink-0 transition-all duration-300",
              activeTab === tab.id ? "text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" : "group-hover:text-indigo-400"
            )} />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex flex-col items-start overflow-hidden"
                >
                  <span className="whitespace-nowrap font-bold text-[11px] tracking-widest uppercase">
                    {tab.label}
                  </span>
                  <span className="text-[9px] text-slate-500 font-medium whitespace-nowrap">
                    {tab.sub}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            
            {activeTab === tab.id && (
              <motion.div 
                layoutId="active-indicator"
                className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"
              />
            )}
          </button>
        ))}
      </nav>
      
      {/* Footer Status */}
      <div className="px-4 mt-6">
        <div className="bg-indigo-900/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-4 group cursor-pointer hover:bg-indigo-900/20 transition-colors">
          <div className="relative">
            <ShieldCheck className="text-emerald-500" size={24} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
          </div>
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">System Status</p>
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-tighter">All Systems Operational</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
};

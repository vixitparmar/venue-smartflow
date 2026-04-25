import { useStore } from '../store';
import { Bell, ShieldCheck, Zap, Menu, Clock, Users, Timer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export const Topbar = () => {
  const { totalCrowd, avgWaitTime, matchState, agentLogs, isSimulationRunning, toggleSidebar } = useStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  const alerts = agentLogs.filter(log => log.type === 'alert' || log.type === 'action');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 lg:px-8 sticky top-0 z-30 border-b border-slate-200 shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all group active:scale-95"
        >
          <Menu size={22} className="group-hover:rotate-180 transition-transform duration-300" />
        </button>

        <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
          <Clock size={16} className="text-indigo-500" />
          <span className="text-sm font-bold text-slate-700">{currentTime}</span>
        </div>
        
        {/* Live Match Ticker */}
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-2xl border border-indigo-100">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          <span className="text-xs font-bold text-indigo-700 tracking-wider uppercase">{matchState}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Agent Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-emerald-100 bg-emerald-50 font-medium text-[10px] text-emerald-700 uppercase tracking-wider">
          <Zap size={14} className={isSimulationRunning ? "animate-pulse" : ""} />
          {isSimulationRunning ? "AI Engine Active" : "AI Standby"}
        </div>

        {/* Global Hub Stats */}
        <div className="hidden md:flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-slate-400" />
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold leading-tight">CAPACITY</span>
              <span className="text-sm font-bold text-slate-700 leading-tight">{totalCrowd.toLocaleString()}</span>
            </div>
          </div>
          <div className="w-px h-6 bg-slate-200"></div>
          <div className="flex items-center gap-2">
            <Timer size={16} className="text-amber-500" />
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold leading-tight">WAIT TIME</span>
              <span className="text-sm font-bold text-slate-700 leading-tight">{avgWaitTime}m</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 border-l border-slate-200 pl-4 ml-2">
          {/* Notifications */}
          <div className="relative">
            <button 
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all relative shadow-sm"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={18} />
              {alerts.length > 0 && (
                <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-rose-500 border-2 border-white shadow-sm"></span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-900">System Alerts</h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{alerts.length} New</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto p-2 customized-scrollbar">
                    {alerts.length === 0 ? (
                      <div className="p-8 text-center text-sm text-slate-400 font-medium italic">No active alerts...</div>
                    ) : (
                      alerts.slice(0,10).map(alert => (
                        <div key={alert.id} className="p-3 mb-2 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors group">
                          <div className="flex items-start gap-3">
                            <div className={twMerge(
                              "mt-0.5 p-1 rounded-md",
                              alert.type === 'alert' ? "bg-rose-100 text-rose-600" : "bg-indigo-100 text-indigo-600"
                            )}>
                              <ShieldCheck size={12} />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-slate-700 leading-snug">{alert.message}</p>
                              <span className="text-[10px] font-medium text-slate-400 mt-1 block">{alert.timestamp.toLocaleTimeString()}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* User Avatar */}
          <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 p-0.5 shadow-sm hover:border-indigo-200 transition-all">
            <div className="w-full h-full rounded-[10px] bg-indigo-600 flex items-center justify-center">
              <span className="text-xs font-black text-white">AP</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

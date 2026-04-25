import { useStore } from '../store';
import { Terminal, ShieldAlert, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export const ControlRoom = () => {
  const { agentLogs, isSimulationRunning } = useStore();

  return (
    <div className="p-8 lg:p-12 space-y-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-indigo-600 text-white rounded-[24px] flex items-center justify-center shadow-lg shadow-indigo-200">
            <ShieldAlert size={32} />
          </div>
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Agent Intelligence Hub</h2>
            <p className="text-slate-500 font-medium mt-1">Autonomous action logs and AI supervisor console.</p>
          </div>
        </div>
        
        {isSimulationRunning && (
           <div className="px-6 py-3 rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-600 text-sm font-black flex items-center gap-3 shadow-sm uppercase tracking-wider">
             <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
             Agentic Brain: ONLINE
           </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-10">
        
        {/* Live Event Log - Professional Console Style */}
        <div className="bg-white border border-slate-100 rounded-[40px] p-10 flex flex-col h-[700px] shadow-card relative overflow-hidden group">
          
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-50 z-20">
            <h3 className="text-[10px] font-black flex items-center gap-3 text-slate-400 uppercase tracking-[0.2em]">
              <Terminal size={18} />
              SYSTEM_ENVIRONMENT: stadium_os.log
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mr-2">PROCESSOR STATUS</span>
              <Cpu size={20} className="text-indigo-600 animate-pulse" />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-4 space-y-4 text-sm z-20 customized-scrollbar flex flex-col-reverse">
            <AnimatePresence initial={false}>
              {agentLogs.map((log) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  key={log.id} 
                  className="py-1 flex items-start gap-4 hover:bg-slate-50 rounded-xl px-2 transition-colors duration-200"
                >
                  <span className="text-slate-300 font-bold shrink-0 min-w-[70px]">{log.timestamp.toLocaleTimeString([], { hour12: false })}</span>
                  <div className="flex items-start gap-3">
                    {log.type === 'action' && <span className="text-indigo-600 font-black uppercase text-[10px] tracking-widest mt-0.5 min-w-[60px]">[ACTION]</span>}
                    {log.type === 'alert' && <span className="text-rose-600 font-black uppercase text-[10px] tracking-widest mt-0.5 min-w-[60px]">[ALERT]</span>}
                    {log.type === 'system' && <span className="text-slate-400 font-black uppercase text-[10px] tracking-widest mt-0.5 min-w-[60px]">[SYSTEM]</span>}
                    
                    <span className={twMerge(
                      "font-medium leading-relaxed",
                      log.type === 'action' ? 'text-slate-700' :
                      log.type === 'alert' ? 'text-rose-700 font-bold' : 'text-slate-500'
                    )}>
                      {log.message}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {agentLogs.length === 0 && (
              <div className="text-slate-300 italic font-medium mt-4 flex items-center gap-3">
                <span className="animate-pulse">&gt;</span> Listening for autonomous stadium agentics...
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

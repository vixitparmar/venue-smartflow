import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Users, ShieldAlert } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          onClick={onClose}
        />
        <motion.div 
           initial={{ opacity: 0, scale: 0.95, y: 30 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           exit={{ opacity: 0, scale: 0.95, y: 30 }}
           className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden relative z-10 shadow-2xl border border-slate-100"
         >
           <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
             <h3 className="text-xl font-black tracking-tight uppercase text-slate-900">{title}</h3>
             <button onClick={onClose} className="p-3 hover:bg-white hover:shadow-md rounded-2xl transition-all group">
               <X size={20} className="text-slate-400 group-hover:text-indigo-600" />
             </button>
           </div>
          <div className="p-10">
            {children}
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export const PlayerPerformanceModal: React.FC<{ player: any; isOpen: boolean; onClose: () => void }> = ({ player, isOpen, onClose }) => {
  if (!player) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Player Intelligence Profile">
      <div className="space-y-8">
        <div className="flex items-center gap-8">
          <div className="w-24 h-24 rounded-[28px] bg-indigo-50 border-4 border-white shadow-md flex items-center justify-center text-4xl font-black text-indigo-600">
            {player.name.charAt(0)}
          </div>
          <div className="space-y-2">
            <h4 className="text-3xl font-black text-slate-900 tracking-tight leading-none">{player.name}</h4>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest">Key Attacker</span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest">In-Form</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
           <div className="bg-slate-50 p-6 rounded-[24px] border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.1em] mb-2">Career Performance</p>
              <p className="text-2xl font-black text-slate-900">42.5 Avg</p>
           </div>
           <div className="bg-slate-50 p-6 rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.1em] mb-3">Live Velocity</p>
              <div className="flex gap-1.5 h-4 items-end">
                 {[40, 70, 50, 90, 60, 80].map((h, i) => (
                   <motion.div 
                     key={i} 
                     initial={{ height: 0 }}
                     animate={{ height: `${h}%` }}
                     className="flex-1 bg-indigo-200 rounded-sm" 
                   />
                 ))}
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <h5 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Match Analytics</h5>
           <div className="space-y-4">
              <div className="space-y-2">
                 <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                    <span className="text-slate-500">Execution Control</span>
                    <span className="text-indigo-600">92%</span>
                 </div>
                 <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
                    <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} className="h-full bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.4)]" />
                 </div>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                 <span className="text-slate-500 text-xs font-bold uppercase">Aggression Index</span>
                 <span className="text-indigo-600 font-black text-sm uppercase tracking-tighter">Peak Intensity</span>
              </div>
           </div>
        </div>
      </div>
    </Modal>
  );
};

export const ZoneAnalyticsModal: React.FC<{ sector: any; isOpen: boolean; onClose: () => void }> = ({ sector, isOpen, onClose }) => {
  if (!sector) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Zone Intelligence: ${sector.name}`}>
      <div className="space-y-8">
        <div className="grid grid-cols-3 gap-6">
           <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Density</p>
              <p className="text-2xl font-black text-indigo-600">{sector.density}%</p>
           </div>
           <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Active</p>
              <p className="text-2xl font-black text-slate-900">12.5k</p>
           </div>
           <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Thru-put</p>
              <p className="text-2xl font-black text-slate-900">45/m</p>
           </div>
        </div>

        <div className="bg-rose-50 border-2 border-rose-100 p-6 rounded-[28px] flex gap-5 items-center">
           <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-rose-500 shadow-sm">
            <ShieldAlert size={28} />
           </div>
           <div>
              <p className="text-xs font-black text-rose-600 uppercase tracking-[0.1em] mb-0.5">Critical Sector Alert</p>
              <p className="text-xs text-rose-700/80 font-medium leading-relaxed">Normal capacity thresholds exceeded. AI recommends dynamic routing towards Gate B.</p>
           </div>
        </div>

        <div className="h-44 w-full bg-slate-50 rounded-[28px] border border-slate-100 p-8 relative overflow-hidden">
           <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mb-4">Sentiment & Flow Patterns</p>
           <div className="absolute inset-0 flex items-end px-10 pb-8 gap-2">
              {[40, 55, 42, 60, 75, 65, 88].map((h, i) => (
                <motion.div 
                   key={i}
                   initial={{ height: 0 }}
                   animate={{ height: `${h}%` }}
                   className={twMerge(
                     "flex-1 rounded-t-lg transition-colors duration-500",
                     h > 70 ? "bg-rose-400" : h > 50 ? "bg-indigo-400" : "bg-indigo-300"
                   )}
                />
              ))}
           </div>
        </div>

        <button className="w-full bg-slate-900 text-white font-black py-5 rounded-[24px] uppercase tracking-[0.15em] text-sm hover:bg-indigo-600 shadow-xl shadow-slate-200 transition-all active:scale-[0.98]">
          Deploy Response Team
        </button>
      </div>
    </Modal>
  );
};

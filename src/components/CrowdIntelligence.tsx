import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { AlertTriangle, MapPin, Wind, Zap, Users } from 'lucide-react';
import { ZoneAnalyticsModal } from './Modals';

export const CrowdIntelligence: React.FC = () => {
   const { sectors, surgeProtocolActive, totalCrowd, avgWaitTime, autoMode } = useStore();
   const [selectedSector, setSelectedSector] = useState<any>(null);

   const getIntensityColor = (density: number) => {
      if (density < 40) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      if (density < 75) return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
   };

   return (
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8 pb-20">
         <ZoneAnalyticsModal
            isOpen={!!selectedSector}
            onClose={() => setSelectedSector(null)}
            sector={selectedSector}
         />

         {/* Stadium Zones Heatmap */}
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:col-span-3 space-y-8"
         >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
               <div>
                  <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase leading-none">Zone Intelligence</h2>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Live Heatmap • {totalCrowd.toLocaleString()} Active Attendees</p>
               </div>
               {surgeProtocolActive && (
                  <motion.div
                     animate={{ scale: [1, 1.05, 1], backgroundColor: ['rgba(244,63,94,0.1)', 'rgba(244,63,94,0.2)', 'rgba(244,63,94,0.1)'] }}
                     transition={{ repeat: Infinity, duration: 2 }}
                     className="text-rose-400 border border-rose-500/30 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(244,63,94,0.1)]"
                  >
                     <AlertTriangle size={14} /> Surge Intelligence Active
                  </motion.div>
               )}
            </div>

            {/* Mock Stadium Grid Representation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {sectors.map((sector) => (
                  <motion.div
                     key={sector.id}
                     className="relative group cursor-pointer"
                     whileHover={{ y: -4 }}
                     onClick={() => setSelectedSector(sector)}
                  >
                     <div className={`aspect-[16/10] w-full rounded-3xl bg-[#05070a]/50 backdrop-blur-md border ${getIntensityColor(sector.density).split(' ').pop()} transition-all duration-300 flex flex-col p-6`} >
                        <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{sector.name}</span>
                        <div className="flex items-end gap-2">
                           <span className={`text-3xl font-black ${getIntensityColor(sector.density).split(' ')[1]}`}>{(sector.density).toFixed(1)}%</span>
                           <span className="text-[10px] font-bold text-slate-600 mb-1.5 uppercase">Capacity</span>
                        </div>
                        
                        <div className="mt-auto">
                           <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                 initial={{ width: 0 }}
                                 animate={{ width: `${sector.density}%` }}
                                 className={`h-full ${getIntensityColor(sector.density).split(' ')[1].replace('text-', 'bg-')}`}
                              />
                           </div>
                        </div>
                     </div>
                     {/* Micro Interaction: Ping on high density */}
                     {sector.density > 80 && (
                        <div className="absolute top-4 right-4 flex h-3 w-3">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 border-2 border-[#05070a]"></span>
                        </div>
                     )}
                  </motion.div>
               ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                  { icon: Wind, label: 'Fan Movement', value: 'East towards Food Courts', color: 'indigo' },
                  { icon: Zap, label: 'Predicted Exit Surge', value: 'Expected after 18th Over', color: 'amber' },
                  { icon: Users, label: 'Avg Queue Time', value: `${avgWaitTime}m (Peak Gate B)`, color: 'emerald' },
               ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-5 p-6 rounded-3xl bg-[#05070a]/50 backdrop-blur-md border border-white/5 hover:bg-white/5 transition-all group">
                     <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 flex items-center justify-center text-${stat.color}-400 group-hover:scale-110 transition-transform`}>
                        <stat.icon size={22} />
                     </div>
                     <div>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                        <p className="text-sm font-bold text-white tracking-tight">{stat.value}</p>
                     </div>
                  </div>
               ))}
            </div>
         </motion.div>

         {/* Stats Summary Sidebar for Crowd */}
         <div className="space-y-6">
            <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="space-y-4"
            >
               <h4 className="text-slate-500 font-black uppercase text-[10px] tracking-widest">AI AGENT MODULE</h4>
               <div className="p-6 bg-[#05070a]/50 backdrop-blur-md rounded-3xl border border-white/5">
                  <div className="flex items-center justify-between mb-4">
                     <span className="text-sm text-white font-bold">{autoMode ? 'Autonomous' : 'Manual'}</span>
                     <button
                        onClick={() => useStore.getState().toggleAutoMode()}
                        className={`w-12 h-6 rounded-full p-1 transition-all ${autoMode ? 'bg-indigo-600' : 'bg-slate-700'}`}
                     >
                        <motion.div
                           animate={{ x: autoMode ? 24 : 0 }}
                           className="w-4 h-4 bg-white rounded-full shadow-lg shadow-black/50"
                        />
                     </button>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-bold pt-4 border-t border-white/5">
                     {autoMode ?
                        "Engine is actively balancing Gate A/C traffic via dynamic LED routing." :
                        "Manual operator mode enabled. System providing recommendation only."}
                  </p>
               </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
               className="space-y-4"
            >
               <h4 className="text-slate-500 font-black uppercase text-[10px] tracking-widest">VENUE LIVENESS</h4>
               <div className="p-6 bg-[#05070a]/50 backdrop-blur-md rounded-3xl border border-white/5 relative overflow-hidden group">
                  <div className="absolute -top-4 -right-4 p-4 opacity-[0.05] pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                     <MapPin size={100} className="text-indigo-500" />
                  </div>
                  <div className="space-y-6 relative z-10">
                     <div>
                        <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                           <span className="text-slate-500 tracking-wider">Audio Amplitude</span>
                           <span className="text-indigo-400">108.4 dB</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                           <motion.div animate={{ width: ['70%', '95%', '85%'] }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                        </div>
                     </div>
                     <div>
                        <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                           <span className="text-slate-500 tracking-wider">Wi-Fi Congestion</span>
                           <span className="text-white">82%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                           <motion.div animate={{ width: '82%' }} className="h-full bg-slate-500" />
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
         </div>
      </div>
   );
};

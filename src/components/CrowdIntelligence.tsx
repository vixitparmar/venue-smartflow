import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { AlertTriangle, MapPin, Wind, Zap, Users } from 'lucide-react';
import { ZoneAnalyticsModal } from './Modals';

export const CrowdIntelligence: React.FC = () => {
   const { sectors, surgeProtocolActive, totalCrowd, avgWaitTime, autoMode } = useStore();
   const [selectedSector, setSelectedSector] = useState<any>(null);

   const getIntensityColor = (density: number) => {
      if (density < 40) return 'bg-emerald-100 text-emerald-700';
      if (density < 75) return 'bg-amber-100 text-amber-700';
      return 'bg-rose-100 text-rose-700';
   };

   return (
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
         <ZoneAnalyticsModal
            isOpen={!!selectedSector}
            onClose={() => setSelectedSector(null)}
            sector={selectedSector}
         />

         {/* Stadium Zones Heatmap */}
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:col-span-3 p-8 lg:p-10"
         >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
               <div>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">Zone Density Heatmap</h3>
                  <p className="text-slate-500 text-xs font-medium mt-1">Live Stadium Metrics • {totalCrowd.toLocaleString()} Active Attendees</p>
               </div>
               {surgeProtocolActive && (
                  <motion.div
                     animate={{ scale: [1, 1.05, 1] }}
                     transition={{ repeat: Infinity, duration: 2 }}
                     className="bg-rose-50 text-rose-600 border border-rose-100 px-4 py-2 rounded-2xl text-[11px] font-bold uppercase flex items-center gap-2 shadow-sm"
                  >
                     <AlertTriangle size={14} /> Surge Intelligence Active
                  </motion.div>
               )}
            </div>

            {/* Mock Stadium Grid Representation */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {sectors.map((sector) => (
                  <motion.div
                     key={sector.id}
                     className="relative group cursor-pointer"
                     whileHover={{ y: -4 }}
                     onClick={() => setSelectedSector(sector)}
                  >
                     <div className={`aspect-[16/10] w-full rounded-3xl ${getIntensityColor(sector.density).split(' ')[0]} transition-all duration-300 border border-white shadow-sm flex flex-col p-5`} >
                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{sector.name}</span>
                        <span className={`text-3xl font-black ${getIntensityColor(sector.density).split(' ')[1]}`}>{(sector.density).toFixed(1)}%</span>
                        
                        <div className="mt-auto">
                           <div className="w-full h-1.5 bg-white/50 rounded-full overflow-hidden">
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
                        <div className="absolute top-3 right-3 flex h-3 w-3">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 border-2 border-white"></span>
                        </div>
                     )}
                  </motion.div>
               ))}
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="flex items-center gap-5 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-card transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                     <Wind size={24} />
                  </div>
                  <div>
                     <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-none mb-1">Fan Movement</p>
                     <p className="text-sm font-bold text-slate-700">East towards Food Courts</p>
                  </div>
               </div>
               <div className="flex items-center gap-5 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-card transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                     <Zap size={24} />
                  </div>
                  <div>
                     <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-none mb-1">Predicted Exit Surge</p>
                     <p className="text-sm font-bold text-slate-700">Expected after 18th Over</p>
                  </div>
               </div>
               <div className="flex items-center gap-5 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-card transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                     <Users size={24} />
                  </div>
                  <div>
                     <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-none mb-1">Avg Queue Time</p>
                     <p className="text-sm font-bold text-slate-700">{avgWaitTime}m (Peak Gate B)</p>
                  </div>
               </div>
            </div>
         </motion.div>

         {/* Stats Summary Sidebar for Crowd */}
         <div className="p-8 lg:p-10 bg-slate-50/50 border-l border-slate-100 space-y-10">
            <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="space-y-4"
            >
               <h4 className="text-slate-400 font-black uppercase text-[10px] tracking-widest">AI AGENT MODULE</h4>
               <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                     <span className="text-sm text-slate-900 font-bold">{autoMode ? 'Autonomous Control' : 'Manual Override'}</span>
                     <button
                        onClick={() => useStore.getState().toggleAutoMode()}
                        className={`w-12 h-6 rounded-full p-1 transition-all ${autoMode ? 'bg-indigo-600' : 'bg-slate-200'}`}
                     >
                        <motion.div
                           animate={{ x: autoMode ? 24 : 0 }}
                           className="w-4 h-4 bg-white rounded-full shadow-md"
                        />
                     </button>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium pt-3 border-t border-slate-50">
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
               <h4 className="text-slate-400 font-black uppercase text-[10px] tracking-widest">VENUE LIVENESS</h4>
               <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                     <MapPin size={80} className="text-indigo-600" />
                  </div>
                  <div className="space-y-6 relative z-10">
                     <div>
                        <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                           <span className="text-slate-400 tracking-wider">Audio Amplitude</span>
                           <span className="text-indigo-600">108.4 dB</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                           <motion.div animate={{ width: ['70%', '95%', '85%'] }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-indigo-500" />
                        </div>
                     </div>
                     <div>
                        <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                           <span className="text-slate-400 tracking-wider">Wi-Fi Congestion</span>
                           <span className="text-slate-900">82% Payload</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                           <motion.div animate={{ width: '82%' }} className="h-full bg-slate-400" />
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
         </div>
      </div>
   );
};

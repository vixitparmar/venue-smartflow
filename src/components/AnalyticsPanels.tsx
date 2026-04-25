import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';

export const PartnershipGraph: React.FC = () => {
  const { liveScore } = useStore();

  if (!liveScore) return null;

  const data = liveScore.partnerships.map(p => ({
    name: p.players,
    runs: p.runs,
    balls: p.balls,
    isHighest: p.isHighest
  }));

  return (
    <div className="p-8 lg:p-10 h-[440px] flex flex-col">
       <div className="flex flex-col mb-10">
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">PARTNERSHIP ANALYSIS</h3>
          <p className="text-sm text-slate-500 font-medium">Runs contribution by batting pairs</p>
       </div>
       
       <div className="flex-1 w-full">
         <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 60, right: 30 }}>
               <XAxis type="number" hide />
               <YAxis 
                 type="category" 
                 dataKey="name" 
                 axisLine={false} 
                 tickLine={false} 
                 tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
                 width={140}
               />
               <Tooltip 
                 cursor={{ fill: '#F1F5F9' }}
                 contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '13px', fontWeight: 'bold' }}
               />
               <Bar dataKey="runs" radius={[0, 8, 8, 0]} barSize={24}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.isHighest ? '#4F46E5' : '#94A3B8'} />
                  ))}
               </Bar>
            </BarChart>
         </ResponsiveContainer>
       </div>
    </div>
  );
};

export const FOWTimeline: React.FC = () => {
  const { liveScore } = useStore();

  if (!liveScore) return null;

  return (
    <div className="p-8 lg:p-10">
       <div className="mb-10">
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">FALL OF WICKETS</h3>
          <p className="text-sm text-slate-500 font-medium">Progression of wicket events</p>
       </div>
       <div className="relative pt-16 pb-12 px-6">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-100 -translate-y-1/2" />
          <div className="flex justify-between relative">
             {liveScore.fallOfWickets.map((wicket, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="relative group cursor-pointer"
               >
                  <div className="w-5 h-5 bg-rose-500 rounded-full border-4 border-white shadow-md group-hover:scale-125 transition-transform" />
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                     <p className="text-[11px] font-black text-slate-900">{wicket.score}/{wicket.wickets}</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{wicket.over} OV</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-3 py-2 rounded-xl text-xs font-bold shadow-xl whitespace-nowrap transition-all duration-200 pointer-events-none z-10 -translate-y-2 group-hover:translate-y-0">
                     {wicket.batsman}
                  </div>
               </motion.div>
             ))}
             {/* End marker for Current Score */}
             <div className="relative">
                <div className="w-6 h-6 bg-indigo-600 rounded-full border-4 border-white shadow-lg animate-pulse" />
                <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                   <p className="text-[11px] font-black text-indigo-600">{liveScore.score}/{liveScore.wickets}</p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{liveScore.overs} OV</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

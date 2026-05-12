import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, CartesianGrid } from 'recharts';
import { BarChart3, Timeline as TimelineIcon } from 'lucide-react';

const PanelHeader = ({ title, sub, icon: Icon }: any) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
      <Icon size={18} className="text-indigo-400" />
    </div>
    <div>
      <h3 className="text-sm font-black text-white tracking-[0.2em] uppercase leading-tight">{title}</h3>
      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{sub}</p>
    </div>
  </div>
);

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
    <div className="widget-container p-6 lg:p-8 h-[450px] flex flex-col">
      <PanelHeader title="Partnership Analysis" sub="Runs contribution by batting pairs" icon={BarChart3} />

      <div className="flex-1 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20, right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
              width={140}
            />
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '12px', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                fontSize: '11px',
                color: '#fff'
              }}
              itemStyle={{ color: '#818cf8' }}
            />
            <Bar dataKey="runs" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.isHighest ? '#6366f1' : '#334155'} />
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
    <div className="widget-container p-6 lg:p-8 overflow-hidden">
      <PanelHeader title="Fall of Wickets" sub="Progression of wicket events" icon={TimelineIcon} />
      
      <div className="relative pt-12 pb-16 px-4 mt-4 overflow-x-auto customized-scrollbar">
        <div className="min-w-[600px] relative">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 -translate-y-1/2" />
          <div className="flex justify-between relative">
            {liveScore.fallOfWickets.map((wicket, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group cursor-pointer"
              >
                <div className="w-4 h-4 bg-rose-500 rounded-full border-2 border-[#0f172a] shadow-[0_0_10px_rgba(244,63,94,0.4)] group-hover:scale-125 transition-transform" />
                <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                  <p className="text-[10px] font-black text-white">{wicket.score}/{wicket.wickets}</p>
                  <p className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter">{wicket.over} OV</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 border border-white/10 text-white px-3 py-1.5 rounded-lg text-[9px] font-bold shadow-2xl whitespace-nowrap transition-all duration-200 pointer-events-none z-10 -translate-y-2 group-hover:translate-y-0">
                  {wicket.batsman}
                </div>
              </motion.div>
            ))}
            {/* End marker for Current Score */}
            <div className="relative">
              <div className="w-5 h-5 bg-indigo-500 rounded-full border-2 border-[#0f172a] shadow-[0_0_15px_rgba(99,102,241,0.5)] animate-pulse" />
              <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                <p className="text-[10px] font-black text-indigo-400">{liveScore.score}/{liveScore.wickets}</p>
                <p className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter">{liveScore.overs} OV</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AnalyticsPanels: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:gap-8 pb-20">
      <PartnershipGraph />
      <FOWTimeline />
    </div>
  );
};

export default AnalyticsPanels;

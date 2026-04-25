import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, animate } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { useStore } from '../store';
import { Trophy, TrendingUp } from 'lucide-react';
import { PlayerPerformanceModal } from './Modals';

const CountUp: React.FC<{ value: number }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 1,
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [value]);

  return <>{displayValue}</>;
};

export const ScorecardPanel: React.FC = () => {
  const { liveScore } = useStore();
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

  if (!liveScore) return null;

  const topBatsman = liveScore.battingStats.find(p => p.isHighlight) || liveScore.battingStats[0];

  return (
    <div className="flex flex-col lg:flex-row gap-0">
      <PlayerPerformanceModal
        isOpen={!!selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
        player={selectedPlayer}
      />

      {/* Main Scorecard Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-[2] p-8 lg:p-10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
          <TrendingUp size={160} className="text-slate-900" />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-8 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-full uppercase tracking-widest">LIVE ACTION</span>
               <span className="text-slate-400 text-xs font-medium">• {liveScore.status}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
               {liveScore.batTeam} <span className="text-slate-300 mx-1">v</span> {liveScore.bowlTeam}
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <motion.div
              key={liveScore.score}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-6xl font-black tracking-tighter text-indigo-600 flex items-baseline gap-1"
            >
              <CountUp value={liveScore.score} /><span className="text-slate-300 text-4xl">/</span><CountUp value={liveScore.wickets} />
            </motion.div>
            <div className="flex items-center gap-2 mt-1">
               <span className="text-slate-900 font-bold text-sm">{liveScore.overs} OVERS</span>
               <span className="w-1 h-1 rounded-full bg-slate-300" />
               <span className="text-slate-500 font-medium text-sm tracking-wide uppercase">CRR {liveScore.crr}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {/* Batsman Table */}
          <div>
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.1em]">Current Batting</h3>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                  <th className="pb-3 border-b border-slate-100">Batsman</th>
                  <th className="pb-3 border-b border-slate-100 text-right">R</th>
                  <th className="pb-3 border-b border-slate-100 text-right">B</th>
                  <th className="pb-3 border-b border-slate-100 text-right">SR</th>
                </tr>
              </thead>
              <tbody>
                {liveScore.battingStats.map((p, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelectedPlayer(p)}
                    className={twMerge(
                      "group cursor-pointer transition-all hover:bg-slate-50",
                      p.isHighlight && "bg-indigo-50/50"
                    )}
                  >
                    <td className="py-4 border-b border-slate-50">
                      <div className="flex items-center gap-2">
                        <span className={twMerge(
                          "font-bold transition-all",
                          p.isHighlight ? "text-indigo-600" : "text-slate-700"
                        )}>{p.name}</span>
                        {p.isHighlight && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                      </div>
                    </td>
                    <td className="py-4 border-b border-slate-50 text-right font-bold text-slate-900">{p.runs}</td>
                    <td className="py-4 border-b border-slate-50 text-right font-medium text-slate-400">{p.balls}</td>
                    <td className="py-4 border-b border-slate-50 text-right font-bold text-indigo-500/80">{p.sr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bowler Table */}
          <div>
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.1em]">Attack Strategy</h3>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                  <th className="pb-3 border-b border-slate-100">Bowler</th>
                  <th className="pb-3 border-b border-slate-100 text-right">O</th>
                  <th className="pb-3 border-b border-slate-100 text-right">W</th>
                  <th className="pb-3 border-b border-slate-100 text-right">ECON</th>
                </tr>
              </thead>
              <tbody>
                {liveScore.bowlingStats.map((p, i) => (
                  <tr key={i} className="group hover:bg-slate-50 transition-all cursor-pointer">
                    <td className="py-4 border-b border-slate-50 font-bold text-slate-700">{p.name}</td>
                    <td className="py-4 border-b border-slate-50 text-right font-medium text-slate-400">{p.overs}</td>
                    <td className="py-4 border-b border-slate-50 text-right font-black text-rose-500">{p.wickets}</td>
                    <td className="py-4 border-b border-slate-50 text-right font-bold text-slate-900">{p.economy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Top Performer Sidebar Component */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:w-80 bg-slate-50 border-l border-slate-100 p-8 flex flex-col relative group"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16" />
        
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-sm">
              <Trophy size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">STAR PERFORMANCE</span>
          </div>

          <h3 className="text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-2">
            {topBatsman?.name}
          </h3>
          <p className="text-sm font-medium text-indigo-600">Dominating the crease</p>
        </div>

        <div className="space-y-6 flex-1">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">TOTAL RUNS</span>
            <div className="flex items-baseline gap-2">
               <span className="text-4xl font-black text-slate-900 leading-none">{topBatsman.runs}</span>
               <span className="text-xs font-bold text-slate-400">({topBatsman.balls})</span>
            </div>
            <div className="mt-4 w-full h-1 bg-slate-100 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${Math.min(100, (topBatsman.runs / 120) * 100)}%` }}
                 className="h-full bg-indigo-600"
               />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-center">
                <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">FOURS</span>
                <span className="text-2xl font-black text-slate-900">{topBatsman.fours}</span>
             </div>
             <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-center">
                <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">SIXES</span>
                <span className="text-2xl font-black text-slate-900">{topBatsman.sixes}</span>
             </div>
          </div>

          <div className="bg-indigo-600 rounded-2xl p-5 text-white shadow-lg shadow-indigo-100">
             <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold opacity-80 uppercase tracking-widest">STRIKE RATE</span>
                <TrendingUp size={14} className="opacity-80" />
             </div>
             <span className="text-2xl font-black">{topBatsman.sr}</span>
          </div>
        </div>

        <button 
          onClick={() => setSelectedPlayer(topBatsman)}
          className="mt-8 w-full py-4 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 shadow-sm"
        >
          View Full Insights
        </button>
      </motion.div>
    </div>
  );
};

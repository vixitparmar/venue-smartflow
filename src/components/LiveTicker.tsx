import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';

export const LiveTicker: React.FC = () => {
  const { liveScore } = useStore();

  if (!liveScore) return null;

  return (
    <div className="w-full bg-slate-950/90 backdrop-blur-3xl border-b border-slate-800 h-10 flex items-center">
      {/* Fixed Status Section */}
      <div className="flex-shrink-0 px-6 h-full flex items-center gap-3 border-r border-slate-800 bg-slate-900/40">
        {liveScore.status.includes('Fallback') ? (
          <>
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-500 whitespace-nowrap">Synthetic Mode</span>
          </>
        ) : (
          <>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-500 whitespace-nowrap">Live Feed</span>
          </>
        )}
      </div>

      {/* Scrolling Section */}
      <div className="flex-1 overflow-hidden relative h-full flex items-center">
        <motion.div 
          animate={{ x: [20, -1800] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap flex space-x-12 px-4"
        >
          <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
            <span className="w-1 h-1 bg-indigo-500 rounded-full" />
            {liveScore.batTeam} vs {liveScore.bowlTeam} • {liveScore.status}
          </span>
          <span className="text-slate-400 text-xs font-semibold">
            SCORE: <span className="text-white font-mono">{liveScore.score}/{liveScore.wickets}</span> ({liveScore.overs} OV) • CRR: <span className="text-white font-mono">{liveScore.crr}</span>
          </span>
          <span className="text-slate-300 font-bold uppercase tracking-widest text-xs">
            TARGET: {liveScore.target} • {liveScore.batTeam} REQUIRES {liveScore.target && (liveScore.target - liveScore.score)} RUNS
          </span>
          {/* Duplicate for seamless scroll */}
          <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
             <span className="w-1 h-1 bg-indigo-500 rounded-full" />
            {liveScore.batTeam} vs {liveScore.bowlTeam} • {liveScore.status}
          </span>
          <span className="text-slate-400 text-xs font-semibold">
            SCORE: {liveScore.score}/{liveScore.wickets} • CRR: {liveScore.crr}
          </span>
        </motion.div>
        
        {/* Fade edges for the scrolling area */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

import React from 'react';
import { useStore } from '../store';
import { motion } from 'framer-motion';
import { Trophy, Activity, Users } from 'lucide-react';

export const LiveScoreCard = () => {
  const { liveScore, fetchLiveScore } = useStore();

  React.useEffect(() => {
    fetchLiveScore();
    const interval = setInterval(fetchLiveScore, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, [fetchLiveScore]);

  if (!liveScore) {
    return (
      <div className="bg-[var(--color-card-bg)] backdrop-blur-xl border border-white/10 rounded-3xl p-6 h-32 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-400 font-mono text-sm">SYNCING LIVE FEED...</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--color-card-bg)] backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group glow-cyan animate-slow-pulse"
    >
      {/* Background Decorative Element */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-[var(--color-accent)]/10 blur-[60px] rounded-full group-hover:bg-[var(--color-accent)]/20 transition-colors duration-700" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center border border-[var(--color-accent)]/30 shadow-[0_0_20px_rgba(0,242,255,0.15)]">
            <Trophy className="text-[var(--color-accent)]" size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[var(--color-accent)] tracking-widest uppercase">MATCH CONNECTED</span>
              {liveScore.status.toLowerCase().includes('won') || liveScore.status.toLowerCase().includes('result') ? (
                <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-gray-500">FINAL</span>
              ) : (
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-500/10 border border-red-500/20 text-[10px] text-red-500 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> LIVE
                </span>
              )}
            </div>
            <h3 className="text-white font-black text-xl tracking-tight mt-1">{liveScore.batTeam}</h3>
          </div>
        </div>

        <div className="flex items-end gap-1 font-mono">
          <span className="text-4xl md:text-5xl font-black text-white">{liveScore.score}</span>
          <span className="text-2xl md:text-3xl font-bold text-gray-500 mb-1">/</span>
          <span className="text-2xl md:text-3xl font-bold text-gray-400 mb-1">{liveScore.wickets}</span>
          <div className="ml-4 flex flex-col items-end">
             <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">OVERS</span>
             <span className="text-lg font-black text-[var(--color-secondary)]">{liveScore.overs}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Activity size={14} className="text-[var(--color-secondary)]" />
            <span className="font-medium">{liveScore.status}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-gray-400 backdrop-blur-md">
                P{i}
              </div>
            ))}
          </div>
          <span className="text-[10px] text-gray-500 font-mono">BROADCAST ACTIVE</span>
        </div>
      </div>
    </motion.div>
  );
};

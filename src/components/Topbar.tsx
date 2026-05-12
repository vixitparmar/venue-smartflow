import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { 
  Bell, 
  Users, 
  Clock, 
  Zap, 
  Menu, 
  X
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Topbar = () => {
  const { toggleSidebar, isSidebarOpen } = useStore();
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-GB', { hour12: false }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-20 bg-[#05070a]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left Section: Live Status */}
      <div className="flex items-center gap-6">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-white/5 rounded-lg text-slate-400"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            <span className="text-[10px] font-black text-white tracking-widest">LIVE</span>
          </div>
          <div className="w-px h-3 bg-white/10 mx-1"></div>
          <span className="text-xs font-mono text-slate-300 tracking-tighter">{time}</span>
        </div>
      </div>

      {/* Center Section: Project Title */}
      <div className="hidden lg:flex flex-col items-center text-center">
        <h2 className="text-sm font-black text-indigo-400 tracking-[0.3em] uppercase leading-tight">
          AGENTIC PREMIER LEAGUE <span className="text-white opacity-40">(APL)</span>
        </h2>
        <p className="text-[10px] text-slate-500 font-bold tracking-widest mt-0.5">
          Autonomous Stadium Management System
        </p>
      </div>

      {/* Right Section: Global Metrics */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-6 mr-6">
          {/* AI Engine Status */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Zap size={14} className="text-emerald-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-500 font-bold tracking-widest leading-tight">AI ENGINE</span>
              <span className="text-[10px] text-emerald-400 font-black leading-tight">ACTIVE</span>
            </div>
          </div>

          {/* Capacity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <Users size={14} className="text-purple-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-500 font-bold tracking-widest leading-tight uppercase">Capacity</span>
              <span className="text-[10px] text-white font-black leading-tight tracking-tight">103,860 <span className="text-[8px] text-slate-500 font-medium">ATTENDEES</span></span>
            </div>
          </div>

          {/* Wait Time */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
              <Clock size={14} className="text-amber-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-500 font-bold tracking-widest leading-tight uppercase">Avg Wait Time</span>
              <span className="text-[10px] text-white font-black leading-tight">12m <span className="text-[8px] text-amber-500 font-medium">LIVE</span></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
          <button className="relative w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors group">
            <Bell size={18} className="text-slate-400 group-hover:text-white transition-colors" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#05070a]"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-2">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20 cursor-pointer hover:scale-105 transition-transform">
               AP
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};

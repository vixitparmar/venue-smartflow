import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Navigation as NavIcon } from 'lucide-react';
import { useStore } from '../store';

export const Navigation = () => {
  const [destination, setDestination] = useState('');
  const [isRouting, setIsRouting] = useState(false);

  const handleSearch = () => {
    if (!destination) return;
    setIsRouting(true);
    setTimeout(() => setIsRouting(false), 2000);
  };


  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">Smart Navigation</h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Shortest and least crowded path AI-driven optimization</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Search Panel */}
        <div className="w-full lg:w-[400px] bg-[#05070a]/50 backdrop-blur-md rounded-3xl border border-white/5 p-6 md:p-8 shrink-0 h-fit">
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
            </div>
            <input
              type="text"
              placeholder="Where do you want to go?"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/10 focus:border-indigo-500/40 transition-all font-bold text-sm"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>

          <div className="mt-8">
            <h4 className="text-[10px] font-black text-slate-500 mb-4 uppercase tracking-[0.2em]">Popular Destinations</h4>
            <div className="space-y-3">
              {['Gate 4 Exit', 'Restroom (North)', 'Food Court', 'VIP Deck'].map((place) => (
                <button
                  key={place}
                  onClick={() => { setDestination(place); handleSearch(); }}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-indigo-500/20 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                      <MapPin size={18} />
                    </div>
                    <span className="font-bold text-slate-300 text-sm">{place}</span>
                  </div>
                  <NavIcon size={16} className="text-slate-500 group-hover:text-indigo-400 transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Map View */}
        <div className="flex-1 bg-[#05070a]/50 backdrop-blur-md rounded-3xl border border-white/5 relative overflow-hidden flex items-center justify-center min-h-[400px] md:min-h-[500px]">

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)] bg-[size:50px_50px]"></div>

          {isRouting ? (
            <div className="flex flex-col items-center relative z-10">
              <div className="w-16 h-16 border-4 border-white/5 border-t-indigo-500 rounded-full animate-spin"></div>
              <p className="mt-6 text-slate-500 font-black tracking-widest animate-pulse uppercase text-[10px]">Calculating optimal AI route...</p>
            </div>
          ) : destination ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-2xl aspect-video bg-indigo-500/5 border border-indigo-500/10 rounded-3xl p-8"
            >
              <div className="absolute top-6 left-6 bg-indigo-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20">
                Fastest Route Found
              </div>

              {/* Mock Path Animation */}
              <svg className="absolute inset-0 w-full h-full p-12 pointer-events-none" preserveAspectRatio="none">
                <motion.path
                  d="M 50,200 Q 150,50 300,100 T 550,50"
                  fill="transparent"
                  strokeWidth="3"
                  stroke="#6366f1"
                  strokeDasharray="8 8"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <circle cx="50" cy="200" r="8" fill="#6366f1" stroke="#05070a" strokeWidth="3" />
                <circle cx="550" cy="50" r="8" fill="#f43f5e" stroke="#05070a" strokeWidth="3" />
              </svg>

            </motion.div>
          ) : (
            <div className="text-center text-slate-500 flex flex-col items-center relative z-10 px-6">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/5">
                <MapPin size={32} className="text-slate-600" />
              </div>
              <p className="text-lg font-black text-white tracking-tight uppercase">Select a destination</p>
              <p className="text-xs mt-1 font-bold text-slate-500">AI Agent will calculate crowd-density based routing</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

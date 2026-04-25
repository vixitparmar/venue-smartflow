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
    <div className="p-8 lg:p-12 space-y-12">
      <div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Smart Navigation</h2>
        <p className="text-slate-500 font-medium mt-2">Shortest and least crowded path AI-driven optimization</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Search Panel */}
        <div className="w-full lg:w-[400px] bg-white rounded-[32px] border border-slate-100 p-8 shadow-card shrink-0 h-fit">
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
            </div>
            <input
              type="text"
              placeholder="Where do you want to go?"
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 pl-14 pr-6 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-200 transition-all font-medium"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>

          <div className="mt-10">
            <h4 className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Popular Destinations</h4>
            <div className="space-y-4">
              {['Gate 4 Exit', 'Restroom (North)', 'Food Court', 'VIP Deck'].map((place) => (
                <button
                  key={place}
                  onClick={() => { setDestination(place); handleSearch(); }}
                  className="w-full flex items-center justify-between p-5 rounded-2xl bg-slate-50 hover:bg-white border border-transparent hover:border-indigo-100 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <MapPin size={18} />
                    </div>
                    <span className="font-bold text-slate-700">{place}</span>
                  </div>
                  <NavIcon size={18} className="text-slate-300 group-hover:text-indigo-600 transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Map View */}
        <div className="flex-1 bg-white rounded-[40px] border border-slate-100 shadow-card relative overflow-hidden flex items-center justify-center min-h-[500px]">
          
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          
          {isRouting ? (
            <div className="flex flex-col items-center relative z-10">
              <div className="w-20 h-20 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
              <p className="mt-6 text-slate-500 font-bold tracking-tight animate-pulse uppercase text-sm">Calculating optimal AI route...</p>
            </div>
          ) : destination ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-2xl aspect-video bg-indigo-50/30 border border-indigo-100 rounded-[32px] p-8"
            >
              <div className="absolute top-6 left-6 bg-white px-5 py-2.5 rounded-2xl border border-indigo-100 text-indigo-600 font-black text-xs uppercase tracking-widest shadow-sm">
                Fastest Route Found
              </div>
              
              {/* Mock Path Animation */}
              <svg className="absolute inset-0 w-full h-full p-12 pointer-events-none" preserveAspectRatio="none">
                <motion.path
                  d="M 50,200 Q 150,50 300,100 T 550,50"
                  fill="transparent"
                  strokeWidth="3"
                  stroke="#4F46E5"
                  strokeDasharray="8 8"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <circle cx="50" cy="200" r="10" fill="#4F46E5" stroke="white" strokeWidth="3" />
                <circle cx="550" cy="50" r="10" fill="#F43F5E" stroke="white" strokeWidth="3" />
              </svg>
              
            </motion.div>
          ) : (
            <div className="text-center text-slate-400 flex flex-col items-center relative z-10">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <MapPin size={48} className="text-slate-200" />
              </div>
              <p className="text-xl font-bold text-slate-400 tracking-tight">Select a destination to generate map</p>
              <p className="text-sm mt-1">AI Agent will calculate crowd-density based routing</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

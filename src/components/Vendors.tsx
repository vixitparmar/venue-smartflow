import { useStore } from '../store';
import { motion } from 'framer-motion';
import { Clock, ShoppingBag, Flame } from 'lucide-react';

export const Vendors = () => {
  const { vendors } = useStore();

  const sortedVendors = [...vendors].sort((a, b) => a.waitTime - b.waitTime);

  return (
    <div className="p-8 lg:p-12 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Concessions Express</h2>
          <p className="text-slate-500 font-medium mt-2">AI-driven queue management for food and beverages</p>
        </div>
        <button className="bg-indigo-600 text-white font-black px-8 py-4 rounded-2xl flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-lg hover:-translate-y-1">
          <ShoppingBag size={22} />
          View Checkout (0)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {sortedVendors.map((vendor) => (
          <motion.div 
            key={vendor.id}
            layout
            className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-card relative group hover:-translate-y-2 transition-all duration-300"
          >
            {vendor.isRecommended && (
              <div className="absolute -top-4 -right-4 bg-amber-500 text-white text-[10px] font-black px-4 py-2 rounded-full flex items-center gap-1.5 shadow-md uppercase tracking-wider">
                <Flame size={12} fill="currentColor" />
                AI Suggested
              </div>
            )}
            
            <div className="w-16 h-16 rounded-[20px] bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 shadow-inner">
              <span className="text-2xl font-black text-indigo-600">{vendor.name.charAt(0)}</span>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{vendor.name}</h3>
            
            <div className="flex items-center gap-2 text-sm font-bold mb-6">
              <Clock size={18} className={vendor.waitTime < 10 ? 'text-emerald-500' : vendor.waitTime > 20 ? 'text-rose-500' : 'text-amber-500'} />
              <span className={vendor.waitTime < 10 ? 'text-emerald-600' : vendor.waitTime > 20 ? 'text-rose-600' : 'text-amber-600'}>
                {vendor.waitTime} min estimated wait
              </span>
            </div>
            
            <div className="flex gap-2 flex-wrap mb-8">
              {vendor.popularItems.map((item, i) => (
                <span key={i} className="text-[10px] font-black px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 uppercase tracking-widest">
                  {item}
                </span>
              ))}
            </div>
            
            <button className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black hover:bg-indigo-600 transition-all text-sm uppercase tracking-widest">
              Quick Order
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

import { useStore } from '../store';
import { Bath, CheckCircle2, XCircle } from 'lucide-react';

export const Facilities = () => {
  const { facilities } = useStore();

  return (
    <div className="p-8 lg:p-12 space-y-12">
      <div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Facility Tracker</h2>
        <p className="text-slate-500 font-medium mt-2">Real-time availability of stadium amenities and hygiene centers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {facilities.map((facility) => (
          <div 
            key={facility.id}
            className={`bg-white border-[3px] rounded-[32px] p-8 transition-all shadow-card flex items-center justify-between group hover:-translate-y-1 duration-300
              ${facility.isAvailable ? 'border-emerald-50 hover:border-emerald-100' : 'border-rose-50 hover:border-rose-100'}`}
          >
            <div className="flex items-center gap-6">
              <div className={`w-16 h-16 rounded-[20px] flex items-center justify-center transition-all duration-500 shadow-sm
                ${facility.isAvailable ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white' : 'bg-rose-50 text-rose-600 group-hover:bg-rose-500 group-hover:text-white'}`}>
                <Bath size={28} />
              </div>
              <div>
                <h3 className="font-bold text-xl text-slate-900 mb-1">{facility.name}</h3>
                <p className={`text-sm font-black uppercase tracking-widest ${facility.isAvailable ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {facility.isAvailable ? 'Available Now' : 'Currently Busy'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              {facility.isAvailable ? (
                <CheckCircle2 size={32} className="text-emerald-500" />
              ) : (
                <XCircle size={32} className="text-rose-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

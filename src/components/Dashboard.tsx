import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { useStore } from '../store';
import { Stadium3D } from './Stadium3D';
import { 
  Trophy, 
  Users, 
  Route, 
  ShieldAlert, 
  Utensils, 
  Activity, 
  Brain,
  TrendingUp,
  AlertCircle,
  Eye,
  Settings,
  Server,
  Network,
  Zap,
  Cctv
} from 'lucide-react';

// --- Sub-Components (Widgets) ---

const WidgetHeader = ({ title, sub, icon: Icon, color = "indigo" }: any) => (
  <div className="flex items-center gap-3 mb-6">
    <div className={`p-2 rounded-lg bg-${color}-500/10 border border-${color}-500/20`}>
      <Icon size={16} className={`text-${color}-400`} />
    </div>
    <div>
      <h3 className="text-[11px] font-black text-white tracking-widest uppercase">{title}</h3>
      <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tight">{sub}</p>
    </div>
  </div>
);

const MatchIntelligence = () => {
  const { liveScore } = useStore();
  return (
    <div className="widget-container p-6 col-span-1 lg:col-span-2">
      <WidgetHeader title="Match Intelligence Center" sub="Live from Narendra Modi Stadium" icon={Trophy} />
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Team 1 */}
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/30">
             <span className="text-xl font-black text-indigo-400">GT</span>
           </div>
           <div>
             <h4 className="text-xs font-black text-slate-400 tracking-widest">GUJARAT</h4>
             <div className="text-2xl font-black text-white">186/4</div>
             <p className="text-[10px] text-slate-500 font-bold uppercase">18.2 OVERS</p>
           </div>
        </div>

        {/* Live Indicator */}
        <div className="flex flex-col items-center">
          <div className="px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-[9px] font-black tracking-widest mb-2 border border-red-500/30">LIVE</div>
          <p className="text-[10px] text-slate-500 font-bold">IPL 2024 - Match 45</p>
          <p className="text-[10px] text-indigo-400 font-bold">2nd Innings</p>
        </div>

        {/* Team 2 */}
        <div className="flex items-center gap-4 text-right">
           <div>
             <h4 className="text-xs font-black text-slate-400 tracking-widest">MUMBAI</h4>
             <div className="text-2xl font-black text-white">172/6</div>
             <p className="text-[10px] text-slate-500 font-bold uppercase">20 OVERS</p>
           </div>
           <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
             <span className="text-xl font-black text-blue-400">MI</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/5">
        {[
          { label: 'RUN RATE', value: '10.15' },
          { label: 'REQUIRED RR', value: '7.50' },
          { label: 'PARTNERSHIP', value: '45 (23)' },
          { label: 'WIN PROBABILITY', value: 'GT 68% MI 32%', full: true },
        ].map((stat, i) => (
          <div key={i} className={twMerge("flex flex-col", stat.full && "col-span-1")}>
            <span className="text-[9px] text-slate-500 font-bold tracking-widest uppercase mb-1">{stat.label}</span>
            <span className="text-xs font-black text-white">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TopPerformers = () => (
  <div className="widget-container p-6">
    <WidgetHeader title="Top Performers" sub="Current Match Impact" icon={TrendingUp} color="amber" />
    <div className="space-y-6">
      {[
        { name: 'S. Gill', team: 'GT', score: '89 (52)', statLabel: 'STRIKE RATE', statValue: '171.15' },
        { name: 'J. Bumrah', team: 'MI', score: '2/28 (3.2)', statLabel: 'ECONOMY', statValue: '8.40' },
      ].map((player, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10" />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-white">{player.name}</span>
              <span className="text-[10px] font-black text-white">{player.score}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-[9px] text-slate-500 font-bold uppercase">{player.team}</span>
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-slate-500 font-bold uppercase">{player.statLabel}</span>
                <span className="text-[10px] font-black text-amber-500">{player.statValue}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const BrainStatus = () => (
  <div className="widget-container p-6">
    <WidgetHeader title="Agentic Brain Status" sub="Autonomous Decision Engine" icon={Brain} color="purple" />
    <div className="flex justify-center my-4">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-2xl animate-pulse" />
        <Brain className="w-full h-full text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
      </div>
    </div>
    <div className="space-y-3 mt-6">
      {['Crowd Flow Optimizing', 'Surge Detection Active', 'Routing Engine Active', 'Vendor Balancing Active'].map((label, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-slate-300 font-bold">{label}</span>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5">
      <div>
        <span className="text-[9px] text-slate-500 font-bold tracking-widest uppercase block mb-1">DECISIONS TODAY</span>
        <span className="text-sm font-black text-white">1,247</span>
      </div>
      <div className="text-right">
        <span className="text-[9px] text-slate-500 font-bold tracking-widest uppercase block mb-1">ACCURACY</span>
        <span className="text-sm font-black text-emerald-400">98.7%</span>
      </div>
    </div>
  </div>
);

const ZoneDensity = () => (
  <div className="widget-container p-6">
    <WidgetHeader title="Zone Density Heatmap" sub="Live Crowd Density • 16 Zones" icon={Users} color="indigo" />
    <div className="grid grid-cols-4 gap-2">
      {['A', 'B', 'C', 'D'].map(row => 
        [1, 2, 3, 4].map(col => {
          const id = `${row}${col}`;
          const density = Math.floor(Math.random() * 100);
          const colorClass = density > 80 ? 'text-red-500 bg-red-500/10 border-red-500/20' : density > 50 ? 'text-amber-500 bg-amber-500/10 border-amber-500/20' : 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
          const label = density > 80 ? 'CRITICAL' : density > 50 ? 'HIGH' : 'LOW';
          return (
            <div key={id} className={twMerge("p-2 rounded-lg border flex flex-col items-center", colorClass)}>
              <span className="text-[8px] font-black opacity-60 mb-0.5">{id}</span>
              <span className="text-[10px] font-black">{density}%</span>
              <span className="text-[7px] font-bold uppercase tracking-tighter">{label}</span>
            </div>
          );
        })
      )}
    </div>
    <div className="mt-4 flex justify-between">
      {['0-30%', '31-60%', '61-80%', '81-100%'].map((range, i) => (
        <div key={i} className="flex items-center gap-1">
          <div className={twMerge("w-1.5 h-1.5 rounded-full", i === 0 ? 'bg-emerald-500' : i === 1 ? 'bg-yellow-500' : i === 2 ? 'bg-orange-500' : 'bg-red-500')} />
          <span className="text-[8px] text-slate-500 font-bold">{range}</span>
        </div>
      ))}
    </div>
  </div>
);

const SurgeProtocols = () => (
  <div className="widget-container p-6">
    <WidgetHeader title="Surge Protocols" sub="Autonomous Surge Detection" icon={ShieldAlert} color="red" />
    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex gap-4">
      <AlertCircle className="text-red-500 shrink-0" size={24} />
      <div>
        <h4 className="text-[10px] font-black text-red-500 uppercase tracking-widest">SURGE ALERT</h4>
        <p className="text-[11px] font-bold text-white mt-1">Gate B Crowd Surge Detected</p>
        <p className="text-[9px] text-slate-400 mt-1">Density: <span className="text-red-400 font-black">88% (CRITICAL)</span></p>
        <p className="text-[9px] text-slate-400">Predicted Peak: 15 mins</p>
        <button className="mt-3 px-3 py-1 bg-red-500 text-white text-[9px] font-black uppercase rounded-lg hover:bg-red-600 transition-colors">ACTION TAKEN</button>
      </div>
    </div>
    <div className="mt-6">
      <h5 className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-3">ACTIVE PROTOCOLS (2)</h5>
      <div className="space-y-2">
        {['Gate B - Crowd Redistribution', 'Food Court 2 - Load Balancing'].map((p, i) => (
          <div key={i} className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-slate-300 font-bold">{p}</span>
            </div>
            <span className="text-[8px] text-emerald-400 font-black uppercase">IN PROGRESS</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SmartRoutingHub = () => (
  <div className="widget-container p-6">
    <WidgetHeader title="Smart Routing Hub" sub="Real-time Wait Times & Routing" icon={Route} color="indigo" />
    <div className="space-y-2">
      {[
        { gate: 'Gate A', time: '8m', status: 'LOW', color: 'emerald' },
        { gate: 'Gate B', time: '32m', status: 'HIGH', color: 'red' },
        { gate: 'Gate C', time: '12m', status: 'MEDIUM', color: 'amber' },
        { gate: 'Gate D', time: '6m', status: 'LOW', color: 'emerald' },
      ].map((item, i) => (
        <div key={i} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <Settings size={14} className="text-indigo-400" />
            </div>
            <span className="text-[11px] font-bold text-white">{item.gate}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className={`text-[11px] font-black text-${item.color}-400`}>{item.time}</span>
            <span className={`text-[9px] font-black text-${item.color}-400/60 uppercase`}>{item.status}</span>
            <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className={`text-${item.color}-400`}><TrendingUp size={12} /></motion.div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const VendorIntelligence = () => (
  <div className="widget-container p-6">
    <WidgetHeader title="Vendor Intelligence" sub="Food & Retail Live Status" icon={Utensils} color="indigo" />
    <div className="space-y-2">
      {[
        { shop: 'Food Court 1', time: '8m', status: 'LOW', color: 'emerald' },
        { shop: 'Food Court 2', time: '25m', status: 'HIGH', color: 'red' },
        { shop: 'Food Court 3', time: '12m', status: 'MEDIUM', color: 'amber' },
        { shop: 'Beverage Zone', time: '6m', status: 'LOW', color: 'emerald' },
      ].map((item, i) => (
        <div key={i} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
              <Utensils size={14} className="text-pink-400" />
            </div>
            <span className="text-[11px] font-bold text-white">{item.shop}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className={`text-[11px] font-black text-${item.color}-400`}>{item.time}</span>
            <span className={`text-[9px] font-black text-${item.color}-400/60 uppercase`}>{item.status}</span>
            <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className={`text-${item.color}-400`}><TrendingUp size={12} /></motion.div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SystemHealth = () => (
  <div className="widget-container p-6">
    <WidgetHeader title="System Health" sub="IoT & Infrastructure" icon={Activity} color="indigo" />
    <div className="space-y-4">
      {[
        { label: 'CCTV Cameras', value: '256/256', status: 'ONLINE', color: 'emerald', icon: Cctv },
        { label: 'IoT Sensors', value: '512/512', status: 'ONLINE', color: 'emerald', icon: Server },
        { label: 'Network Status', value: '100%', status: 'STABLE', color: 'emerald', icon: Network },
        { label: 'Power Systems', value: '100%', status: 'STABLE', color: 'emerald', icon: Zap },
      ].map((item, i) => (
        <div key={i} className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <item.icon size={14} className="text-slate-400" />
            <span className="text-[11px] font-bold text-slate-300">{item.label}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-black text-white">{item.value}</span>
            <span className={`text-[9px] font-black text-${item.color}-400 uppercase tracking-widest`}>{item.status}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CrowdFlowPrediction = () => (
  <div className="widget-container p-6">
    <WidgetHeader title="Crowd Flow Prediction" sub="Next 15 Minutes" icon={Eye} color="indigo" />
    <div className="flex justify-center items-center h-40 relative">
      {/* Mock Oval Track */}
      <div className="w-full h-full border-4 border-indigo-500/20 rounded-full flex justify-center items-center">
         <div className="w-[80%] h-[80%] border-4 border-indigo-500/10 rounded-full flex justify-center items-center">
            <div className="grid grid-cols-12 gap-1 w-full p-4">
               {Array.from({length: 24}).map((_, i) => (
                 <div key={i} className={twMerge("w-1.5 h-1.5 rounded-full", i % 5 === 0 ? 'bg-red-500' : i % 3 === 0 ? 'bg-amber-500' : 'bg-emerald-500')} />
               ))}
            </div>
         </div>
      </div>
      <div className="absolute top-1/2 left-2 -translate-y-1/2"><Route className="text-emerald-400" size={16} /></div>
      <div className="absolute top-1/2 right-2 -translate-y-1/2"><Route className="text-emerald-400 rotate-180" size={16} /></div>
    </div>
    <div className="mt-4 flex justify-between">
      <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500" /><span className="text-[9px] text-slate-400 font-bold">High Flow</span></div>
      <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500" /><span className="text-[9px] text-slate-400 font-bold">Medium Flow</span></div>
      <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-[9px] text-slate-400 font-bold">Low Flow</span></div>
      <div className="flex items-center gap-2"><Route size={10} className="text-slate-500" /><span className="text-[9px] text-slate-400 font-bold">Direction</span></div>
    </div>
  </div>
);

// --- Main Dashboard ---

export const Dashboard: React.FC = () => {
  const { isSidebarOpen } = useStore();

  return (
    <div className="min-h-screen space-y-6 transition-all duration-300 bg-dashboard-gradient pb-32">
      
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <MatchIntelligence />
        <TopPerformers />
        <BrainStatus />
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <ZoneDensity />
        <div className="lg:col-span-2 widget-container relative bg-transparent overflow-hidden">
           <Stadium3D />
           {/* Center UI Overlays */}
           <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
              {['3D', '2D', '45°', '90°'].map(btn => (
                <button key={btn} className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-black text-white hover:bg-white/20 transition-colors uppercase">{btn}</button>
              ))}
           </div>
           <div className="absolute bottom-6 left-6 grid grid-cols-4 gap-8 z-10">
              {[
                { label: 'GATES', value: '14', sub: 'OPERATIONAL' },
                { label: 'ZONES', value: '16', sub: 'ACTIVE' },
                { label: 'FACILITIES', value: '48', sub: 'MONITORED' },
                { label: 'CCTV CAMERAS', value: '256', sub: 'ONLINE' },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-[8px] text-slate-400 font-black tracking-widest mb-1 uppercase">{item.label}</p>
                  <p className="text-xl font-black text-white leading-none">{item.value}</p>
                  <p className="text-[7px] text-slate-500 font-bold uppercase tracking-tight mt-1">{item.sub}</p>
                </div>
              ))}
           </div>
        </div>
        <SurgeProtocols />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="flex flex-col gap-6 lg:col-span-1">
          <SmartRoutingHub />
          <VendorIntelligence />
        </div>
        <div className="lg:col-span-2">
          <CrowdFlowPrediction />
        </div>
        <SystemHealth />
      </div>

      {/* System Log Footer */}
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-[#05070a] border-t border-white/5 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-6">
          <span className="text-[9px] font-black text-indigo-500 tracking-widest uppercase">SYSTEM LOG</span>
          <div className="flex items-center gap-8 overflow-hidden whitespace-nowrap">
            {[
              { time: '22:04:31', text: 'Surge Protocol Activated - Gate B' },
              { time: '22:04:28', text: 'Crowd Flow Optimized - Zone B1' },
              { time: '22:04:25', text: 'Vendor Load Balanced - Food Court 2' },
              { time: '22:04:20', text: 'All Systems Operational' },
            ].map((log, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[9px] text-slate-500 font-mono">{log.time}</span>
                <span className="text-[9px] text-slate-400 font-medium">{log.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[9px] text-slate-500 font-black">APL OS v2.4.0</span>
        </div>
      </div>
    </div>
  );
};

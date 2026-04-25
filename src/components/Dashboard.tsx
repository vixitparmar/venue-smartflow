import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { ScorecardPanel } from './ScorecardPanel';
import { CrowdIntelligence } from './CrowdIntelligence';
import { PartnershipGraph, FOWTimeline } from './AnalyticsPanels';
import { LiveTicker } from './LiveTicker';
import { Stadium3D } from './Stadium3D';
import { useStore } from '../store';
import { LayoutGrid, Cpu, Activity, Box } from 'lucide-react';
import { useAudioAlerts } from '../hooks/useAudioAlerts';

export const Dashboard: React.FC = () => {
  const { agentLogs, liveScore, isSidebarOpen } = useStore();
  useAudioAlerts();

  return (
    <div className={twMerge(
      "min-h-screen p-6 md:p-10 space-y-12 pb-32 transition-all duration-300",
      isSidebarOpen ? "md:pl-[280px]" : "md:pl-[100px]"
    )}>
      {/* Top Banner */}
      <LiveTicker />

      {/* Hero Section: Live Match Intelligence */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Activity size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Match Intelligence Center</h2>
              <p className="text-sm text-slate-500 font-medium">Real-time stadium analytics & match performance</p>
            </div>
          </div>
          {liveScore?.status.includes('Fallback') && (
            <div className="px-5 py-2 bg-amber-50 border border-amber-100 rounded-2xl flex items-center gap-3 shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-700">Synthetic Fallback Active</span>
            </div>
          )}
        </div>
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-card overflow-hidden">
          <ScorecardPanel />
        </div>
      </section>

      {/* 3D Visualization Row */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200">
                <Box size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Spatial Topology</h2>
                <p className="text-sm text-slate-500 font-medium">3D Stadium Environment Mapping</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-card p-2 h-[440px] overflow-hidden">
            <Stadium3D />
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-card overflow-hidden flex-1">
             <FOWTimeline />
          </div>
          <div className="bg-indigo-600 rounded-[2rem] p-8 flex flex-col justify-center text-center shadow-lg shadow-indigo-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <h4 className="text-white font-black text-5xl mb-2 tracking-tight">98.5%</h4>
            <p className="text-indigo-100 text-xs uppercase font-bold tracking-widest opacity-80">Prediction Accuracy</p>
            <div className="mt-8 flex justify-center">
              <div className="w-20 h-20 rounded-full border-4 border-white/20 border-t-white animate-spin" />
            </div>
          </div>
        </div>
      </section>

      {/* Middle Section: Advanced Analytics */}
      <section>
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-card overflow-hidden">
          <PartnershipGraph />
        </div>
      </section>

      {/* Bottom Section: Crowd & AI Agent Operations */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200">
            <LayoutGrid size={24} />
          </div>
          <div>
             <h2 className="text-2xl font-bold tracking-tight text-slate-900">Stadium Operations Hub</h2>
             <p className="text-sm text-slate-500 font-medium">Autonomous crowd control & facility management</p>
          </div>
        </div>
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-card overflow-hidden">
          <CrowdIntelligence />
        </div>
      </section>
    </div>
  );
};

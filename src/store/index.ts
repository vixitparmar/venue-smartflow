import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SectorStatus = 'low' | 'medium' | 'high';

export interface Sector {
  id: string;
  name: string;
  density: number;
  status: SectorStatus;
}

export interface Gate {
  id: string;
  occupancy: number;
}

export interface AgentLog {
  id: string;
  message: string;
  timestamp: Date;
  type: 'action' | 'alert' | 'system';
}

export type MatchState = 'Live' | 'Innings Break' | 'Pre-Match' | 'Post-Match';

export interface PlayerBatting {
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  sr: number;
  isHighlight?: boolean;
}

export interface PlayerBowling {
  name: string;
  overs: number;
  runs: number;
  wickets: number;
  economy: number;
}

export interface Partnership {
  players: string;
  runs: number;
  balls: number;
  isHighest?: boolean;
}

export interface FallOfWicket {
  score: number;
  over: number;
  batsman: string;
  wickets: number;
}

export interface Vendor {
  id: string;
  name: string;
  waitTime: number;
  popularItems: string[];
  isRecommended: boolean;
}

export interface Facility {
  id: string;
  name: string;
  isAvailable: boolean;
}

export interface LiveMatchData {
  batTeam: string;
  bowlTeam: string;
  score: number;
  wickets: number;
  overs: number;
  crr: number;
  target?: number;
  battingStats: PlayerBatting[];
  bowlingStats: PlayerBowling[];
  partnerships: Partnership[];
  fallOfWickets: FallOfWicket[];
  status: string;
}

interface AppState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  matchState: MatchState;

  sectors: Sector[];
  gates: Gate[];
  vendors: Vendor[];
  facilities: Facility[];
  totalCrowd: number;
  avgWaitTime: number;

  agentLogs: AgentLog[];
  addAgentLog: (log: Omit<AgentLog, 'id' | 'timestamp'>) => void;
  clearAgentLogs: () => void;

  surgeProtocolActive: boolean;
  isSimulationRunning: boolean;
  autoMode: boolean;
  toggleAutoMode: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  liveScore: LiveMatchData | null;
  fetchLiveScore: () => Promise<void>;

  startSimulation: () => void;
  stopSimulation: () => void;

  lastKnownWickets: number;
  lastKnownScore: number;
}

export const DUMMY_MATCH_DATA: LiveMatchData = {
  batTeam: "Gujarat Titans",
  bowlTeam: "Mumbai Indians",
  score: 184,
  wickets: 4,
  overs: 18.2,
  crr: 10.04,
  target: 202,
  status: "Innings 1 • Synthetic Fallback Protocol Active",
  battingStats: [
    { name: "Shubman Gill", runs: 82, balls: 45, fours: 8, sixes: 3, sr: 182.2, isHighlight: true },
    { name: "Sai Sudharsan", runs: 41, balls: 30, fours: 4, sixes: 1, sr: 136.6 },
    { name: "David Miller", runs: 28, balls: 15, fours: 2, sixes: 2, sr: 186.6 },
    { name: "Vijay Shankar", runs: 12, balls: 8, fours: 1, sixes: 0, sr: 150.0 },
    { name: "Rahul Tewatia", runs: 5, balls: 4, fours: 0, sixes: 0, sr: 125.0 }
  ],
  bowlingStats: [
    { name: "Jasprit Bumrah", overs: 4, runs: 24, wickets: 2, economy: 6.0 },
    { name: "Gerald Coetzee", overs: 3.2, runs: 42, wickets: 1, economy: 12.6 },
    { name: "Piyush Chawla", overs: 4, runs: 35, wickets: 1, economy: 8.75 },
    { name: "Hardik Pandya", overs: 3, runs: 30, wickets: 0, economy: 10.0 },
    { name: "Luke Wood", overs: 4, runs: 48, wickets: 0, economy: 12.0 }
  ],
  partnerships: [
    { players: "S Gill & S Sudharsan", runs: 112, balls: 72, isHighest: true },
    { players: "D Miller & S Gill", runs: 45, balls: 24 }
  ],
  fallOfWickets: [
    { score: 32, over: 4.1, batsman: "Wriddhiman Saha", wickets: 1 },
    { score: 144, over: 16.2, batsman: "Sai Sudharsan", wickets: 2 },
    { score: 168, over: 17.5, batsman: "David Miller", wickets: 3 },
    { score: 180, over: 18.1, batsman: "Shubman Gill", wickets: 4 }
  ]
};

const generateMockSectors = (): Sector[] => {
  const zones = ['Gate A', 'Gate B', 'Gate C', 'Gate D'];
  return zones.map(name => ({
    id: name.toLowerCase().replace(' ', '-'),
    name,
    density: Math.floor(Math.random() * 60) + 20,
    status: 'low'
  }));
};

const generateMockGates = (): Gate[] => {
  return [1, 2, 3, 4].map(num => ({
    id: `gate-${num}`, occupancy: Math.floor(Math.random() * 50) + 20
  }));
};

const generateMockVendors = (): Vendor[] => {
  return [
    { id: 'v1', name: 'Cyber Crust Pizza', waitTime: 12, popularItems: ['Neon Paneer', 'Fire Crust'], isRecommended: true },
    { id: 'v2', name: 'Agent Burgers', waitTime: 25, popularItems: ['The AI Stack', 'ML Mayo'], isRecommended: false },
    { id: 'v3', name: 'Stadium Shakes', waitTime: 8, popularItems: ['Volt Vanilla', 'Circuit Choco'], isRecommended: true },
  ];
};

const generateMockFacilities = (): Facility[] => {
  return [
    { id: 'f1', name: 'Washroom A1 (Premium)', isAvailable: true },
    { id: 'f2', name: 'Washroom B2 (Standard)', isAvailable: false },
    { id: 'f3', name: 'Washroom C1', isAvailable: true },
  ];
};

let simInterval: number | null = null;

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      activeTab: 'dashboard',
      setActiveTab: (tab) => set({ activeTab: tab }),
      matchState: 'Live',
      sectors: generateMockSectors(),
      gates: generateMockGates(),
      vendors: generateMockVendors(),
      facilities: generateMockFacilities(),
      totalCrowd: 104000,
      avgWaitTime: 12,
      autoMode: true,
      toggleAutoMode: () => set(state => ({ autoMode: !state.autoMode })),
      isSidebarOpen: false,
      toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),

      agentLogs: [
        { id: 'init-1', message: 'IPL Intelligence System Online.', timestamp: new Date(), type: 'system' },
        { id: 'init-2', message: 'Gate A heatmap normalized.', timestamp: new Date(), type: 'action' }
      ],
      addAgentLog: (log) => set(state => ({
        agentLogs: [{ ...log, id: Math.random().toString(), timestamp: new Date() }, ...state.agentLogs].slice(0, 50)
      })),
      clearAgentLogs: () => set({ agentLogs: [] }),

      surgeProtocolActive: false,
      isSimulationRunning: false,
      liveScore: DUMMY_MATCH_DATA,
      lastKnownWickets: 4,
      lastKnownScore: 184,

      fetchLiveScore: async () => {
        const url = 'https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/151889/hscard';
        const options = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '48a4f81cd5msh842daa0a64175b7p1af1aejsn5e49afce27f3',
            'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
          }
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();

          if (data.scorecard && data.scorecard.length > 0) {
            const lastInnings = data.scorecard[data.scorecard.length - 1];

            // Map batting stats
            const battingStats: PlayerBatting[] = (lastInnings.batsman || []).filter((p: any) => p.runs > 0 || p.outdec === 'batting').slice(0, 5).map((p: any) => ({
              name: p.name,
              runs: p.runs,
              balls: p.balls,
              fours: p.fours,
              sixes: p.sixes,
              sr: parseFloat(p.strkrate) || 0,
              isHighlight: p.runs >= 50
            }));

            // Map bowling stats
            const bowlingStats: PlayerBowling[] = (lastInnings.bowler || []).filter((p: any) => parseFloat(p.overs) > 0).slice(0, 5).map((p: any) => ({
              name: p.name,
              overs: parseFloat(p.overs) || 0,
              runs: p.runs,
              wickets: p.wickets,
              economy: parseFloat(p.economy) || 0
            }));

            // Map partnerships
            const partnerships: Partnership[] = (lastInnings.partnership?.partnership || []).map((p: any, idx: number) => ({
              players: `${p.bat1nickname || p.bat1name} & ${p.bat2nickname || p.bat2name}`,
              runs: p.totalruns,
              balls: p.totalballs,
              isHighest: idx === 0 // Assuming the first one provided in the list might be the significant one or sorting later
            }));

            // Map Fall of Wickets
            const fallOfWickets: FallOfWicket[] = (lastInnings.fow?.fow || []).map((w: any, idx: number) => ({
              score: w.runs,
              over: w.overnbr,
              batsman: w.batsmanname,
              wickets: idx + 1
            }));

            set({
              liveScore: {
                batTeam: lastInnings.batteamsname || lastInnings.batteamname,
                bowlTeam: data.scorecard.length > 1 ? data.scorecard[data.scorecard.length - 2].batteamsname : 'OPP',
                score: lastInnings.score,
                wickets: lastInnings.wickets,
                overs: lastInnings.overs,
                crr: parseFloat(lastInnings.runrate) || 0,
                target: data.matchHeader?.target || 205, // Using a fallback or header
                battingStats,
                bowlingStats,
                partnerships,
                fallOfWickets,
                status: data.status
              }
            });
          }
        } catch (error) {
          console.error('Error fetching real-time match data:', error);
          get().addAgentLog({
            message: 'CRITICAL: Live API data stream interrupted. Initializing formal fallback protocol with high-fidelity simulation and synthetic datasets.',
            type: 'alert'
          });
          // Keep existing dummy/last data
        }
      },

      startSimulation: () => {
        if (simInterval) clearInterval(simInterval);
        set({ isSimulationRunning: true });

        simInterval = window.setInterval(async () => {
          const { fetchLiveScore } = get();
          await fetchLiveScore();

          set((state) => {
            const { liveScore, lastKnownWickets, lastKnownScore } = state;
            if (!liveScore) return state;

            let intensityFactor = 1.0;
            let eventLog: string | null = null;
            let alertType: 'alert' | 'action' = 'alert';

            if (liveScore.wickets > lastKnownWickets) {
              eventLog = `REAL-TIME ALERT: Wicket fall detected for ${liveScore.batTeam}. Stadium security increasing surveillance.`;
              alertType = 'alert';
              intensityFactor = 1.8;
            } else if (liveScore.score > lastKnownScore + 3) {
              eventLog = `CROWD ROAR: ${liveScore.batTeam} scores boundary. Audio sensors detecting peak volume!`;
              alertType = 'action';
              intensityFactor = 1.4;
            }

            const newSectors = state.sectors.map(s => {
              let extra = eventLog ? 15 : 0;
              let newDensity = Math.max(20, Math.min(100, s.density + (Math.random() * 10 - 5) + extra));
              return {
                ...s,
                density: newDensity,
                status: (newDensity < 40 ? 'low' : newDensity < 75 ? 'medium' : 'high') as SectorStatus
              };
            });

            const newLogs = [...state.agentLogs];
            if (eventLog) {
              newLogs.unshift({ id: Math.random().toString(), message: eventLog, type: alertType, timestamp: new Date() });
            }

            return {
              sectors: newSectors,
              totalCrowd: Math.floor(104000 + (Math.random() * 1000 - 500)),
              avgWaitTime: Math.max(5, Math.floor(12 * intensityFactor)),
              surgeProtocolActive: (liveScore.crr > 10) || (liveScore.wickets > lastKnownWickets),
              agentLogs: newLogs.slice(0, 50),
              lastKnownWickets: liveScore.wickets || lastKnownWickets,
              lastKnownScore: liveScore.score || lastKnownScore
            };
          });
        }, 5000);
      },
      stopSimulation: () => {
        if (simInterval) clearInterval(simInterval);
        set({ isSimulationRunning: false });
      }
    }),
    {
      name: 'apl-state',
      partialize: (state) => ({ 
        isSidebarOpen: state.isSidebarOpen, 
        activeTab: state.activeTab 
      }),
    }
  )
);

import React from 'react';
import { Zap, FileText, Globe } from 'lucide-react';
import { FactoryKPIs } from '../types/energy';

interface EnergyHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  kpis: FactoryKPIs;
  onOpenWorkOrder: () => void;
  onOpenDataset: () => void;
  lang: 'en' | 'hi';
  setLang: (lang: 'en' | 'hi') => void;
}

export const EnergyHeader: React.FC<EnergyHeaderProps> = ({
  activeTab,
  setActiveTab,
  kpis,
  onOpenWorkOrder,
  onOpenDataset,
  lang,
  setLang,
}) => {
  const navItems = [
    { id: 'pipeline', label: lang === 'hi' ? '5-Step Agent Loop' : '5-Step Agent Loop' },
    { id: 'factory-floor', label: lang === 'hi' ? 'Factory Floor Twin' : 'Factory Floor Twin' },
    { id: 'simulation', label: lang === 'hi' ? 'Live Anomaly Sandbox' : 'Live Anomaly Sandbox' },
    { id: 'wsjf-triage', label: lang === 'hi' ? 'WSJF Priority' : 'WSJF & Cost Triage' },
    { id: 'durability', label: lang === 'hi' ? 'Durability & Verification' : 'Durability & Verification' },
    { id: 'ai-engineer', label: lang === 'hi' ? 'AI Energy Engineer' : 'AI Energy Engineer' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b-[3px] border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark (Neobrutalist Black & Yellow) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 bg-[#FFE500] border-2 border-black shadow-[3px_3px_0px_0px_#000] flex items-center justify-center text-black font-black">
            <Zap className="w-6 h-6 fill-black" />
          </div>
          <button
            onClick={() => setActiveTab('pipeline')}
            className="text-left font-extrabold text-xl text-black tracking-tight hover:opacity-80 transition-opacity cursor-pointer flex items-baseline gap-1.5"
          >
            <span>VoltHive</span>
            <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 bg-black text-[#FFE500] border border-black shadow-[1.5px_1.5px_0px_0px_#000]">
              ENERGY AGENT
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Tactile Neo Tabs) */}
        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#FFE500] text-black border-2 border-black shadow-[3px_3px_0px_0px_#000] translate-x-[-1px] translate-y-[-1px]'
                    : 'bg-white text-neutral-800 border-2 border-transparent hover:border-black hover:bg-neutral-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Real-Time Waste Badge */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Active waste rate ticker (Hot Coral Punch) */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 bg-[#FF6B4A] text-black border-2 border-black shadow-[3px_3px_0px_0px_#000] text-xs font-mono font-black">
            <span className="w-2.5 h-2.5 bg-black border border-white" />
            <span className="uppercase tracking-wider">WASTE:</span>
            <span className="tabular-nums">-${kpis.costRateWastedDollarsPerHour.toFixed(2)}/HR</span>
          </div>

          <button
            onClick={onOpenDataset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-black bg-[#E0F2FE] border-2 border-black shadow-[2.5px_2.5px_0px_0px_#000] hover:bg-[#BAE6FD] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
            title="Inspect /public/dataset.json and README schema"
          >
            <span>DATASET & README</span>
          </button>

          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-bold text-black bg-white border-2 border-black shadow-[2.5px_2.5px_0px_0px_#000] hover:bg-neutral-100 active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
            title="Toggle Hindi/Hinglish & English"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'हिन्दी' : 'EN'}</span>
          </button>

          <button
            onClick={onOpenWorkOrder}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-black text-black bg-[#FFE500] border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-[#FFD700] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#000] cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>WORK ORDERS</span>
          </button>
        </div>
      </div>

      {/* Mobile sub-nav */}
      <div className="lg:hidden flex items-center gap-1.5 px-4 py-2.5 bg-[#FFFDF5] border-t-2 border-black overflow-x-auto no-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-3 py-1.5 text-xs whitespace-nowrap font-bold border-2 border-black ${
              activeTab === item.id
                ? 'bg-[#FFE500] text-black shadow-[2px_2px_0px_0px_#000]'
                : 'bg-white text-black'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};

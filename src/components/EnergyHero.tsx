import React from 'react';
import { FactoryKPIs } from '../types/energy';
import { 
  Zap, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  AlertOctagon,
  Sparkles,
  Layers,
  Search,
  Wrench,
  ShieldCheck
} from 'lucide-react';

interface EnergyHeroProps {
  kpis: FactoryKPIs;
  lang: 'en' | 'hi';
  onLaunchPipeline: () => void;
  onExploreFloor: () => void;
  onRunSimulation: () => void;
}

export const EnergyHero: React.FC<EnergyHeroProps> = ({
  kpis,
  lang,
  onLaunchPipeline,
  onExploreFloor,
  onRunSimulation,
}) => {
  return (
    <section className="relative pt-8 pb-12 border-b-[3px] border-black bg-[#FFFDF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Neobrutalist Sticker Kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFE500] border-2 border-black shadow-[3px_3px_0px_0px_#000] text-black text-xs font-mono font-black mb-6">
          <Zap className="w-4 h-4 fill-black" />
          <span>
            {lang === 'hi'
              ? 'FACTORY ENERGY WASTE DETECTION & DURABILITY ENGINE'
              : 'AUTONOMOUS INDUSTRIAL ENERGY REPAIR & DURABILITY ENGINE'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Problem & Solution in Bold Editorial Punch */}
          <div className="lg:col-span-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight leading-[1.1] text-balance">
              {lang === 'hi' ? (
                <>
                  Factory Energy Waste Ko Pakdo Aur Fix Karo:{' '}
                  <span className="bg-[#FFE500] px-2 py-0.5 border-2 border-black inline-block shadow-[3px_3px_0px_0px_#000] mt-1">
                    Detect Se Verified Durability Tak
                  </span>
                </>
              ) : (
                <>
                  Close the Gap Between Detecting Power Waste and{' '}
                  <span className="bg-[#FFE500] px-2 py-0.5 border-2 border-black inline-block shadow-[4px_4px_0px_0px_#000] mt-1">
                    Verifying It Has Actually Been Fixed
                  </span>
                </>
              )}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-neutral-800 font-medium leading-relaxed max-w-3xl">
              {lang === 'hi' ? (
                <>
                  Factory mein achanak power badhta hai toh koi nahi jaanta ki machine kharab hai, equipment bekaar chal raha hai, ya production badha hai. <strong>VoltHive ka 5-step AI Agent</strong> sub-meter telemetry aur production PLC ko correlate karta hai, root cause pakadta hai, aur <strong>48-hour post-maintenance durability window</strong> se verify karta hai ki consumption sach mein wapas baseline par aaya.
                </>
              ) : (
                <>
                  When factory power spikes, staff waste days guessing whether equipment is faulty, running idle, or if production increased. Our AI agent replaces manual meter inspections by correlating telemetry in minutes, dispatching targeted work orders, and <strong>measuring post-maintenance durability</strong> so waste never recurs.
                </>
              )}
            </p>

            {/* The 5-Step Agent Loop Strip (Neobrutalism Card Row) */}
            <div className="mt-8 p-5 bg-white border-[2.5px] border-black shadow-[5px_5px_0px_0px_#000]">
              <div className="text-xs font-mono font-black uppercase text-black mb-3 flex items-center justify-between">
                <span className="bg-black text-[#FFE500] px-2 py-0.5">THE 5-STEP CLOSED-LOOP PIPELINE</span>
                <span className="text-neutral-600 font-bold">100% Closed Loop</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
                <div className="p-2.5 bg-[#FFFDF5] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <div className="font-mono font-black text-black">1. DETECT</div>
                  <div className="text-[11px] text-neutral-700 font-medium mt-1">Sub-meter kW anomaly detection</div>
                </div>
                <div className="p-2.5 bg-[#E0F2FE] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <div className="font-mono font-black text-black">2. INVESTIGATE</div>
                  <div className="text-[11px] text-neutral-700 font-medium mt-1">Correlate PLC & vibration probes</div>
                </div>
                <div className="p-2.5 bg-[#F3E8FF] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <div className="font-mono font-black text-black">3. DIAGNOSE</div>
                  <div className="text-[11px] text-neutral-700 font-medium mt-1">Pinpoint component root cause</div>
                </div>
                <div className="p-2.5 bg-[#FEF08A] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <div className="font-mono font-black text-black">4. COORDINATE</div>
                  <div className="text-[11px] text-neutral-700 font-medium mt-1">Dispatch maintenance & parts</div>
                </div>
                <div className="p-2.5 bg-[#D1FAE5] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <div className="font-mono font-black text-black">5. VERIFY</div>
                  <div className="text-[11px] text-neutral-700 font-bold mt-1">48h durability stabilization</div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onLaunchPipeline}
                className="flex items-center gap-2 px-6 py-3 text-sm font-black text-black bg-[#FFE500] border-[2.5px] border-black shadow-[4px_4px_0px_0px_#000] hover:bg-[#FFDE00] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#000] transition-all cursor-pointer"
              >
                <span>{lang === 'hi' ? '5-Step Agent Loop Run Karein' : 'Step Through 5-Step Agent Loop'}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={onRunSimulation}
                className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-black bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-neutral-100 hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#000] transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>{lang === 'hi' ? 'Live Anomaly Sandbox' : 'Simulate Live Factory Spike'}</span>
              </button>

              <button
                onClick={onExploreFloor}
                className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-black bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-neutral-100 hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
              >
                <span>{lang === 'hi' ? 'Digital Twin Dekhein' : 'Inspect Factory Floor'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Plant Telemetry KPI Box */}
          <div className="lg:col-span-4 bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_#000] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-black">
              <span className="text-xs font-mono font-black uppercase text-black">
                PLANT TELEMETRY TWIN
              </span>
              <span className="px-2 py-0.5 bg-[#D1FAE5] text-black border border-black font-mono font-bold text-[10px] shadow-[1px_1px_0px_0px_#000]">
                6 SUB-METERS ACTIVE
              </span>
            </div>

            {/* Active Waste Alert Box (Hot Coral Neobrutalist Block) */}
            <div className="p-4 bg-[#FF6B4A] border-2 border-black shadow-[3px_3px_0px_0px_#000] text-black">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider">
                <AlertOctagon className="w-4 h-4 stroke-[2.5]" />
                <span>ACTIVE POWER BLEED DETECTED</span>
              </div>
              <div className="text-2xl font-black font-mono mt-1 tabular-nums">
                +{kpis.currentWasteRateKw.toFixed(1)} kW
              </div>
              <div className="text-xs font-mono font-bold mt-0.5">
                Cost Bleed: ${kpis.costRateWastedDollarsPerHour.toFixed(2)} / hour
              </div>
              <div className="text-[11px] font-medium mt-1">
                Compressor #3 & Chiller Beta bleeding power
              </div>
            </div>

            {/* 4 Metrics Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 bg-[#FFFDF5] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                <div className="text-[10px] font-mono font-bold text-neutral-600 uppercase">MTT-Detect</div>
                <div className="text-2xl font-black font-mono text-black tabular-nums">
                  {kpis.meanTimeToDetectMinutes}m
                </div>
                <div className="text-[10px] text-neutral-500 font-medium">vs 14-day bill surprise</div>
              </div>

              <div className="p-3 bg-[#D1FAE5] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                <div className="text-[10px] font-mono font-bold text-neutral-700 uppercase">Durability Rate</div>
                <div className="text-2xl font-black font-mono text-black tabular-nums">
                  {kpis.durabilityFixRate}%
                </div>
                <div className="text-[10px] text-neutral-600 font-medium">Permanent stabilization</div>
              </div>

              <div className="p-3 bg-[#E0F2FE] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                <div className="text-[10px] font-mono font-bold text-neutral-700 uppercase">MTT-Remediate</div>
                <div className="text-2xl font-black font-mono text-black tabular-nums">
                  {kpis.meanTimeToRemediateHours}h
                </div>
                <div className="text-[10px] text-neutral-600 font-medium">Targeted work orders</div>
              </div>

              <div className="p-3 bg-[#FFE500] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                <div className="text-[10px] font-mono font-bold text-neutral-800 uppercase">Monthly Saved</div>
                <div className="text-2xl font-black font-mono text-black tabular-nums">
                  ${(kpis.monthlySavingsRealizedDollars / 1000).toFixed(1)}k
                </div>
                <div className="text-[10px] text-neutral-700 font-medium">Recovered electricity</div>
              </div>
            </div>

            <div className="p-3 bg-neutral-100 border-2 border-black text-xs text-neutral-800 font-medium leading-relaxed">
              <strong>The Durability Difference:</strong> Traditional software stops when a work order is signed. VoltHive monitors the sub-meter for 48 hours to guarantee the leak is permanently dead.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

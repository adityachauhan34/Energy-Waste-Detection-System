import React, { useState } from 'react';
import { Sliders, Gauge, ArrowUpDown, ShieldAlert, CheckCircle2, DollarSign, Clock, Wrench } from 'lucide-react';

interface WsjfEnergyTriageProps {
  lang: 'en' | 'hi';
}

interface FactoryTask {
  id: string;
  machine: string;
  description: string;
  dailyWasteDollars: number;
  productionRisk: number;
  assetDamageRisk: number;
  jobSizeHours: number;
}

export const WsjfEnergyTriage: React.FC<WsjfEnergyTriageProps> = ({ lang }) => {
  const [dailyWasteDollars, setDailyWasteDollars] = useState<number>(170);
  const [productionRisk, setProductionRisk] = useState<number>(7);
  const [assetDamageRisk, setAssetDamageRisk] = useState<number>(8);
  const [jobSizeHours, setJobSizeHours] = useState<number>(1.5);

  const [queue, setQueue] = useState<FactoryTask[]>([
    {
      id: 'WO-884',
      machine: 'Rotary Screw Compressor #3',
      description: 'Air unloader valve ruptured, blowing 47 kW excess',
      dailyWasteDollars: 170.6,
      productionRisk: 7,
      assetDamageRisk: 8,
      jobSizeHours: 1.5,
    },
    {
      id: 'WO-885',
      machine: 'Water Chiller Beta',
      description: 'Condenser scaling causing 48 kW thermal head strain',
      dailyWasteDollars: 173.5,
      productionRisk: 6,
      assetDamageRisk: 7,
      jobSizeHours: 3.0,
    },
    {
      id: 'WO-886',
      machine: 'Conveyor Drive Loop 2',
      description: 'Photo-eye sensor misaligned, idling 18 kW empty',
      dailyWasteDollars: 65.5,
      productionRisk: 2,
      assetDamageRisk: 2,
      jobSizeHours: 0.8,
    },
    {
      id: 'WO-887',
      machine: 'Tempering Furnace Exhaust Blower',
      description: 'Belt slipping, 4 kW aerodynamic friction loss',
      dailyWasteDollars: 14.4,
      productionRisk: 3,
      assetDamageRisk: 4,
      jobSizeHours: 1.0,
    },
  ]);

  const financialScore = Math.min(10, Math.max(1, (dailyWasteDollars / 20)));
  const costOfDelay = financialScore + productionRisk + assetDamageRisk;
  const calculatedWsjf = (costOfDelay / Math.max(0.5, jobSizeHours)).toFixed(2);
  const numWsjf = parseFloat(calculatedWsjf);

  const getTaskWsjf = (task: FactoryTask) => {
    const finScore = Math.min(10, Math.max(1, (task.dailyWasteDollars / 20)));
    const cod = finScore + task.productionRisk + task.assetDamageRisk;
    return (cod / Math.max(0.5, task.jobSizeHours)).toFixed(2);
  };

  const sortedQueue = [...queue].sort((a, b) => parseFloat(getTaskWsjf(b)) - parseFloat(getTaskWsjf(a)));

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-block bg-[#FFE500] text-black border-2 border-black font-mono font-black text-xs px-2.5 py-0.5 shadow-[2px_2px_0px_0px_#000] uppercase">
            LAYER 02: MATHEMATICAL ENERGY TRIAGE
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-black mt-2">
            {lang === 'hi' ? 'WSJF Maintenance Prioritization' : 'WSJF Maintenance & Energy Triage Engine'}
          </h2>
          <p className="text-sm text-neutral-700 font-medium mt-1 max-w-2xl">
            {lang === 'hi'
              ? 'Maintenance crew limited hoti hai. WSJF formula = Cost of Delay / Job Size se decide karein ki kis machine ko pehle fix karna hai.'
              : 'Weighted Shortest Job First: Cost of Delay (Daily Energy Waste $ + Production Risk + Asset Damage) divided by Maintenance Job Size (Hours).'}
          </p>
        </div>

        <div className="bg-[#FFE500] border-2 border-black shadow-[3px_3px_0px_0px_#000] px-4 py-2 text-right">
          <div className="text-[10px] font-mono font-black text-black">PRIORITY FORMULA</div>
          <div className="text-xs font-mono text-black font-black">
            WSJF = (Cost of Delay) / Job Size
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Custom Sliders in Neobrutalist Container */}
        <div className="lg:col-span-6 bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_#000] p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b-2 border-black">
            <h3 className="text-base font-black text-black flex items-center gap-2">
              <Sliders className="w-4 h-4 stroke-[2.5]" />
              <span>Simulate Incident Priority Score</span>
            </h3>
            <span className="px-2 py-0.5 bg-black text-[#FFE500] text-xs font-mono font-bold">
              REAL-TIME SCORING
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-neutral-900 font-bold">Daily Energy Waste Bleed</span>
                <span className="font-mono text-black font-black bg-[#FFE500] px-1.5 border border-black">${dailyWasteDollars.toFixed(0)}/day (${(dailyWasteDollars * 30).toLocaleString()}/mo)</span>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                step="5"
                value={dailyWasteDollars}
                onChange={(e) => setDailyWasteDollars(parseFloat(e.target.value))}
                className="w-full accent-black bg-neutral-200 rounded-none h-2 cursor-pointer border border-black"
              />
              <div className="text-[11px] font-medium text-neutral-600 mt-0.5">Calculated from sub-meter active kW anomaly × tariff.</div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-neutral-900 font-bold">Production Downtime Risk</span>
                <span className="font-mono text-black font-black bg-[#E0F2FE] px-1.5 border border-black">{productionRisk} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={productionRisk}
                onChange={(e) => setProductionRisk(parseInt(e.target.value, 10))}
                className="w-full accent-black bg-neutral-200 rounded-none h-2 cursor-pointer border border-black"
              />
              <div className="text-[11px] font-medium text-neutral-600 mt-0.5">Probability that this fault halts the assembly line.</div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-neutral-900 font-bold">Asset Damage Risk</span>
                <span className="font-mono text-black font-black bg-[#FEE2E2] px-1.5 border border-black">{assetDamageRisk} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={assetDamageRisk}
                onChange={(e) => setAssetDamageRisk(parseInt(e.target.value, 10))}
                className="w-full accent-black bg-neutral-200 rounded-none h-2 cursor-pointer border border-black"
              />
              <div className="text-[11px] font-medium text-neutral-600 mt-0.5">Risk of bearing seizure, motor winding burnout.</div>
            </div>

            <div className="pt-2 border-t-2 border-black">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-neutral-900 font-bold">Maintenance Job Size (Hours)</span>
                <span className="font-mono text-black font-black bg-[#D1FAE5] px-1.5 border border-black">{jobSizeHours} hours</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="8.0"
                step="0.5"
                value={jobSizeHours}
                onChange={(e) => setJobSizeHours(parseFloat(e.target.value))}
                className="w-full accent-black bg-neutral-200 rounded-none h-2 cursor-pointer border border-black"
              />
              <div className="text-[11px] font-medium text-neutral-600 mt-0.5">Smaller interventions score higher to eliminate fast waste immediately.</div>
            </div>
          </div>

          {/* Computed Score Box (Electric Yellow Neo Block) */}
          <div className="p-5 bg-[#FFE500] border-2 border-black shadow-[4px_4px_0px_0px_#000] flex items-center justify-between text-black">
            <div>
              <div className="text-xs font-mono font-black uppercase">CALCULATED WSJF SCORE</div>
              <div className="text-4xl font-black font-mono tabular-nums">
                {calculatedWsjf}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono font-black uppercase">DISPATCH STATUS</div>
              <div className="text-sm font-black bg-black text-white px-2 py-0.5 mt-1 border border-black">
                {numWsjf > 10 ? 'P0 - EMERGENCY' : numWsjf > 5 ? 'P1 - HIGH PRIORITY' : 'P2 - ROUTINE'}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Dynamic Factory Work Order Queue */}
        <div className="lg:col-span-6 bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_#000] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b-2 border-black">
            <div>
              <h3 className="text-base font-black text-black flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 stroke-[2.5]" />
                <span>Active Work Order Queue (Ranked by WSJF)</span>
              </h3>
              <div className="text-xs font-medium text-neutral-600 mt-0.5">Technicians dispatch in this order to maximize ROI</div>
            </div>
            <span className="px-2 py-0.5 bg-neutral-100 border border-black text-xs font-mono font-bold">{sortedQueue.length} jobs</span>
          </div>

          <div className="space-y-3">
            {sortedQueue.map((task, idx) => {
              const taskWsjf = getTaskWsjf(task);
              const isFirst = idx === 0;

              return (
                <div
                  key={task.id}
                  className={`p-4 border-2 border-black transition-all ${
                    isFirst
                      ? 'bg-[#FEF08A] shadow-[4px_4px_0px_0px_#000] translate-x-[-1px] translate-y-[-1px]'
                      : 'bg-white shadow-[2px_2px_0px_0px_#000]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-black bg-black text-white px-1.5 py-0.2">
                          #{idx + 1}
                        </span>
                        <span className="text-sm font-black text-black">{task.machine}</span>
                      </div>
                      <div className="text-xs text-neutral-800 font-medium mt-1">{task.description}</div>
                      <div className="text-[11px] font-mono font-bold text-neutral-700 mt-1.5 flex items-center gap-2">
                        <span className="bg-[#FFE500] px-1 border border-black">${task.dailyWasteDollars.toFixed(0)}/day waste</span>
                        <span>·</span>
                        <span>{task.jobSizeHours}h fix</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-[10px] font-mono font-bold text-neutral-600">WSJF</div>
                      <div className="text-2xl font-black font-mono tabular-nums text-black">
                        {taskWsjf}
                      </div>
                    </div>
                  </div>

                  {isFirst && (
                    <div className="mt-3 pt-2 border-t border-black flex items-center justify-between text-[11px] font-bold">
                      <span className="text-black flex items-center gap-1 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                        Next Technician Dispatched Here
                      </span>
                      <span className="text-neutral-700">Saves $170/day in 1.5h</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-neutral-100 border-2 border-black text-xs text-neutral-800 font-medium leading-relaxed">
            <strong>Why This Matters:</strong> Without WSJF, technicians often spend 4 hours fixing small convenience issues while a $5,000/month air compressor leak continues wasting money unnoticed.
          </div>
        </div>
      </div>
    </section>
  );
};

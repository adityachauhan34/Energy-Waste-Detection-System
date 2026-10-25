import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  Wrench, 
  ShieldCheck, 
  TrendingDown, 
  DollarSign,
  Clock,
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface LiveAnomalySimulatorProps {
  lang: 'en' | 'hi';
}

export const LiveAnomalySimulator: React.FC<LiveAnomalySimulatorProps> = ({ lang }) => {
  const [selectedScenario, setSelectedScenario] = useState<'compressor' | 'chiller' | 'conveyor'>('compressor');
  const [phase, setPhase] = useState<'NORMAL' | 'SPIKE_ACTIVE' | 'INVESTIGATING' | 'DISPATCHED' | 'VERIFYING_DURABLE'>('SPIKE_ACTIVE');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Scenarios data
  const scenarios = {
    compressor: {
      title: 'Rotary Screw Compressor #3 (Air Leak & Unloader Failure)',
      baselineKw: 45.0,
      faultKw: 92.4,
      costPerHour: 7.11,
      rootCause: 'Ruptured solenoid unloader valve preventing standby idle cycling.',
      fix: 'Replaced unloader diaphragm & torqued Header Flange #4.',
      parts: 'Unloader Kit CMP-UK-03',
    },
    chiller: {
      title: 'Water Chiller Beta (Condenser Bio-Fouling & High Head Pressure)',
      baselineKw: 88.0,
      faultKw: 136.2,
      costPerHour: 7.23,
      rootCause: 'Chemical dosing pump dried up; calcium scaling on condenser tubes.',
      fix: 'Acid flushed condenser tubes & replenished biocide tank.',
      parts: 'Scale-Away Eco-Flush',
    },
    conveyor: {
      title: 'Packaging Line Conveyor Drive (Idling During Shift Breaks)',
      baselineKw: 0.0,
      faultKw: 18.2,
      costPerHour: 2.73,
      rootCause: 'Photo-eye sensor misaligned; conveyor runs empty 6h per day.',
      fix: 'Re-aligned optical sensor and enabled PLC 3-minute idle sleep timer.',
      parts: 'Optical Sensor Bracket',
    },
  };

  const currentScen = scenarios[selectedScenario];

  const handleInjectFault = () => {
    setPhase('SPIKE_ACTIVE');
  };

  const handleInvestigate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setPhase('INVESTIGATING');
      setIsProcessing(false);
    }, 1000);
  };

  const handleDispatch = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setPhase('DISPATCHED');
      setIsProcessing(false);
    }, 1200);
  };

  const handleVerifyDurability = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setPhase('VERIFYING_DURABLE');
      setIsProcessing(false);
    }, 1400);
  };

  const handleReset = () => {
    setPhase('NORMAL');
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-block bg-[#FFE500] text-black border-2 border-black font-mono font-black text-xs px-2.5 py-0.5 shadow-[2px_2px_0px_0px_#000] uppercase">
            INTERACTIVE ANOMALY SANDBOX
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-black mt-2">
            {lang === 'hi' ? 'Live Telemetry & Anomaly Sandbox' : 'Live Energy Spike & Durability Sandbox'}
          </h2>
          <p className="text-sm text-neutral-700 font-medium mt-1 max-w-2xl">
            {lang === 'hi'
              ? 'Fault inject karein, AI agent dwara anomaly detection dekhein, aur verify karein ki fix permanent raha.'
              : 'Test how the agent detects electrical anomalies, correlates sensor signals, coordinates maintenance, and locks in post-repair durability.'}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-black bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-neutral-100 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Normal Baseline</span>
        </button>
      </div>

      {/* Scenario Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-6">
        {(['compressor', 'chiller', 'conveyor'] as const).map((sKey) => {
          const isSelected = selectedScenario === sKey;
          return (
            <button
              key={sKey}
              onClick={() => {
                setSelectedScenario(sKey);
                setPhase('SPIKE_ACTIVE');
              }}
              className={`px-4 py-2.5 text-xs font-black border-2 border-black transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#FFE500] text-black shadow-[4px_4px_0px_0px_#000] translate-x-[-1px] translate-y-[-1px]'
                  : 'bg-white text-black shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-50'
              }`}
            >
              {scenarios[sKey].title.split('(')[0]}
            </button>
          );
        })}
      </div>

      {/* Playground Card (Solid White, Thick Black Border, Hard Shadow) */}
      <div className="bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_#000] p-6 sm:p-8 space-y-6">
        {/* State Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-black">
          <div>
            <div className="text-xs font-mono font-bold text-neutral-600 uppercase">TARGET MACHINE FAULT</div>
            <h3 className="text-lg sm:text-xl font-black text-black mt-0.5">
              {currentScen.title}
            </h3>
          </div>

          <span
            className={`px-3 py-1 font-mono text-xs font-black border-2 border-black shadow-[2px_2px_0px_0px_#000] ${
              phase === 'NORMAL'
                ? 'bg-[#D1FAE5] text-black'
                : phase === 'SPIKE_ACTIVE'
                ? 'bg-[#FF6B4A] text-black animate-pulse'
                : phase === 'INVESTIGATING'
                ? 'bg-[#E0F2FE] text-black'
                : phase === 'DISPATCHED'
                ? 'bg-[#FFE500] text-black'
                : 'bg-[#D1FAE5] text-black'
            }`}
          >
            PHASE: {phase.replace('_', ' ')}
          </span>
        </div>

        {/* Live Power Graph */}
        <div className="p-4 bg-neutral-50 border-2 border-black shadow-[3px_3px_0px_0px_#000] space-y-3">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-black">
            <span>SUB-METER POWER PROFILE (kW DEMAND)</span>
            <span className="tabular-nums font-black bg-white px-2 py-0.5 border border-black">
              Current: {phase === 'NORMAL' || phase === 'VERIFYING_DURABLE' ? currentScen.baselineKw : currentScen.faultKw} kW
            </span>
          </div>

          <div className="h-32 flex items-end gap-1.5 pt-4 border-b-2 border-black">
            {phase === 'NORMAL'
              ? [40, 42, 41, 40, 41, 40, 41, 40, 41, 40, 41, 40].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      style={{ height: `${(h / 100) * 100}%` }}
                      className="w-full border border-black bg-[#10B981] transition-all duration-300"
                    />
                  </div>
                ))
              : phase === 'SPIKE_ACTIVE' || phase === 'INVESTIGATING'
              ? [40, 42, 41, 88, 92, 94, 91, 93, 94, 92, 93, 94].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      style={{ height: `${(h / 100) * 100}%` }}
                      className={`w-full border border-black transition-all duration-300 ${
                        h > 50 ? 'bg-[#FF6B4A]' : 'bg-[#FFE500]'
                      }`}
                    />
                  </div>
                ))
              : phase === 'DISPATCHED'
              ? [40, 42, 88, 92, 94, 91, 75, 62, 50, 46, 45, 45].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      style={{ height: `${(h / 100) * 100}%` }}
                      className={`w-full border border-black transition-all duration-300 ${
                        h > 70 ? 'bg-[#FF6B4A]' : h > 48 ? 'bg-[#FFE500]' : 'bg-[#10B981]'
                      }`}
                    />
                  </div>
                ))
              : [40, 92, 94, 88, 50, 45, 45.1, 45.0, 45.0, 45.2, 45.0, 45.0].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      style={{ height: `${(h / 100) * 100}%` }}
                      className={`w-full border border-black transition-all duration-300 ${
                        i < 4 ? 'bg-[#FF6B4A]/60' : 'bg-[#10B981]'
                      }`}
                    />
                  </div>
                ))}
          </div>

          <div className="flex justify-between text-[10px] font-mono font-bold text-neutral-600 pt-1">
            <span>T - 1h (Before detection)</span>
            <span>T - Intervention (Agent + Tech)</span>
            <span>T + 48h (Durability locked)</span>
          </div>
        </div>

        {/* Action Controls Stepper (4 Neobrutalist Block Buttons) */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          <button
            onClick={handleInjectFault}
            className={`p-3.5 border-2 border-black text-left cursor-pointer transition-all ${
              phase === 'SPIKE_ACTIVE'
                ? 'bg-[#FF6B4A] text-black font-black shadow-[4px_4px_0px_0px_#000] translate-x-[-1px] translate-y-[-1px]'
                : 'bg-white text-black shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-50'
            }`}
          >
            <div className="text-xs font-black uppercase mb-0.5">1. Inject Fault Spike</div>
            <div className="text-[11px] font-mono text-neutral-700">Power draws {currentScen.faultKw} kW</div>
          </button>

          <button
            onClick={handleInvestigate}
            disabled={isProcessing}
            className={`p-3.5 border-2 border-black text-left cursor-pointer transition-all ${
              phase === 'INVESTIGATING'
                ? 'bg-[#E0F2FE] text-black font-black shadow-[4px_4px_0px_0px_#000] translate-x-[-1px] translate-y-[-1px]'
                : 'bg-white text-black shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-50'
            }`}
          >
            <div className="text-xs font-black uppercase mb-0.5">2. Run AI Diagnostic</div>
            <div className="text-[11px] font-mono text-neutral-700">Rules out production surge</div>
          </button>

          <button
            onClick={handleDispatch}
            disabled={isProcessing}
            className={`p-3.5 border-2 border-black text-left cursor-pointer transition-all ${
              phase === 'DISPATCHED'
                ? 'bg-[#FFE500] text-black font-black shadow-[4px_4px_0px_0px_#000] translate-x-[-1px] translate-y-[-1px]'
                : 'bg-white text-black shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-50'
            }`}
          >
            <div className="text-xs font-black uppercase mb-0.5">3. Dispatch Technician</div>
            <div className="text-[11px] font-mono text-neutral-700">Execute repair with parts</div>
          </button>

          <button
            onClick={handleVerifyDurability}
            disabled={isProcessing}
            className={`p-3.5 border-2 border-black text-left cursor-pointer transition-all ${
              phase === 'VERIFYING_DURABLE'
                ? 'bg-[#D1FAE5] text-black font-black shadow-[4px_4px_0px_0px_#000] translate-x-[-1px] translate-y-[-1px]'
                : 'bg-white text-black shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-50'
            }`}
          >
            <div className="text-xs font-black uppercase mb-0.5">4. Lock Durability</div>
            <div className="text-[11px] font-mono text-neutral-700">Confirm zero recurrence</div>
          </button>
        </div>

        {/* Phase Narrative Box */}
        <div className="p-4 border-2 border-black shadow-[3px_3px_0px_0px_#000]">
          {phase === 'SPIKE_ACTIVE' && (
            <div className="text-xs text-black font-medium leading-relaxed bg-[#FEE2E2] p-3 border border-black">
              <strong className="font-black uppercase mr-1">Alert Triggered:</strong> Power draw surged from {currentScen.baselineKw} kW to {currentScen.faultKw} kW. Bleeding <strong>${currentScen.costPerHour.toFixed(2)}/hour</strong> in wasted power. Click "Run AI Diagnostic" to correlate with production and vibration sensors.
            </div>
          )}
          {phase === 'INVESTIGATING' && (
            <div className="text-xs text-black font-medium leading-relaxed bg-[#E0F2FE] p-3 border border-black">
              <strong className="font-black uppercase mr-1">AI Diagnostic Completed:</strong> Production line PLC confirms factory output is flat. Vibration and thermal sensors confirm mechanical failure. Diagnosed: <em>{currentScen.rootCause}</em>. Click "Dispatch Technician".
            </div>
          )}
          {phase === 'DISPATCHED' && (
            <div className="text-xs text-black font-medium leading-relaxed bg-[#FEF08A] p-3 border border-black">
              <strong className="font-black uppercase mr-1">Maintenance In Progress:</strong> Technician executed: <em>{currentScen.fix}</em>. Power draw is dropping back down. Now click "Lock Durability" to ensure it stays down permanently.
            </div>
          )}
          {phase === 'VERIFYING_DURABLE' && (
            <div className="text-xs text-black font-medium leading-relaxed bg-[#D1FAE5] p-3 border border-black flex items-center justify-between">
              <div>
                <strong className="font-black uppercase mr-1">Durability Verified!</strong> Power stabilized to {currentScen.baselineKw} kW nominal target across the 48-hour monitoring window. Zero recurrence detected. Total saved: <strong>${(currentScen.costPerHour * 720).toFixed(0)}/month</strong>.
              </div>
              <CheckCircle2 className="w-5 h-5 text-black stroke-[3] shrink-0 ml-3" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { FactoryMachine } from '../types/energy';
import { Activity, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';

interface FactoryFloorViewProps {
  machines: FactoryMachine[];
  onSelectMachine: (machine: FactoryMachine) => void;
  onLaunchPipelineForMachine?: (machine: FactoryMachine) => void;
  lang: 'en' | 'hi';
}

export const FactoryFloorView: React.FC<FactoryFloorViewProps> = ({
  machines,
  onSelectMachine,
  onLaunchPipelineForMachine,
  lang,
}) => {
  const [selectedMachineId, setSelectedMachineId] = useState<string>(machines[0].id);

  const selectedMachine = machines.find((m) => m.id === selectedMachineId) || machines[0];
  const excessKw = Math.max(0, selectedMachine.currentPowerKw - selectedMachine.baselineKw);

  const getStatusBadge = (status: FactoryMachine['status']) => {
    switch (status) {
      case 'ANOMALY_DETECTED':
        return (
          <span className="px-2 py-0.5 bg-[#FF6B4A] text-black border border-black font-mono font-black text-[10px] shadow-[1.5px_1.5px_0px_0px_#000]">
            ANOMALY DETECTED
          </span>
        );
      case 'MAINTENANCE_IN_PROGRESS':
        return (
          <span className="px-2 py-0.5 bg-[#FFE500] text-black border border-black font-mono font-black text-[10px] shadow-[1.5px_1.5px_0px_0px_#000]">
            MAINTENANCE ACTIVE
          </span>
        );
      case 'VERIFYING_DURABILITY':
        return (
          <span className="px-2 py-0.5 bg-[#E0F2FE] text-black border border-black font-mono font-black text-[10px] shadow-[1.5px_1.5px_0px_0px_#000]">
            VERIFYING DURABILITY
          </span>
        );
      case 'OPTIMAL':
      default:
        return (
          <span className="px-2 py-0.5 bg-[#D1FAE5] text-black border border-black font-mono font-black text-[10px] shadow-[1.5px_1.5px_0px_0px_#000]">
            OPTIMAL
          </span>
        );
    }
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-block bg-[#FFE500] text-black border-2 border-black font-mono font-black text-xs px-2.5 py-0.5 shadow-[2px_2px_0px_0px_#000] uppercase">
            INDUSTRIAL IOT DIGITAL TWIN
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-black mt-2">
            {lang === 'hi' ? 'Factory Sub-Meter Digital Twin' : 'Factory Sub-Meter Telemetry Twin'}
          </h2>
          <p className="text-sm text-neutral-700 font-medium mt-1">
            {lang === 'hi'
              ? 'Real-time power consumption, baseline deviation, aur machine-level sensors.'
              : 'Continuous sub-meter monitoring across utility bays, production lines, and high-voltage feeders.'}
          </p>
        </div>

        <div className="text-xs font-mono font-bold text-black bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] px-3 py-1.5 flex items-center gap-2">
          <Activity className="w-3.5 h-3.5" />
          <span>POLLING RATE: 1,000MS</span>
        </div>
      </div>

      {/* Grid: Left Machine Cards, Right Detailed Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Machine Cards List */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-mono font-black text-black uppercase flex items-center justify-between px-1">
            <span>PLANT ASSET DIRECTORY (6 SUB-METERS)</span>
            <span className="text-neutral-600">CLICK TO INSPECT</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {machines.map((mac) => {
              const isSelected = selectedMachine.id === mac.id;
              const hasAnomaly = mac.status === 'ANOMALY_DETECTED';
              const deviationPercent = (
                ((mac.currentPowerKw - mac.baselineKw) / mac.baselineKw) *
                100
              ).toFixed(0);

              return (
                <button
                  key={mac.id}
                  onClick={() => {
                    setSelectedMachineId(mac.id);
                    onSelectMachine(mac);
                  }}
                  className={`p-4 border-[2.5px] border-black text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#FFE500] shadow-[5px_5px_0px_0px_#000] translate-x-[-1px] translate-y-[-1px]'
                      : hasAnomaly
                      ? 'bg-[#FFF1F2] shadow-[3px_3px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000]'
                      : 'bg-white shadow-[3px_3px_0px_0px_#000] hover:bg-neutral-50 hover:shadow-[4px_4px_0px_0px_#000]'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono font-black bg-black text-white px-1.5 py-0.5">
                        {mac.tag}
                      </span>
                      {getStatusBadge(mac.status)}
                    </div>
                    <div className="text-sm font-black text-black line-clamp-1">{mac.name}</div>
                    <div className="text-[11px] font-medium text-neutral-700 mt-0.5">{mac.location}</div>
                  </div>

                  <div className="mt-4 pt-3 border-t-2 border-black flex items-end justify-between">
                    <div>
                      <div className="text-[10px] font-mono font-bold text-neutral-600">ACTIVE DEMAND</div>
                      <div className="text-xl font-black font-mono text-black tabular-nums">
                        {mac.currentPowerKw.toFixed(1)} kW
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] font-mono font-bold text-neutral-600">BASELINE</div>
                      <div className="text-xs font-mono font-bold text-black tabular-nums">
                        {mac.baselineKw.toFixed(1)} kW{' '}
                        {hasAnomaly && (
                          <span className="bg-[#FF6B4A] px-1 text-black font-black">
                            (+{deviationPercent}%)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Machine Telemetry Box */}
        <div className="lg:col-span-5 bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_#000] p-6 space-y-5">
          <div className="flex items-start justify-between gap-3 pb-3 border-b-2 border-black">
            <div>
              <span className="px-2 py-0.5 bg-black text-[#FFE500] font-mono font-black text-xs">
                {selectedMachine.tag}
              </span>
              <h3 className="text-lg font-black text-black mt-1.5">{selectedMachine.name}</h3>
              <div className="text-xs font-medium text-neutral-600">{selectedMachine.category} · {selectedMachine.location}</div>
            </div>
            {getStatusBadge(selectedMachine.status)}
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#FFFDF5] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <div className="text-neutral-600 font-mono font-bold uppercase">Active Power</div>
              <div className="text-2xl font-black font-mono text-black mt-1 tabular-nums">
                {selectedMachine.currentPowerKw.toFixed(1)} kW
              </div>
              <div className="text-[10px] font-mono text-neutral-500 font-bold mt-0.5">Base: {selectedMachine.baselineKw.toFixed(1)} kW</div>
            </div>

            <div className="p-3 bg-[#E0F2FE] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <div className="text-neutral-700 font-mono font-bold uppercase">Power Factor (cos φ)</div>
              <div className="text-2xl font-black font-mono text-black mt-1 tabular-nums">
                {selectedMachine.powerFactor}
              </div>
              <div className="text-[10px] text-neutral-600 font-medium mt-0.5">Efficiency factor</div>
            </div>

            <div className="p-3 bg-[#FFE500] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <div className="text-neutral-800 font-mono font-bold uppercase">Daily Run Cost</div>
              <div className="text-2xl font-black font-mono text-black mt-1 tabular-nums">
                ${selectedMachine.dailyCost.toFixed(2)}
              </div>
              <div className="text-[10px] text-neutral-700 font-medium mt-0.5">24h duty cycle</div>
            </div>

            <div className="p-3 bg-[#FEE2E2] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <div className="text-neutral-800 font-mono font-bold uppercase">Excess Waste</div>
              <div className="text-2xl font-black font-mono text-black mt-1 tabular-nums">
                +{excessKw.toFixed(1)} kW
              </div>
              <div className="text-[10px] font-mono font-bold text-black mt-0.5">
                {excessKw > 0 ? `-$${(excessKw * 0.15).toFixed(2)}/hr bleeding` : 'Zero waste'}
              </div>
            </div>
          </div>

          {/* Electrical Waveform */}
          <div className="p-4 bg-neutral-50 border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-black">
              <span>SUB-METER POWER DEMAND (24H ROLLING)</span>
              <span className={`px-2 py-0.5 border border-black ${excessKw > 0 ? 'bg-[#FF6B4A]' : 'bg-[#D1FAE5]'}`}>
                {excessKw > 0 ? 'DEVIATION DETECTED' : 'NOMINAL'}
              </span>
            </div>
            <div className="h-24 flex items-end gap-1.5 pt-4 border-b-2 border-black">
              {excessKw > 0
                ? [45, 46, 45, 48, 52, 70, 88, 92, 94, 92, 93, 92].map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div
                        style={{ height: `${(v / 95) * 100}%` }}
                        className={`w-full border border-black transition-all ${
                          v > 50 ? 'bg-[#FF6B4A]' : 'bg-[#FFE500]'
                        }`}
                      />
                    </div>
                  ))
                : [45, 44, 45, 46, 45, 44, 45, 45, 46, 45, 45, 45].map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div
                        style={{ height: `${(v / 50) * 100}%` }}
                        className="w-full border border-black bg-[#10B981]"
                      />
                    </div>
                  ))}
            </div>
            <div className="flex justify-between text-[10px] font-mono font-bold text-neutral-600 pt-1">
              <span>00:00 (Midnight shift)</span>
              <span>12:00 (Peak day load)</span>
            </div>
          </div>

          {excessKw > 0 && (
            <div className="p-4 bg-[#FF6B4A] border-2 border-black shadow-[3px_3px_0px_0px_#000] text-black space-y-3">
              <div className="text-xs font-medium">
                <strong className="font-black uppercase mr-1">Agent Alert:</strong> Machine is consuming <strong>+{excessKw.toFixed(1)} kW</strong> beyond expected duty cycle while factory output remains steady.
              </div>
              {onLaunchPipelineForMachine && (
                <button
                  onClick={() => onLaunchPipelineForMachine(selectedMachine)}
                  className="w-full py-2.5 px-3 bg-[#FFE500] hover:bg-[#FFD700] text-black font-black text-xs border-2 border-black shadow-[2.5px_2.5px_0px_0px_#000] flex items-center justify-center gap-2 cursor-pointer transition-all active:translate-x-[2px] active:translate-y-[2px]"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>OPEN IN 5-STEP CLOSED-LOOP PIPELINE</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

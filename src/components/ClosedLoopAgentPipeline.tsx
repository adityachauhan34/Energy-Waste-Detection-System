import React, { useState } from 'react';
import { EnergyIncident } from '../types/energy';
import { 
  Zap, 
  Search, 
  Cpu, 
  Wrench, 
  ShieldCheck, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingDown, 
  Clock, 
  DollarSign, 
  Layers, 
  Thermometer, 
  Gauge, 
  RotateCcw,
  UserCheck
} from 'lucide-react';

interface ClosedLoopAgentPipelineProps {
  incident: EnergyIncident;
  onUpdateIncident: (updated: EnergyIncident) => void;
  lang: 'en' | 'hi';
}

export const ClosedLoopAgentPipeline: React.FC<ClosedLoopAgentPipelineProps> = ({
  incident,
  onUpdateIncident,
  lang,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const steps = [
    { num: 1, id: 'detect', title: '1. Detect', subtitle: 'Unusual Power Surge', icon: Zap, activeBg: 'bg-[#FFE500]' },
    { num: 2, id: 'investigate', title: '2. Investigate', subtitle: 'Sensor Correlation', icon: Search, activeBg: 'bg-[#E0F2FE]' },
    { num: 3, id: 'diagnose', title: '3. Identify Cause', subtitle: 'AI Root Cause', icon: Cpu, activeBg: 'bg-[#F3E8FF]' },
    { num: 4, id: 'coordinate', title: '4. Coordinate', subtitle: 'Maintenance Dispatch', icon: Wrench, activeBg: 'bg-[#FEF08A]' },
    { num: 5, id: 'verify', title: '5. Verify Resolution', subtitle: 'Post-Fix Durability', icon: ShieldCheck, activeBg: 'bg-[#D1FAE5]' },
  ];

  const handleDispatch = () => {
    onUpdateIncident({
      ...incident,
      workOrder: {
        ...incident.workOrder,
        dispatchStatus: 'IN_PROGRESS',
        techNotes: 'Technician on-site. Isolation and unloader diaphragm swap underway.',
      },
    });
  };

  const handleCompleteMaintenance = () => {
    onUpdateIncident({
      ...incident,
      workOrder: {
        ...incident.workOrder,
        dispatchStatus: 'COMPLETED',
        techNotes: 'Valve replaced, flange torqued to 85Nm. Ready for verification.',
      },
    });
    setActiveStep(5);
  };

  const handleRunVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      onUpdateIncident({
        ...incident,
        verification: {
          ...incident.verification,
          hoursObserved: 48,
          postMaintenanceKw: 45.2,
          outcome: 'RESOLVED',
          stabilityScore: 98.4,
        },
      });
      setIsVerifying(false);
    }, 1500);
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-block bg-[#FFE500] text-black border-2 border-black font-mono font-black text-xs px-2.5 py-0.5 shadow-[2px_2px_0px_0px_#000] uppercase">
            {lang === 'hi' ? '5-STEP CLOSED-LOOP AI AGENT' : 'THE 5-STEP CLOSED-LOOP AGENT SOLUTION'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-black mt-2">
            {lang === 'hi' ? 'Energy Waste Resolution Pipeline' : 'Autonomous Energy Waste Resolution Pipeline'}
          </h2>
          <p className="text-sm text-neutral-700 font-medium mt-1 max-w-2xl">
            {lang === 'hi'
              ? 'Detect karein, sensor data investigate karein, root cause pakadein, technician coordinate karein, aur durability verify karein.'
              : 'Closing the loop: From detecting abnormal electricity draw to verifying permanent post-maintenance stabilization.'}
          </p>
        </div>

        {/* Target Machine Tag */}
        <div className="p-3 bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] flex items-center gap-3">
          <span className="w-3 h-3 bg-[#FF6B4A] border border-black animate-pulse" />
          <div className="text-xs">
            <div className="text-neutral-500 font-mono font-bold">TARGET ASSET:</div>
            <div className="font-black text-black">{incident.machineName}</div>
          </div>
        </div>
      </div>

      {/* 5-Step Navigation Tabs (Neobrutalism Blocks) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {steps.map((s) => {
          const isCurrent = activeStep === s.num;
          const isDone = activeStep > s.num;
          const Icon = s.icon;
          return (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num)}
              className={`p-3.5 border-2 border-black text-left transition-all cursor-pointer ${
                isCurrent
                  ? `${s.activeBg} text-black font-black shadow-[4px_4px_0px_0px_#000] translate-x-[-1px] translate-y-[-1px]`
                  : isDone
                  ? 'bg-[#D1FAE5] text-black border-black shadow-[2px_2px_0px_0px_#000]'
                  : 'bg-white text-neutral-800 shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 font-black text-xs">
                  <Icon className="w-4 h-4 stroke-[2.5]" />
                  <span>{s.title}</span>
                </div>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3] text-black" />}
              </div>
              <div className="text-[11px] font-mono font-bold text-neutral-600">{s.subtitle}</div>
            </button>
          );
        })}
      </div>

      {/* Active Step Content Container */}
      <div className="bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_#000] p-6 sm:p-8">
        {/* STEP 1: DETECT */}
        {activeStep === 1 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-black">
              <div>
                <span className="px-2 py-0.5 bg-[#FFE500] text-black border border-black text-xs font-mono font-black shadow-[1.5px_1.5px_0px_0px_#000]">
                  STEP 01: UNUSUAL CONSUMPTION DETECTED
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-black mt-2">
                  Abnormal Power Draw on {incident.machineName}
                </h3>
                <div className="text-xs font-mono font-bold text-neutral-600 mt-1">
                  Location: {incident.location} · Detected: {incident.detectedAt}
                </div>
              </div>

              <div className="p-2.5 bg-[#FF6B4A] border-2 border-black shadow-[3px_3px_0px_0px_#000] text-black text-xs font-mono font-black">
                Excess Draw: +{incident.excessKw.toFixed(1)} kW (+105% above baseline)
              </div>
            </div>

            {/* Waste Metrics Grid (4 Tactile Neobrutalist Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-[#FEE2E2] border-2 border-black shadow-[3px_3px_0px_0px_#000]">
                <div className="text-xs font-mono font-bold text-neutral-700 uppercase">Active Measured Draw</div>
                <div className="text-3xl font-black font-mono text-black mt-1">
                  {(incident.excessKw + 45.0).toFixed(1)} kW
                </div>
                <div className="text-[11px] font-mono text-neutral-600 mt-0.5 font-bold">Nominal: 45.0 kW</div>
              </div>

              <div className="p-4 bg-[#FFE500] border-2 border-black shadow-[3px_3px_0px_0px_#000]">
                <div className="text-xs font-mono font-bold text-neutral-800 uppercase">Hourly Waste Cost</div>
                <div className="text-3xl font-black font-mono text-black mt-1">
                  ${incident.estimatedWasteDollarsPerHour.toFixed(2)} / hr
                </div>
                <div className="text-[11px] font-mono text-neutral-700 mt-0.5 font-bold">At $0.15/kWh tariff</div>
              </div>

              <div className="p-4 bg-[#FF6B4A] border-2 border-black shadow-[3px_3px_0px_0px_#000] text-black">
                <div className="text-xs font-mono font-black uppercase">Monthly Waste Bleed</div>
                <div className="text-3xl font-black font-mono mt-1">
                  ${incident.estimatedWasteDollarsPerMonth.toLocaleString()}
                </div>
                <div className="text-[11px] font-mono font-bold mt-0.5">If left unnoticed 30 days</div>
              </div>

              <div className="p-4 bg-[#D1FAE5] border-2 border-black shadow-[3px_3px_0px_0px_#000]">
                <div className="text-xs font-mono font-bold text-neutral-700 uppercase">CO2 Emissions Added</div>
                <div className="text-3xl font-black font-mono text-black mt-1">
                  +{incident.co2KgPerHour.toFixed(1)} kg/hr
                </div>
                <div className="text-[11px] font-mono text-neutral-600 mt-0.5 font-bold">Scope 2 emissions</div>
              </div>
            </div>

            {/* Problem Statement Box */}
            <div className="p-4 bg-neutral-100 border-2 border-black shadow-[2px_2px_0px_0px_#000] text-xs sm:text-sm text-neutral-900 leading-relaxed font-medium">
              <strong className="bg-[#FFE500] px-1.5 py-0.5 border border-black font-black mr-1">The Problem Solved:</strong> In traditional factories, nobody notices a 47 kW leak on a single compressor because it gets hidden in the total factory 600 kW load until the utility bill arrives. VoltHive sub-meter agents flagged this anomaly in <strong>3.8 minutes</strong>.
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveStep(2)}
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-black text-black bg-[#FFE500] border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-[#FFD700] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] cursor-pointer"
              >
                <span>Step 2: Investigate Causes via Sensors</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: INVESTIGATE */}
        {activeStep === 2 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-black">
              <div>
                <span className="px-2 py-0.5 bg-[#E0F2FE] text-black border border-black text-xs font-mono font-black shadow-[1.5px_1.5px_0px_0px_#000]">
                  STEP 02: MULTI-SENSOR CORRELATION INVESTIGATION
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-black mt-2">
                  Correlating Production Telemetry vs Equipment Faults
                </h3>
                <div className="text-xs text-neutral-600 font-medium mt-1">
                  Testing hypotheses: Did factory output increase, or is equipment failing?
                </div>
              </div>
            </div>

            {/* 4 Sensor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#F8FAFC] border-2 border-black shadow-[3px_3px_0px_0px_#000] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-neutral-600">HYPOTHESIS 1: PRODUCTION SURGE</span>
                  <span className="px-2 py-0.5 bg-[#D1FAE5] text-black border border-black font-mono font-bold text-[10px] shadow-[1px_1px_0px_0px_#000]">
                    RULED OUT (CLEARED)
                  </span>
                </div>
                <div className="text-sm font-black text-black">Factory Output Steady at 340 units/hr</div>
                <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                  {incident.sensorCorrelations.productionExplanation}
                </p>
                <div className="p-2 bg-white border border-black text-[11px] font-mono font-bold text-neutral-800">
                  Telemetry: PLC Tag [LINE_04_PPH] = 340.0 ± 2.0 (Flat)
                </div>
              </div>

              <div className="p-4 bg-[#FFF1F2] border-2 border-black shadow-[3px_3px_0px_0px_#000] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-neutral-600">HYPOTHESIS 2: MECHANICAL VIBRATION</span>
                  <span className="px-2 py-0.5 bg-[#FF6B4A] text-black border border-black font-mono font-bold text-[10px] shadow-[1px_1px_0px_0px_#000]">
                    ANOMALY DETECTED
                  </span>
                </div>
                <div className="text-sm font-black text-black">Drive Sump Vibration 4.6 mm/s</div>
                <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                  {incident.sensorCorrelations.vibrationDetails}
                </p>
                <div className="p-2 bg-white border border-black text-[11px] font-mono font-bold text-black">
                  Telemetry: Sensor [VIB_CMP_03] &gt; 1.8 mm/s threshold
                </div>
              </div>

              <div className="p-4 bg-[#FFF1F2] border-2 border-black shadow-[3px_3px_0px_0px_#000] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-neutral-600">HYPOTHESIS 3: THERMAL PROFILING</span>
                  <span className="px-2 py-0.5 bg-[#FF6B4A] text-black border border-black font-mono font-bold text-[10px] shadow-[1px_1px_0px_0px_#000]">
                    TEMPERATURE SPIKE
                  </span>
                </div>
                <div className="text-sm font-black text-black">Discharge Temp 92°C (Nominal 76°C)</div>
                <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                  {incident.sensorCorrelations.temperatureDetails}
                </p>
                <div className="p-2 bg-white border border-black text-[11px] font-mono font-bold text-black">
                  Telemetry: RTD [TC_OIL_SUMP] = 92.0°C (Non-stop cycle strain)
                </div>
              </div>

              <div className="p-4 bg-[#FFF1F2] border-2 border-black shadow-[3px_3px_0px_0px_#000] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-neutral-600">HYPOTHESIS 4: PNEUMATIC PRESSURE</span>
                  <span className="px-2 py-0.5 bg-[#FF6B4A] text-black border border-black font-mono font-bold text-[10px] shadow-[1px_1px_0px_0px_#000]">
                    PRESSURE LOSS
                  </span>
                </div>
                <div className="text-sm font-black text-black">Pressure Fluctuating 5.8 to 6.4 bar</div>
                <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                  {incident.sensorCorrelations.pressureDetails}
                </p>
                <div className="p-2 bg-white border border-black text-[11px] font-mono font-bold text-black">
                  Telemetry: Transducer [PT_HEADER_4] unable to hold 7.0 bar
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button
                onClick={() => setActiveStep(1)}
                className="px-4 py-2 text-xs font-bold text-black bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-100 cursor-pointer"
              >
                Back to Detection
              </button>
              <button
                onClick={() => setActiveStep(3)}
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-black text-black bg-[#FFE500] border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-[#FFD700] cursor-pointer"
              >
                <span>Step 3: Identify Most Likely Cause</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DIAGNOSE */}
        {activeStep === 3 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-black">
              <div>
                <span className="px-2 py-0.5 bg-[#F3E8FF] text-black border border-black text-xs font-mono font-black shadow-[1.5px_1.5px_0px_0px_#000]">
                  STEP 03: ROOT CAUSE IDENTIFICATION & DIAGNOSTICS
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-black mt-2">
                  Primary Root Cause Pinpointed with 97% Confidence
                </h3>
              </div>
              <span className="px-3 py-1 bg-[#FFE500] border-2 border-black shadow-[2px_2px_0px_0px_#000] font-mono text-xs font-black text-black">
                CONFIDENCE: {(incident.detectionConfidence * 100).toFixed(0)}%
              </span>
            </div>

            {/* Diagnosed Fault Box (Neobrutalist Violet + Black) */}
            <div className="p-5 bg-[#F3E8FF] border-[2.5px] border-black shadow-[4px_4px_0px_0px_#000] space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-black font-black bg-white px-2 py-0.5 border border-black inline-block">
                DIAGNOSED FAULT
              </div>
              <h4 className="text-lg font-black text-black">
                {incident.rootCauseTitle}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
                {incident.rootCauseDescription}
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 bg-white border-2 border-black font-mono font-bold text-black shadow-[2px_2px_0px_0px_#000]">
                  Repair ETA: <strong>{incident.estimatedFixTimeHours} hours</strong>
                </span>
                <span className="px-3 py-1 bg-white border-2 border-black font-mono font-bold text-black shadow-[2px_2px_0px_0px_#000]">
                  Parts Required: <strong>{incident.requiredParts.join(', ')}</strong>
                </span>
              </div>
            </div>

            {/* Alternative Hypotheses Dismissed */}
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-black font-bold">
                ALTERNATIVE HYPOTHESES EVALUATED & DISMISSED BY AGENT
              </div>
              {incident.alternativeCausesConsidered.map((alt, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-neutral-50 border-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div>
                    <span className="font-bold text-black">{alt.cause}</span>
                    <span className="text-neutral-600 font-mono ml-2">({(alt.probability * 100).toFixed(0)}% probability)</span>
                    <div className="text-neutral-700 text-[11px] mt-0.5 font-medium">{alt.reasonDismissed}</div>
                  </div>
                  <span className="px-2 py-0.5 bg-neutral-200 border border-black text-[10px] font-mono font-bold shrink-0">
                    Dismissed
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-2">
              <button
                onClick={() => setActiveStep(2)}
                className="px-4 py-2 text-xs font-bold text-black bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-100 cursor-pointer"
              >
                Back to Sensors
              </button>
              <button
                onClick={() => setActiveStep(4)}
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-black text-black bg-[#FFE500] border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-[#FFD700] cursor-pointer"
              >
                <span>Step 4: Coordinate Maintenance Work Order</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: COORDINATE */}
        {activeStep === 4 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-black">
              <div>
                <span className="px-2 py-0.5 bg-[#FEF08A] text-black border border-black text-xs font-mono font-black shadow-[1.5px_1.5px_0px_0px_#000]">
                  STEP 04: COORDINATION WITH MAINTENANCE TEAM
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-black mt-2">
                  Automated Work Order Dispatch: {incident.workOrder.ticketId}
                </h3>
              </div>
              <div className="px-3 py-1 bg-[#D1FAE5] border-2 border-black shadow-[2px_2px_0px_0px_#000] text-black text-xs font-mono font-black">
                STATUS: {incident.workOrder.dispatchStatus}
              </div>
            </div>

            {/* Work Order Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-[#FFFDF5] border-2 border-black shadow-[3px_3px_0px_0px_#000]">
                <div className="text-xs font-mono font-bold text-neutral-600 uppercase">Assigned Technician</div>
                <div className="text-sm font-black text-black mt-1 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4" />
                  <span>{incident.workOrder.assignedTech}</span>
                </div>
                <div className="text-[11px] text-neutral-600 mt-1 font-medium">Pneumatics Specialist</div>
              </div>

              <div className="p-4 bg-[#FEE2E2] border-2 border-black shadow-[3px_3px_0px_0px_#000]">
                <div className="text-xs font-mono font-bold text-neutral-700 uppercase">Execution Priority</div>
                <div className="text-sm font-black text-black mt-1">
                  {incident.workOrder.priority}
                </div>
                <div className="text-[11px] text-neutral-600 mt-1 font-mono font-bold">WSJF: {incident.wsjf.score} (Top of Queue)</div>
              </div>

              <div className="p-4 bg-[#D1FAE5] border-2 border-black shadow-[3px_3px_0px_0px_#000]">
                <div className="text-xs font-mono font-bold text-neutral-700 uppercase">Parts Kitted</div>
                <div className="text-sm font-black text-black mt-1">
                  Tool Crib #2 Reserved
                </div>
                <div className="text-[11px] text-neutral-600 mt-1 font-mono font-bold">{incident.requiredParts[0]}</div>
              </div>
            </div>

            {/* Checklist */}
            <div className="p-4 bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] space-y-2.5">
              <div className="text-xs font-mono font-black uppercase text-black">
                TECHNICIAN ACTION CHECKLIST & LOTO SAFETY STEPS
              </div>
              <div className="space-y-2">
                {incident.workOrder.checklist.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-2 bg-neutral-50 border border-black text-xs font-medium text-neutral-900">
                    <CheckCircle2 className="w-4 h-4 text-black stroke-[2.5] shrink-0" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Maintenance Trigger */}
            <div className="p-4 bg-[#FFE500] border-2 border-black shadow-[4px_4px_0px_0px_#000] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-black text-black uppercase">Simulate Technician Action</div>
                <div className="text-xs text-neutral-800 font-medium">
                  Update work order state to activate the post-maintenance verification window.
                </div>
              </div>

              {incident.workOrder.dispatchStatus !== 'COMPLETED' ? (
                <button
                  onClick={handleCompleteMaintenance}
                  className="px-5 py-2.5 text-xs font-black text-white bg-black border-2 border-black shadow-[3px_3px_0px_0px_#FFE500] hover:bg-neutral-900 cursor-pointer"
                >
                  Simulate Technician Completing Fix
                </button>
              ) : (
                <span className="px-3 py-1 bg-black text-[#FFE500] font-mono text-xs font-black border border-black">
                  ✓ Maintenance Marked Complete
                </span>
              )}
            </div>

            <div className="flex justify-between pt-2">
              <button
                onClick={() => setActiveStep(3)}
                className="px-4 py-2 text-xs font-bold text-black bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-100 cursor-pointer"
              >
                Back to Diagnostics
              </button>
              <button
                onClick={() => setActiveStep(5)}
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-black text-black bg-[#FFE500] border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-[#FFD700] cursor-pointer"
              >
                <span>Step 5: Verify Post-Fix Durability</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: VERIFY RESOLUTION */}
        {activeStep === 5 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-black">
              <div>
                <span className="px-2 py-0.5 bg-[#D1FAE5] text-black border border-black text-xs font-mono font-black shadow-[1.5px_1.5px_0px_0px_#000]">
                  STEP 05: POST-MAINTENANCE DURABILITY & VERIFICATION
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-black mt-2">
                  Verifying True Operational Stabilization
                </h3>
                <div className="text-xs text-neutral-600 font-medium mt-1">
                  Did electricity draw drop back to baseline and stay down?
                </div>
              </div>

              <div className="px-3 py-1 bg-[#FFE500] border-2 border-black shadow-[2px_2px_0px_0px_#000] text-black text-xs font-mono font-black">
                OUTCOME: {incident.verification.outcome}
              </div>
            </div>

            {/* Philosophy Banner */}
            <div className="p-4 bg-[#D1FAE5] border-2 border-black shadow-[3px_3px_0px_0px_#000] text-xs sm:text-sm text-neutral-900 leading-relaxed font-medium">
              <strong className="bg-black text-[#FFE500] px-1.5 py-0.5 font-mono font-black mr-1">Closing the Gap:</strong> "Our focus isn’t simply monitoring electricity usage. It’s closing the gap between detecting a problem and verifying that it has been fixed." VoltHive watches the sub-meter telemetry for <strong>48 continuous hours</strong> to ensure the leak does not relapse.
            </div>

            {/* Before vs After Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-[#FEE2E2] border-2 border-black shadow-[3px_3px_0px_0px_#000]">
                <div className="text-xs font-mono font-bold text-neutral-700 uppercase">Pre-Fix Waste Draw</div>
                <div className="text-3xl font-black font-mono text-black mt-1">
                  92.4 kW
                </div>
                <div className="text-[11px] font-mono text-neutral-600 mt-0.5 font-bold">Bleeding $7.11/hr</div>
              </div>

              <div className="p-4 bg-[#D1FAE5] border-2 border-black shadow-[3px_3px_0px_0px_#000]">
                <div className="text-xs font-mono font-bold text-neutral-700 uppercase">Post-Fix Stabilized Draw</div>
                <div className="text-3xl font-black font-mono text-black mt-1">
                  {incident.verification.outcome === 'RESOLVED' ? '45.2 kW' : 'Verifying...'}
                </div>
                <div className="text-[11px] font-mono text-neutral-600 mt-0.5 font-bold">Nominal Target: 45.0 kW</div>
              </div>

              <div className="p-4 bg-[#FFE500] border-2 border-black shadow-[3px_3px_0px_0px_#000]">
                <div className="text-xs font-mono font-bold text-neutral-800 uppercase">Durability Window</div>
                <div className="text-3xl font-black font-mono text-black mt-1">
                  48-Hour Lock
                </div>
                <div className="text-[11px] font-mono text-neutral-700 mt-0.5 font-bold">Zero recurrence observed</div>
              </div>
            </div>

            {/* Telemetry Waveform */}
            <div className="p-4 bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-black">
                <span>SUB-METER POWER PROFILE BEFORE VS AFTER MAINTENANCE</span>
                <span className="bg-[#D1FAE5] px-2 py-0.5 border border-black">STABILIZED</span>
              </div>
              <div className="h-28 flex items-end gap-1.5 pt-4 border-b-2 border-black">
                {[94, 92, 93, 91, 95, 60, 46, 45, 45, 45.2, 45.1, 45.0, 45.0].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      style={{ height: `${(h / 95) * 100}%` }}
                      className={`w-full border border-black transition-all ${
                        h > 80 ? 'bg-[#FF6B4A]' : h > 50 ? 'bg-[#FFE500]' : 'bg-[#10B981]'
                      }`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] font-mono font-bold text-neutral-600">
                <span>T - 2h (Fault active @ 94 kW)</span>
                <span>T - 0 (Technician swaps unloader)</span>
                <span>T + 48h (Durable baseline locked @ 45 kW)</span>
              </div>
            </div>

            {/* Execute Durability Action */}
            <div className="p-4 bg-[#FFFDF5] border-2 border-black shadow-[3px_3px_0px_0px_#000] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-black text-black uppercase">Lock Durability & Update ROI</div>
                <div className="text-xs text-neutral-700 font-medium">
                  Runs statistical z-score on 48h post-repair telemetry to certify permanent resolution.
                </div>
              </div>
              <button
                onClick={handleRunVerification}
                disabled={isVerifying}
                className="px-6 py-2.5 text-xs font-black text-black bg-[#FFE500] border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-[#FFD700] cursor-pointer disabled:opacity-50"
              >
                {isVerifying ? 'Analyzing Stability...' : 'Lock Resolution & Update Energy ROI'}
              </button>
            </div>

            <div className="flex justify-between pt-2">
              <button
                onClick={() => setActiveStep(4)}
                className="px-4 py-2 text-xs font-bold text-black bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-100 cursor-pointer"
              >
                Back to Work Order
              </button>
              <button
                onClick={() => setActiveStep(1)}
                className="text-xs font-mono font-bold text-black hover:underline"
              >
                Restart Investigation Walkthrough →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

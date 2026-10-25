import React, { useState } from 'react';
import { INCIDENT_SCENARIOS, INITIAL_DORA_METRICS } from '../data/architectureData';
import { IncidentScenario, DoraMetricsState } from '../types/architecture';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  GitPullRequest, 
  ShieldCheck, 
  Activity, 
  Cpu, 
  TrendingUp, 
  Sliders, 
  ChevronRight,
  ArrowRight,
  RefreshCw,
  Terminal,
  Clock
} from 'lucide-react';

interface SimulationSandboxProps {
  lang: 'en' | 'hi';
}

export const SimulationSandbox: React.FC<SimulationSandboxProps> = ({ lang }) => {
  const [selectedScenario, setSelectedScenario] = useState<IncidentScenario>(INCIDENT_SCENARIOS[0]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [verificationProfile, setVerificationProfile] = useState<'standard' | 'elevated' | 'strict'>('strict');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [outcome, setOutcome] = useState<'RESOLVED' | 'PARTIAL' | 'RECURRING' | null>(null);
  const [doraMetrics, setDoraMetrics] = useState<DoraMetricsState>(INITIAL_DORA_METRICS);
  const [humanApproved, setHumanApproved] = useState<boolean>(false);

  const wsjfScore = (
    (selectedScenario.wsjf.userValue +
      selectedScenario.wsjf.timeCriticality +
      selectedScenario.wsjf.riskReduction) /
    selectedScenario.wsjf.jobSize
  ).toFixed(2);

  const resetSimulation = () => {
    setCurrentStep(1);
    setOutcome(null);
    setHumanApproved(false);
    setIsSimulating(false);
  };

  const handleNextStep = () => {
    if (currentStep === 5) {
      // Finalize and classify
      setOutcome('RESOLVED');
      setDoraMetrics((prev) => ({
        ...prev,
        meanTimeToRestore: '5.8 min',
        durabilityScore: 97.8,
        preventedRegressions: prev.preventedRegressions + 1,
        activeRepairs: Math.max(0, prev.activeRepairs - 1),
      }));
      setCurrentStep(6);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const runFullAutoPilot = () => {
    setIsSimulating(true);
    resetSimulation();
    
    // Step through automatically with realistic intervals
    setTimeout(() => setCurrentStep(2), 1000);
    setTimeout(() => {
      setCurrentStep(3);
      setHumanApproved(true);
    }, 2200);
    setTimeout(() => setCurrentStep(4), 3600);
    setTimeout(() => setCurrentStep(5), 5000);
    setTimeout(() => {
      setOutcome('RESOLVED');
      setDoraMetrics((prev) => ({
        ...prev,
        meanTimeToRestore: '5.2 min',
        durabilityScore: 98.2,
        preventedRegressions: prev.preventedRegressions + 1,
      }));
      setCurrentStep(6);
      setIsSimulating(false);
    }, 6500);
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            LIVE OODA LOOP SANDBOX
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            {lang === 'hi'
              ? 'Self-Healing Incident Simulation'
              : 'End-to-End Self-Healing Repair Simulation'}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {lang === 'hi'
              ? 'Live dekhein kaise GA4 anomaly trigger hoti hai, WSJF triage hota hai, aur strict verification ke baad durability score badhta hai.'
              : 'Experience the exact 6-step flow from the diagram: Telemetry → WSJF → AI PR → Verification → Stability → Durability.'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={runFullAutoPilot}
            disabled={isSimulating}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-600/20 disabled:opacity-50 cursor-pointer"
          >
            {isSimulating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Simulating...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Run Autopilot Simulation</span>
              </>
            )}
          </button>

          <button
            onClick={resetSimulation}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Reset simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {INCIDENT_SCENARIOS.map((scen) => (
          <button
            key={scen.id}
            onClick={() => {
              setSelectedScenario(scen);
              resetSimulation();
            }}
            className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
              selectedScenario.id === scen.id
                ? 'bg-indigo-600/20 border-indigo-500 text-white'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <span className="font-mono text-slate-400 mr-1.5">[{scen.severity}]</span>
            <span>{scen.title}</span>
          </button>
        ))}
      </div>

      {/* 6-Step Stepper Bar */}
      <div className="mb-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {[
          { step: 1, name: '1. Observe', sub: 'GA4 Telemetry' },
          { step: 2, name: '2. Orient/Decide', sub: 'WSJF Triage' },
          { step: 3, name: '3. Act', sub: 'Hive AI PR' },
          { step: 4, name: '4. Verify', sub: 'Adaptive Window' },
          { step: 5, name: '5. Classify', sub: 'Durability Check' },
          { step: 6, name: '6. Learn', sub: 'DORA Feedback' },
        ].map((item) => {
          const isCurrent = currentStep === item.step;
          const isDone = currentStep > item.step;
          return (
            <div
              key={item.step}
              onClick={() => !isSimulating && setCurrentStep(item.step)}
              className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                isCurrent
                  ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10'
                  : isDone
                  ? 'bg-slate-950/90 border-emerald-500/40 text-emerald-400'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{item.name}</span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">{item.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Active Stage Simulation Body */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
        {/* Step 1: OBSERVE */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-blue-400 font-bold">
                  STEP 1: SIGNAL COLLECTION [OBSERVE]
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  GA4 Telemetry Detects Operational Anomaly
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
                Anomaly Score: {selectedScenario.rawSignal.anomalyScore}σ above baseline
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-400">Metric Tracked</div>
                <div className="text-sm font-mono font-bold text-indigo-400 mt-1">
                  {selectedScenario.rawSignal.metric}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-400">Current Rate vs Baseline</div>
                <div className="text-sm font-mono font-bold text-rose-400 mt-1">
                  {selectedScenario.rawSignal.current} <span className="text-slate-500 text-xs font-normal">/ base {selectedScenario.rawSignal.baseline}</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-400">Impacted Active Users</div>
                <div className="text-sm font-mono font-bold text-amber-400 mt-1 tabular-nums">
                  ~{selectedScenario.rawSignal.affectedUsers.toLocaleString()} users
                </div>
              </div>
            </div>

            {/* Simulated Anomaly Telemetry Waveform */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-mono text-slate-400 mb-2 flex items-center justify-between">
                <span>REAL-TIME GA4 ERROR STREAM</span>
                <span className="text-rose-400 font-semibold">SPIKE DETECTED</span>
              </div>
              <div className="h-24 flex items-end gap-1.5 pt-4 border-b border-slate-800">
                {[12, 14, 11, 15, 13, 16, 14, 18, 65, 88, 96, 92, 85].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      style={{ height: `${h}%` }}
                      className={`w-full rounded-t transition-all ${
                        h > 30 ? 'bg-rose-500' : 'bg-slate-700'
                      }`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
                <span>T - 15 min (Normal baseline)</span>
                <span>T - 0 min (Spike: ga4-anomaly-detector.sh alerted)</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextStep}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
              >
                <span>Trigger Step 2: WSJF Triage</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: ORIENT & DECIDE */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-purple-400 font-bold">
                  STEP 2: TRIAGE & PRIORITIZATION [ORIENT + DECIDE]
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Algorithmic Prioritization (WSJF & Error Budgets)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono">
                  Computed WSJF: {wsjfScore}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-mono text-slate-400">COST OF DELAY COMPONENTS (1-10)</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-300">User / Business Value:</span>
                    <span className="font-mono text-indigo-400 font-bold">{selectedScenario.wsjf.userValue}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Time Criticality:</span>
                    <span className="font-mono text-indigo-400 font-bold">{selectedScenario.wsjf.timeCriticality}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Risk Reduction:</span>
                    <span className="font-mono text-indigo-400 font-bold">{selectedScenario.wsjf.riskReduction}/10</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between font-mono">
                    <span className="text-slate-400">Total Cost of Delay:</span>
                    <span className="text-purple-400 font-bold">
                      {selectedScenario.wsjf.userValue + selectedScenario.wsjf.timeCriticality + selectedScenario.wsjf.riskReduction}
                    </span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Estimated Job Size:</span>
                    <span className="text-slate-200">{selectedScenario.wsjf.jobSize}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-mono text-slate-400">GOVERNANCE & VELOCITY RULES</div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <strong className="text-emerald-400">Merge Velocity:</strong> WSJF &gt; 6.0 qualifies for expedited autonomous PR creation.
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <strong className="text-amber-400">Recurrence Guard:</strong> Incident has recurred {selectedScenario.recurrenceCount} time(s). Strict verification window will be enforced.
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <strong className="text-sky-400">Execution Routing:</strong> Dispatched to Temporal workflow: <code className="text-indigo-300">RepairIncidentWorkflow</code>.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button
                onClick={() => setCurrentStep(1)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Back to Signals
              </button>
              <button
                onClick={handleNextStep}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
              >
                <span>Trigger Step 3: Hive Agent PR</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: ACT */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  STEP 3: HIVE ORCHESTRATION LAYER [ACT]
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Autonomous AI PR Generation & Code Patching
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-1.5">
                  <GitPullRequest className="w-3.5 h-3.5" />
                  <span>PR #142 Ready</span>
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
              <strong className="text-indigo-400">Root Cause Identified:</strong> {selectedScenario.rootCause}
            </div>

            {/* Code Diff Box */}
            <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <div className="px-4 py-2 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>File: {selectedScenario.patchDiff.file}</span>
                <span className="text-emerald-400">+12 -3 lines</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
                <div className="p-4 font-mono text-xs overflow-x-auto bg-rose-950/10">
                  <div className="text-[10px] text-rose-400 font-bold mb-2">ORIGINAL (FAULTY)</div>
                  <pre className="text-rose-300 leading-relaxed">
                    <code>{selectedScenario.patchDiff.original}</code>
                  </pre>
                </div>
                <div className="p-4 font-mono text-xs overflow-x-auto bg-emerald-950/10">
                  <div className="text-[10px] text-emerald-400 font-bold mb-2">PATCHED (AI AGENT GENERATION)</div>
                  <pre className="text-emerald-300 leading-relaxed">
                    <code>{selectedScenario.patchDiff.patched}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Human in the loop review trigger */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-white">Human-in-the-Loop Governance Gate</div>
                <div className="text-xs text-slate-400">
                  WSJF is {wsjfScore}. High blast-radius code paths require engineer sign-off or policy override.
                </div>
              </div>
              <button
                onClick={() => setHumanApproved(!humanApproved)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  humanApproved
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                {humanApproved ? '✓ Approved & Merged' : 'Approve & Merge PR'}
              </button>
            </div>

            <div className="flex justify-between pt-2">
              <button
                onClick={() => setCurrentStep(2)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Back to Triage
              </button>
              <button
                onClick={handleNextStep}
                disabled={!humanApproved}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 cursor-pointer"
              >
                <span>Trigger Step 4: Adaptive Verification</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: VERIFY */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold">
                  STEP 4: ADAPTIVE VERIFICATION LAYER
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Dynamic Post-Merge Canary & Telemetry Monitoring
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                Intensity scales dynamically with recurrence history
              </span>
            </div>

            {/* Profile Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(['standard', 'elevated', 'strict'] as const).map((prof) => {
                const isSelected = verificationProfile === prof;
                const profileData = selectedScenario.verificationProfiles[prof];
                return (
                  <button
                    key={prof}
                    onClick={() => setVerificationProfile(prof)}
                    className={`p-4 rounded-xl text-left border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slate-950 border-amber-500 shadow-md shadow-amber-500/10'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold uppercase text-white">
                        {prof} Profile
                      </span>
                      <span className="text-xs font-mono text-amber-400">
                        {profileData.windowHours}h window
                      </span>
                    </div>
                    <ul className="space-y-1 text-[11px] text-slate-400">
                      {profileData.checks.map((chk, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{chk}</span>
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs font-mono text-slate-400">CANARY VALIDATION STATUS</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-400">Canary Traffic Split</div>
                  <div className="font-mono text-indigo-400 font-bold mt-0.5">10% Prod Pods</div>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-400">Synthetic Injections</div>
                  <div className="font-mono text-emerald-400 font-bold mt-0.5">1,200 probes OK</div>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <div className="text-slate-400">Regression Watch</div>
                  <div className="font-mono text-sky-400 font-bold mt-0.5">0 new exceptions</div>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button
                onClick={() => setCurrentStep(3)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Back to PR
              </button>
              <button
                onClick={handleNextStep}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
              >
                <span>Trigger Step 5: Outcome Classification</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: CLASSIFY OUTCOME */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-rose-400 font-bold">
                  STEP 5: OUTCOME CLASSIFICATION LAYER
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Measuring Real Operational Stability
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-400">
                Evaluation Window Completed
              </span>
            </div>

            <div className="p-4 bg-indigo-950/30 rounded-xl border border-indigo-500/20 text-xs sm:text-sm text-indigo-200">
              <strong className="text-white">Core Principle from Image 1:</strong> "This layer is where Hive stops asking <em>'Did the PR merge?'</em> and starts asking <em>'Did the system actually stabilize afterward?'</em>"
            </div>

            {/* Post-Merge Telemetry Stabilization Graph */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-mono text-slate-400 mb-2 flex items-center justify-between">
                <span>POST-MERGE TELEMETRY EVOLUTION</span>
                <span className="text-emerald-400 font-bold">STABILIZED TO 0 ANOMALIES</span>
              </div>
              <div className="h-24 flex items-end gap-1.5 pt-4 border-b border-slate-800">
                {[92, 85, 45, 12, 4, 1, 0, 0, 0, 0, 0, 0].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      style={{ height: `${Math.max(h, 4)}%` }}
                      className={`w-full rounded-t transition-all ${
                        h > 40 ? 'bg-rose-500' : h > 0 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
                <span>T - Merge (Spike present)</span>
                <span>T + 12h (Canary healthy)</span>
                <span>T + 24h (Zero anomaly recurrence)</span>
              </div>
            </div>

            {/* Classification Outcome Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/50">
                <div className="text-xs font-mono text-emerald-400 font-bold mb-1">
                  RESOLVED (Active Outcome)
                </div>
                <div className="text-xs text-slate-300">
                  Telemetry returned to baseline. Recurrence counter reduced. Close incident.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 opacity-60">
                <div className="text-xs font-mono text-amber-400 font-bold mb-1">PARTIAL</div>
                <div className="text-xs text-slate-400">
                  Anomaly reduced by &gt;70% but not zero. Keep monitoring and queue deep cleanup.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 opacity-60">
                <div className="text-xs font-mono text-rose-400 font-bold mb-1">RECURRING</div>
                <div className="text-xs text-slate-400">
                  Issue reappeared. Increment recurrence counter and escalate to senior human engineer.
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button
                onClick={() => setCurrentStep(4)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Back to Verification
              </button>
              <button
                onClick={handleNextStep}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 cursor-pointer"
              >
                <span>Confirm Durability & Update DORA Metrics</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 6: LEARN & DORA METRICS */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  STEP 6: FEEDBACK & METRICS LAYER [LEARN]
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  System Reliability Growth & DORA Telemetry
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono">
                Durability Loop Completed
              </span>
            </div>

            {/* DORA Scoreboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-400">Deployment Frequency</div>
                <div className="text-2xl font-bold font-mono text-indigo-400 mt-1">
                  {doraMetrics.deploymentFrequency}
                </div>
                <div className="text-[10px] text-emerald-400 mt-1">↑ +2.4 / day (High velocity)</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-400">Mean Time to Restore (MTTR)</div>
                <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                  {doraMetrics.meanTimeToRestore}
                </div>
                <div className="text-[10px] text-emerald-400 mt-1">↓ Was 4.5 hours manually</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-400">Change Failure Rate</div>
                <div className="text-2xl font-bold font-mono text-sky-400 mt-1">
                  {doraMetrics.changeFailureRate}%
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Elite DevOps tier</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs text-slate-400">Repair Durability Score</div>
                <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                  {doraMetrics.durabilityScore}%
                </div>
                <div className="text-[10px] text-emerald-400 mt-1">Zero recurrence in 30 days</div>
              </div>
            </div>

            {/* Feedback Loop Integration */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-mono text-slate-400">FEEDBACK CONSUMED BY SYSTEM</div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Durability Memory Updated:</strong> The AST patch logic was recorded in durable storage so future agents reuse this validated pattern.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Triage Weight Optimization:</strong> Incident recurrence counter decreased from {selectedScenario.recurrenceCount} to {Math.max(0, selectedScenario.recurrenceCount - 1)}.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Error Budget Replenished:</strong> Service SLO recovered to 99.98% availability.
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={resetSimulation}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Simulate Another Incident</span>
              </button>

              <button
                onClick={() => setCurrentStep(1)}
                className="text-xs font-mono text-indigo-400 hover:text-indigo-300 cursor-pointer"
              >
                Review Step 1 Inputs →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

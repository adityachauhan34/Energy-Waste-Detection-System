import React, { useState } from 'react';
import { Sliders, Gauge, ShieldAlert, CheckCircle, HelpCircle, ArrowUpDown, Cpu } from 'lucide-react';

interface WsjfWorkbenchProps {
  lang: 'en' | 'hi';
}

interface BacklogItem {
  id: string;
  title: string;
  source: string;
  userValue: number;
  timeCriticality: number;
  riskReduction: number;
  jobSize: number;
}

export const WsjfWorkbench: React.FC<WsjfWorkbenchProps> = ({ lang }) => {
  // Active custom calculator state
  const [userValue, setUserValue] = useState<number>(8);
  const [timeCriticality, setTimeCriticality] = useState<number>(9);
  const [riskReduction, setRiskReduction] = useState<number>(7);
  const [jobSize, setJobSize] = useState<number>(2);
  const [errorBudgetRemaining, setErrorBudgetRemaining] = useState<number>(68); // 0-100%

  // Backlog comparison table
  const [items, setItems] = useState<BacklogItem[]>([
    { id: 'ISSUE-101', title: 'Checkout Stripe webhook timeout', source: 'GA4 Telemetry', userValue: 9, timeCriticality: 9, riskReduction: 8, jobSize: 2 },
    { id: 'ISSUE-102', title: 'Search filter layout jitter on Safari', source: 'Contributor Bug', userValue: 4, timeCriticality: 3, riskReduction: 2, jobSize: 3 },
    { id: 'ISSUE-103', title: 'WebSocket reconnection loop crash', source: 'GA4 Telemetry', userValue: 8, timeCriticality: 8, riskReduction: 8, jobSize: 3 },
    { id: 'ISSUE-104', title: 'Memory leak in canvas chart unmount', source: 'Regression Scan', userValue: 5, timeCriticality: 6, riskReduction: 5, jobSize: 4 },
  ]);

  const costOfDelay = userValue + timeCriticality + riskReduction;
  const wsjf = (costOfDelay / Math.max(1, jobSize)).toFixed(2);
  const numWsjf = parseFloat(wsjf);

  // Determine Governance tier based on WSJF and Error Budget
  const isEmergency = numWsjf >= 10;
  const isAutoMergeEligible = numWsjf >= 5 && errorBudgetRemaining > 30;
  const isEscalatedQaRequired = numWsjf > 8 || errorBudgetRemaining < 20;

  const calculateItemWsjf = (item: BacklogItem) => {
    return ((item.userValue + item.timeCriticality + item.riskReduction) / item.jobSize).toFixed(2);
  };

  const sortedItems = [...items].sort((a, b) => parseFloat(calculateItemWsjf(b)) - parseFloat(calculateItemWsjf(a)));

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold">
            LAYER 02: TRIAGE & PRIORITIZATION
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            {lang === 'hi' ? 'WSJF & Governance Engine' : 'WSJF Priority & Error Budget Engine'}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            {lang === 'hi'
              ? 'Weighted Shortest Job First (WSJF) formula = (User Value + Time Criticality + Risk Reduction) / Job Size. Dekhein governance kab merge allow karti hai.'
              : 'Calculate Cost of Delay vs Job Size to determine autonomous PR routing, merge velocity, and error budget governance.'}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] font-mono text-slate-400">ERROR BUDGET AVAILABLE</div>
            <div className="text-base font-mono font-bold text-emerald-400 tabular-nums">
              {errorBudgetRemaining}%
            </div>
          </div>
          <div className="w-16 bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div
              style={{ width: `${errorBudgetRemaining}%` }}
              className={`h-full ${
                errorBudgetRemaining > 40
                  ? 'bg-emerald-500'
                  : errorBudgetRemaining > 20
                  ? 'bg-amber-500'
                  : 'bg-rose-500'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive WSJF Calculator */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span>Interactive WSJF Formula Tuner</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Scale: 1 (Lowest) - 10 (Highest)</span>
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">User & Business Value</span>
                <span className="font-mono text-indigo-400 font-bold">{userValue} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={userValue}
                onChange={(e) => setUserValue(parseInt(e.target.value, 10))}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
              />
              <div className="text-[11px] text-slate-500 mt-0.5">Impact on revenue, checkout success, or core workflow.</div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Time Criticality</span>
                <span className="font-mono text-indigo-400 font-bold">{timeCriticality} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={timeCriticality}
                onChange={(e) => setTimeCriticality(parseInt(e.target.value, 10))}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
              />
              <div className="text-[11px] text-slate-500 mt-0.5">Urgency of resolving before further SLA degradation occurs.</div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Risk Reduction / Opportunity Enablement</span>
                <span className="font-mono text-indigo-400 font-bold">{riskReduction} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={riskReduction}
                onChange={(e) => setRiskReduction(parseInt(e.target.value, 10))}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
              />
              <div className="text-[11px] text-slate-500 mt-0.5">Prevents cascade architectural collapse or unblocks other teams.</div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Job Size / Engineering Complexity (Divisor)</span>
                <span className="font-mono text-amber-400 font-bold">{jobSize} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={jobSize}
                onChange={(e) => setJobSize(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
              />
              <div className="text-[11px] text-slate-500 mt-0.5">Smaller fixes score higher because they unblock value faster.</div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Simulated Service Error Budget</span>
                <span className="font-mono text-emerald-400 font-bold">{errorBudgetRemaining}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={errorBudgetRemaining}
                onChange={(e) => setErrorBudgetRemaining(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
              />
            </div>
          </div>

          {/* Mathematical Result Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400 font-mono">CALCULATED WSJF SCORE</div>
                <div className="text-3xl font-extrabold font-mono text-purple-400 tabular-nums">
                  {wsjf}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400 font-mono">COST OF DELAY</div>
                <div className="text-lg font-mono font-bold text-white tabular-nums">
                  {costOfDelay} <span className="text-xs text-slate-500 font-normal">/ {jobSize}</span>
                </div>
              </div>
            </div>

            {/* Governance Routing Decision */}
            <div className="pt-3 border-t border-slate-800">
              <div className="text-xs font-mono text-slate-400 mb-2">GOVERNANCE DISPATCH DECISION:</div>
              {isEmergency ? (
                <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>
                    <strong>P0 Emergency (WSJF &ge; 10):</strong> Immediate bypass to top of queue + dual-agent review.
                  </span>
                </div>
              ) : isEscalatedQaRequired ? (
                <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    <strong>Escalated QA Required:</strong> Error budget is low (&lt;20%) or blast radius is elevated.
                  </span>
                </div>
              ) : (
                <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    <strong>Autonomous Merge Allowed:</strong> Error budget healthy, routine AST patch approved.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Real-Time Backlog Priority Table */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-sky-400" />
                <span>Live Priority Queue (Ranked by WSJF)</span>
              </h3>
              <div className="text-xs text-slate-400 mt-0.5">Highest score dispatched to Hive first</div>
            </div>
            <span className="text-xs font-mono text-slate-500">{sortedItems.length} items</span>
          </div>

          <div className="space-y-2.5">
            {sortedItems.map((item, index) => {
              const itemWsjf = calculateItemWsjf(item);
              const isFirst = index === 0;
              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isFirst
                      ? 'bg-slate-950 border-purple-500/60 shadow-md shadow-purple-500/10'
                      : 'bg-slate-950/60 border-slate-800/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold text-slate-400">
                          #{index + 1}
                        </span>
                        <span className="text-xs font-bold text-white">{item.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                        <span>{item.source}</span>
                        <span>·</span>
                        <span className="font-mono text-slate-500">Cost: {item.userValue + item.timeCriticality + item.riskReduction}</span>
                        <span>·</span>
                        <span className="font-mono text-slate-500">Size: {item.jobSize}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono text-slate-400">WSJF</div>
                      <div className={`text-base font-mono font-bold tabular-nums ${isFirst ? 'text-purple-400' : 'text-slate-200'}`}>
                        {itemWsjf}
                      </div>
                    </div>
                  </div>

                  {isFirst && (
                    <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                      <span className="text-emerald-400 flex items-center gap-1 font-mono">
                        <Cpu className="w-3 h-3" />
                        Dispatched to Temporal Worker
                      </span>
                      <span className="text-slate-400">Next PR generation</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400">
            <strong>Key Benefit:</strong> Traditional teams argue for hours in backlog meetings. WSJF automates the priority queue mathematically based on real live telemetry data.
          </div>
        </div>
      </div>
    </section>
  );
};

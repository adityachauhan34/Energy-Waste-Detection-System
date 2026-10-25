import React from 'react';
import { ArrowRight, Play, Sparkles, Activity, Layers, Workflow, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HeroOverviewProps {
  lang: 'en' | 'hi';
  onExploreProducts: () => void;
  onLaunchSimulation: () => void;
  onViewArchitecture: () => void;
}

export const HeroOverview: React.FC<HeroOverviewProps> = ({
  lang,
  onExploreProducts,
  onLaunchSimulation,
  onViewArchitecture,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 border-b border-slate-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-indigo-600/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Answer Banner */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>
            {lang === 'hi'
              ? 'Aapke diagrams ka complete technical breakdown aur 5 killer product ideas'
              : 'Direct Answer & Technical Breakdown for your uploaded architecture diagrams'}
          </span>
        </div>

        {/* Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
              {lang === 'hi' ? (
                <>
                  Is architecture se aap bana sakte hain ek <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">Autonomous Self-Healing Software Platform</span>
                </>
              ) : (
                <>
                  Build an <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">Autonomous Self-Healing SRE & Durability Engine</span> from these Blueprints
                </>
              )}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              {lang === 'hi' ? (
                <>
                  Aapke dono diagrams ek high-end <strong>Autonomous DevOps & Repair Durability System</strong> ko depict karte hain. Yeh system sirf CI/CD mein PR merge nahi karta, balki production telemetry (GA4, metrics) ko observe karke yeh verify karta hai ki <strong className="text-indigo-300">"Did the system actually stabilize post-merge?"</strong>. Temporal engine aur Bifrost Model Gateway ke through AI agent swarm code fix karta hai.
                </>
              ) : (
                <>
                  Your diagrams illustrate a production-grade <strong>Autonomous SRE & Repair Durability Architecture</strong>. Instead of stopping at <em>"Did the PR merge?"</em>, this system uses an OODA loop with GA4 telemetry, mathematical WSJF triage, Temporal-orchestrated AI agent swarms, and adaptive verification windows to measure <strong>real-world operational durability</strong>.
                </>
              )}
            </p>

            {/* Quick Answer Bullets */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2 bg-slate-900/60 border border-slate-800 p-2.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Full Closed-Loop OODA:</strong> Observe (GA4) → Orient (WSJF/RICE) → Act (Hive PRs) → Verify (Adaptive).
                </span>
              </div>
              <div className="flex items-start gap-2 bg-slate-900/60 border border-slate-800 p-2.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Durability Awareness:</strong> Fixes are classified as <em>Resolved, Partial, or Recurring</em>.
                </span>
              </div>
              <div className="flex items-start gap-2 bg-slate-900/60 border border-slate-800 p-2.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Temporal Multi-Agent Swarm:</strong> Durable state, parallel scanner & coder activities, human review gates.
                </span>
              </div>
              <div className="flex items-start gap-2 bg-slate-900/60 border border-slate-800 p-2.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Bifrost + KServe Gateway:</strong> Low-cost private open-weight LLMs + frontier models for complex fixes.
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreProducts}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <span>{lang === 'hi' ? '5 Product Concepts Dekhein' : 'Explore 5 Commercial Products'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onLaunchSimulation}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                <span>{lang === 'hi' ? 'Live OODA Simulation Chalao' : 'Run Live Incident Simulation'}</span>
              </button>

              <button
                onClick={onViewArchitecture}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <Workflow className="w-4 h-4" />
                <span>{lang === 'hi' ? 'Dono Diagrams Inspect Karein' : 'Inspect Both Blueprints'}</span>
              </button>
            </div>
          </div>

          {/* Key Metric Highlights Card */}
          <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-sm">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-800 flex items-center justify-between">
              <span>Architecture Specs</span>
              <span className="text-emerald-400">Production Ready</span>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <div className="text-xs text-slate-400">Core Paradigm Shift</div>
                <div className="text-sm font-medium text-white mt-0.5">
                  CI/CD Merge <span className="text-slate-500">→</span> Post-Merge Telemetry Durability
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                  <div className="text-xs text-slate-400">Total Layers</div>
                  <div className="text-xl font-mono font-bold text-indigo-400 tabular-nums">6 Layers</div>
                  <div className="text-[11px] text-slate-500">Observe to Learn</div>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                  <div className="text-xs text-slate-400">Workflow Engine</div>
                  <div className="text-xl font-mono font-bold text-sky-400">Temporal</div>
                  <div className="text-[11px] text-slate-500">Durable Execution</div>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                  <div className="text-xs text-slate-400">Triage Math</div>
                  <div className="text-xl font-mono font-bold text-amber-400">WSJF + RICE</div>
                  <div className="text-[11px] text-slate-500">Cost of Delay</div>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                  <div className="text-xs text-slate-400">Model Gateway</div>
                  <div className="text-xl font-mono font-bold text-emerald-400">Bifrost</div>
                  <div className="text-[11px] text-slate-500">KServe + OpenEverest</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-200">
                <span className="font-semibold text-white">The Big Commercial Opportunity:</span> Every company has CI/CD, but 99% of them lack post-merge durability awareness. Building this solves the $2.08T cost of bad software quality.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

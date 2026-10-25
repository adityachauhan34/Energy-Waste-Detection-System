import React from 'react';
import { ShieldCheck, CheckCircle2, AlertOctagon, RotateCcw, TrendingUp, DollarSign, Clock, RefreshCw } from 'lucide-react';

interface DurabilityMetricsViewProps {
  lang: 'en' | 'hi';
}

export const DurabilityMetricsView: React.FC<DurabilityMetricsViewProps> = ({ lang }) => {
  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-block bg-[#FFE500] text-black border-2 border-black font-mono font-black text-xs px-2.5 py-0.5 shadow-[2px_2px_0px_0px_#000] uppercase">
            LAYERS 04 & 05: ADAPTIVE VERIFICATION & OUTCOME CLASSIFICATION
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-black mt-2">
            {lang === 'hi' ? 'Post-Maintenance Durability Engine' : 'Post-Maintenance Durability & Verification Engine'}
          </h2>
          <p className="text-sm text-neutral-700 font-medium mt-1 max-w-2xl">
            {lang === 'hi'
              ? 'Sirf ticket band karna kaafi nahi hai. Hum verify karte hain ki power consumption sach mein baseline par stabilize hui ya nahi.'
              : 'Closing the gap between detecting a problem and verifying it has been fixed. Moving from "Did the tech close the work order?" to "Did the factory energy baseline actually stabilize?"'}
          </p>
        </div>

        <div className="p-3 bg-[#D1FAE5] border-2 border-black shadow-[3px_3px_0px_0px_#000] flex items-center gap-2 text-xs text-black font-mono font-black">
          <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
          <span>DURABILITY INDEX: 96.8%</span>
        </div>
      </div>

      {/* Philosophy Banner in Cyber Yellow Neo Card */}
      <div className="mb-8 p-6 bg-[#FFE500] border-[3px] border-black shadow-[5px_5px_0px_0px_#000] text-black">
        <h3 className="text-lg font-black flex items-center gap-2 uppercase tracking-tight">
          <span className="w-3 h-3 bg-black border border-white" />
          <span>The Defining Paradigm Shift in Energy Management</span>
        </h3>
        <p className="mt-2 text-sm font-medium leading-relaxed max-w-3xl">
          Traditional energy software stops at <em>"Energy is high, here is an alert."</em> Traditional CMMS stops at <em>"Work order marked complete."</em> Neither system measures whether the maintenance actually solved the energy leak. VoltHive binds sub-meter telemetry to post-repair observation windows to evaluate true operational durability.
        </p>
      </div>

      {/* The 3 Adaptive Verification Windows */}
      <div className="mb-8 space-y-3">
        <div className="text-xs font-mono font-black uppercase text-black">
          DYNAMIC VERIFICATION WINDOW PROFILES
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-white border-[2.5px] border-black shadow-[4px_4px_0px_0px_#000] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-black text-black uppercase bg-[#E0F2FE] px-2 py-0.5 border border-black">PROFILE 1: CANARY</span>
              <span className="text-xs font-mono text-black font-black">1-Hour Window</span>
            </div>
            <div className="text-sm font-black text-black">Immediate Post-Fix Power Spike Check</div>
            <p className="text-xs text-neutral-700 font-medium leading-relaxed">
              Verifies initial electrical restart. Asserts that motor startup current surge settles smoothly without trip flags or phase imbalance.
            </p>
            <div className="pt-2 border-t border-black text-[11px] font-mono font-bold text-neutral-600">
              Trigger: Routine filter replacements & sensor re-alignments.
            </div>
          </div>

          <div className="p-5 bg-white border-[2.5px] border-black shadow-[4px_4px_0px_0px_#000] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-black text-black uppercase bg-[#FEF08A] px-2 py-0.5 border border-black">PROFILE 2: SHIFT</span>
              <span className="text-xs font-mono text-black font-black">12-Hour Window</span>
            </div>
            <div className="text-sm font-black text-black">Full Duty-Cycle & Load Variation Test</div>
            <p className="text-xs text-neutral-700 font-medium leading-relaxed">
              Monitors machine through peak production, shift changeover, and idle intervals. Ensures variable speed drives modulate correctly.
            </p>
            <div className="pt-2 border-t border-black text-[11px] font-mono font-bold text-neutral-600">
              Trigger: Chiller tube descaling, hydraulic relief valve overhaul.
            </div>
          </div>

          <div className="p-5 bg-[#D1FAE5] border-[2.5px] border-black shadow-[4px_4px_0px_0px_#000] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-black text-black uppercase bg-black text-[#FFE500] px-2 py-0.5 border border-black">PROFILE 3: STRICT</span>
              <span className="text-xs font-mono text-black font-black">48-Hour Lock</span>
            </div>
            <div className="text-sm font-black text-black">Multi-Day Statistical Stability Assertion</div>
            <p className="text-xs text-neutral-800 font-bold leading-relaxed">
              Continuous 48h sub-meter analysis across weekend/overnight standbys. Requires zero recurring anomalies before marking incident RESOLVED.
            </p>
            <div className="pt-2 border-t border-black text-[11px] font-mono font-bold text-neutral-700">
              Trigger: Recurring air leaks, high-cost compressed air overhauls.
            </div>
          </div>
        </div>
      </div>

      {/* Outcome Classification Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-5 bg-[#D1FAE5] border-[2.5px] border-black shadow-[4px_4px_0px_0px_#000] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-black text-black uppercase">OUTCOME: RESOLVED</span>
            <span className="text-[10px] font-mono font-bold bg-black text-white px-1.5 py-0.5">DURABLE</span>
          </div>
          <div className="text-sm font-black text-black">Power returned to baseline nominal target</div>
          <p className="text-xs text-neutral-800 font-medium leading-relaxed">
            Telemetry is &lt; 2% of baseline for &gt; 48 hours. Work order formally certified. ROI recorded in factory ESG scorecard.
          </p>
        </div>

        <div className="p-5 bg-[#FEF08A] border-[2.5px] border-black shadow-[4px_4px_0px_0px_#000] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-black text-black uppercase">OUTCOME: PARTIAL</span>
            <span className="text-[10px] font-mono font-bold bg-black text-white px-1.5 py-0.5">AUDIT NEEDED</span>
          </div>
          <div className="text-sm font-black text-black">Power reduced by 40-70% but not nominal</div>
          <p className="text-xs text-neutral-800 font-medium leading-relaxed">
            Example: Main flange leak was tightened, but branch line unloader is still bleeding 15 kW. Dispatches secondary audit.
          </p>
        </div>

        <div className="p-5 bg-[#FEE2E2] border-[2.5px] border-black shadow-[4px_4px_0px_0px_#000] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-black text-black uppercase">OUTCOME: RECURRING</span>
            <span className="text-[10px] font-mono font-bold bg-[#FF6B4A] text-black px-1.5 py-0.5 border border-black font-black">REGRESSION</span>
          </div>
          <div className="text-sm font-black text-black">Power dropped briefly, then surged again</div>
          <p className="text-xs text-neutral-800 font-medium leading-relaxed">
            Example: Quick-patch tape failed under high pressure. Automatically increments recurrence counter and escalates to plant engineer.
          </p>
        </div>
      </div>

      {/* Durability Memory Box */}
      <div className="p-6 bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_#000] space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono uppercase tracking-wider text-black font-black bg-[#FFE500] px-2 py-0.5 border border-black shadow-[1.5px_1.5px_0px_0px_#000]">
            DURABILITY MEMORY & REPEAT FAILURE PREVENTION
          </div>
          <span className="text-xs font-mono font-black text-black">38 Repeat Leaks Prevented</span>
        </div>
        <p className="text-xs sm:text-sm text-neutral-800 font-medium leading-relaxed">
          The AI maintains an indexed vector knowledge base of every historic maintenance action, parts used, and post-repair telemetry outcome. When an anomaly occurs on Compressor #3, the AI checks its Durability Memory to ensure it doesn't suggest a gasket brand or patch method that failed within 2 weeks previously.
        </p>
      </div>
    </section>
  );
};

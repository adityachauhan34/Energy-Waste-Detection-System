import React, { useState } from 'react';
import { Workflow, Play, RefreshCw, CheckCircle2, AlertOctagon, Terminal, Cpu, Clock, Shield } from 'lucide-react';

interface TemporalAgentInspectorProps {
  lang: 'en' | 'hi';
}

interface WorkflowActivity {
  id: string;
  name: string;
  agentRole: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED_RETRYING';
  duration: string;
  logs: string[];
}

export const TemporalAgentInspector: React.FC<TemporalAgentInspectorProps> = ({ lang }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [chaosMode, setChaosMode] = useState<boolean>(false);
  const [activeWorkflowId, setActiveWorkflowId] = useState<string>('wf-repair-849102');

  const [activities, setActivities] = useState<WorkflowActivity[]>([
    {
      id: 'act-1',
      name: 'ScanCodebaseASTActivity',
      agentRole: 'Scanner Agent (Tree-sitter)',
      status: 'COMPLETED',
      duration: '1.2s',
      logs: [
        'Parsing src/lib/realtime/WebSocketClient.ts AST...',
        'Identified infinite loop in reconnect() method at line 42.',
        'Extracted 3 callers in checkout UI tree.',
      ],
    },
    {
      id: 'act-2',
      name: 'RetrieveDomainEvidenceActivity',
      agentRole: 'RAG Evidence Agent',
      status: 'COMPLETED',
      duration: '0.8s',
      logs: [
        'Querying vector index for past websocket disconnect postmortems...',
        'Retrieved architectural guideline: "All client sockets MUST implement jittered backoff".',
        'Injected evidence into patch generation prompt.',
      ],
    },
    {
      id: 'act-3',
      name: 'GeneratePatchActivity',
      agentRole: 'LLM Coder (Bifrost Gateway / KServe)',
      status: 'COMPLETED',
      duration: '3.4s',
      logs: [
        'Routing task to KServe OpenEverest (Qwen2.5-Coder-32B)...',
        'Generated backoff implementation with Math.min(1000 * 1.5^attempts, 30000).',
        'Syntax check PASSED. Linter verified clean.',
      ],
    },
    {
      id: 'act-4',
      name: 'AdaptiveCanaryVerificationActivity',
      agentRole: 'Verification Agent',
      status: 'RUNNING',
      duration: '45s elapsed',
      logs: [
        'Spawned 500 synthetic websocket connections against canary pod...',
        'Connection dropped 0 times under simulated latency spikes.',
        'Awaiting strict observation window completion...',
      ],
    },
    {
      id: 'act-5',
      name: 'HumanReviewSignalWait',
      agentRole: 'Governance Gate (Temporal Signal)',
      status: 'PENDING',
      duration: 'Awaiting',
      logs: ['Workflow listening for approval signal on channel: humanReviewApproval...'],
    },
  ]);

  const triggerChaosTest = () => {
    setChaosMode(true);
    // Simulate crash and durable recovery
    setActivities((prev) =>
      prev.map((act) =>
        act.id === 'act-4'
          ? {
              ...act,
              status: 'FAILED_RETRYING',
              logs: [
                ...act.logs,
                '[CHAOS INJECTED] Worker container terminated (SIGKILL)!',
                '[TEMPORAL DURABILITY] Heartbeat timed out. Temporal re-routing activity to worker-node-04...',
                '[RECOVERY] Workflow state restored from history. Resuming verification without restart!',
              ],
            }
          : act
      )
    );

    setTimeout(() => {
      setActivities((prev) =>
        prev.map((act) =>
          act.id === 'act-4'
            ? {
                ...act,
                status: 'RUNNING',
                logs: [...act.logs, 'Verification resumed smoothly on node-04.'],
              }
            : act
        )
      );
      setChaosMode(false);
    }, 3000);
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
            DIAGRAM 2 BACKEND ARCHITECTURE
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            {lang === 'hi'
              ? 'Temporal Workflow & Multi-Agent Swarm'
              : 'Temporal Durable Engine & Multi-Agent Swarm'}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            {lang === 'hi'
              ? 'Diagram 2 ke hisaab se: Web app -> Temporal workflow engine -> Bifrost Model Gateway -> Domain evidence. Yeh durable state maintain karta hai.'
              : 'Inspect how Temporal orchestrates parallel agents (Scanner, RAG, Coder, Verifier) with durable state that never crashes mid-repair.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={triggerChaosTest}
            disabled={chaosMode}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 hover:bg-rose-900/60 transition-all cursor-pointer disabled:opacity-50"
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>{chaosMode ? 'Recovering...' : 'Test Chaos: Kill Worker Node'}</span>
          </button>
        </div>
      </div>

      {/* Workflow Status Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 mb-6 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sky-950/60 border border-sky-500/30 text-sky-400">
            <Workflow className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono text-slate-400">TEMPORAL WORKFLOW INSTANCE</div>
            <div className="text-sm font-bold font-mono text-white flex items-center gap-2">
              <span>{activeWorkflowId}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-normal">
                RUNNING (DURABLE)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono">
          <div>
            <span className="text-slate-500">TASK QUEUE:</span>{' '}
            <span className="text-indigo-300">hive-repair-queue</span>
          </div>
          <div>
            <span className="text-slate-500">MODEL GATEWAY:</span>{' '}
            <span className="text-emerald-300">Bifrost / KServe</span>
          </div>
          <div>
            <span className="text-slate-500">RETRIES:</span>{' '}
            <span className="text-sky-300">Exponential (Max 5)</span>
          </div>
        </div>
      </div>

      {/* Activity Timeline & Execution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Parallel Activities Flow */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-mono text-slate-400 px-2 pb-1">PARALLEL AGENT ACTIVITIES</div>

          {activities.map((act, index) => {
            const isCompleted = act.status === 'COMPLETED';
            const isRunningAct = act.status === 'RUNNING';
            const isFailed = act.status === 'FAILED_RETRYING';

            return (
              <div
                key={act.id}
                className={`p-4 rounded-xl border transition-all ${
                  isRunningAct
                    ? 'bg-slate-900 border-sky-500 shadow-md shadow-sky-500/10'
                    : isFailed
                    ? 'bg-rose-950/20 border-rose-500/60'
                    : 'bg-slate-950/80 border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500 font-bold">
                        0{index + 1}.
                      </span>
                      <span className="text-sm font-bold text-white">{act.name}</span>
                    </div>
                    <div className="text-xs text-sky-400 font-mono mt-0.5">{act.agentRole}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">{act.duration}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        isCompleted
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : isRunningAct
                          ? 'bg-sky-500/10 text-sky-400 border-sky-500/30 animate-pulse'
                          : isFailed
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {act.status}
                    </span>
                  </div>
                </div>

                {/* Activity Logs */}
                <div className="mt-3 p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-1 text-slate-300">
                  {act.logs.map((log, lIdx) => (
                    <div key={lIdx} className="flex items-start gap-1.5">
                      <span className="text-slate-600 select-none">&gt;</span>
                      <span className={log.includes('CHAOS') ? 'text-rose-400 font-bold' : log.includes('DURABILITY') ? 'text-amber-400' : ''}>
                        {log}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Architecture Blueprint & Model Gateway Specs */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Bifrost Model Gateway Specs</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In Image 2, the Model Gateway routes between <strong>Open-Weight LLMs (KServe + OpenEverest)</strong> and domain references:
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="font-semibold text-white mb-0.5">Open-Weight Local Cluster</div>
                <div className="text-slate-400 font-mono text-[11px]">KServe + vLLM / OpenEverest</div>
                <div className="text-slate-300 text-[11px] mt-1">
                  Handles 85% of code fixes (syntax, formatting, unit tests) with 0ms egress cost inside private VPC.
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="font-semibold text-white mb-0.5">Model Gateway (Bifrost)</div>
                <div className="text-slate-400 font-mono text-[11px]">Dynamic Router & Rate Limiter</div>
                <div className="text-slate-300 text-[11px] mt-1">
                  Evaluates token budgets, falls back to frontier models for multi-file architectural changes.
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="font-semibold text-white mb-0.5">Domain Data + Evaluation</div>
                <div className="text-slate-400 font-mono text-[11px]">Trusted references & audit logs</div>
                <div className="text-slate-300 text-[11px] mt-1">
                  Feeds structured API contracts, test suites, and compliance rules directly into the LLM context.
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200">
            <strong>Why Temporal is Essential Here:</strong> LLM agents take 30s to 5 minutes to generate and test code. Without Temporal, network disconnects or container restarts lose all progress. Temporal ensures 100% durable recovery.
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { ARCHITECTURE_LAYERS } from '../data/architectureData';
import { ArchitectureLayer, SystemLayerId } from '../types/architecture';
import { 
  Eye, 
  Terminal, 
  Layers, 
  Activity, 
  ShieldAlert, 
  CheckCircle, 
  FileCode, 
  Maximize2,
  ChevronRight,
  Info,
  Copy,
  Check
} from 'lucide-react';

interface ArchitectureExplorerProps {
  lang: 'en' | 'hi';
}

export const ArchitectureExplorer: React.FC<ArchitectureExplorerProps> = ({ lang }) => {
  const [selectedLayerId, setSelectedLayerId] = useState<SystemLayerId>('outcome-classification');
  const [viewMode, setViewMode] = useState<'interactive' | 'blueprints'>('interactive');
  const [selectedBlueprint, setSelectedBlueprint] = useState<'eraser' | 'temporal'>('eraser');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const selectedLayer = ARCHITECTURE_LAYERS.find((l) => l.id === selectedLayerId) || ARCHITECTURE_LAYERS[0];

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getOodaBadgeColor = (phase: string) => {
    switch (phase) {
      case 'OBSERVE':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'ORIENT + DECIDE':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'ACT':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'VERIFY':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'EVALUATE':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'LEARN':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            SYSTEM ARCHITECTURE DEEP DIVE
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            {lang === 'hi'
              ? 'Complete System Architecture Blueprint'
              : 'Interactive 6-Layer Architecture Blueprint'}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {lang === 'hi'
              ? 'OODA Loop (Observe, Orient, Decide, Act) + Post-Merge Durability Verification'
              : 'End-to-End OODA Loop with Post-Merge Durability Verification & Temporal multi-agent backend'}
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
          <button
            onClick={() => setViewMode('interactive')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              viewMode === 'interactive'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Interactive Flow & Code
          </button>
          <button
            onClick={() => setViewMode('blueprints')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              viewMode === 'blueprints'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Original User Diagrams
          </button>
        </div>
      </div>

      {viewMode === 'blueprints' ? (
        /* Image Viewer for Uploaded Blueprints */
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedBlueprint('eraser')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedBlueprint === 'eraser'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                Diagram 1: Eraser 6-Layer Durability Architecture
              </button>
              <button
                onClick={() => setSelectedBlueprint('temporal')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedBlueprint === 'temporal'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                Diagram 2: Temporal Engine & Bifrost Gateway
              </button>
            </div>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              Uploaded by user from WhatsApp
            </span>
          </div>

          <div className="flex flex-col items-center">
            {selectedBlueprint === 'eraser' ? (
              <div className="space-y-4 w-full">
                <div className="overflow-hidden rounded-xl border border-slate-800 bg-black max-h-[620px] flex items-center justify-center">
                  <img
                    src="/public/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.26.53_AM_a12fc94b.jpeg"
                    alt="Eraser 6-Layer Architecture"
                    className="max-h-[600px] w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-indigo-400">Diagram Summary:</strong> Shows how operational telemetry from GA4 feeds into the Triage Layer (RICE, WSJF, Error Budgets). From there, the Hive Orchestration Layer generates AI PRs. The critical missing capability it introduces is the <strong>Adaptive Verification Layer</strong> and <strong>Outcome Classification Layer</strong> (Resolved, Partial, Recurring), asking: <em>"Did the system actually stabilize afterward?"</em>
                </div>
              </div>
            ) : (
              <div className="space-y-4 w-full">
                <div className="overflow-hidden rounded-xl border border-slate-800 bg-black max-h-[500px] flex items-center justify-center">
                  <img
                    src="/public/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.57.06_AM_3ea960a8.jpeg"
                    alt="Temporal and Bifrost Architecture"
                    className="max-h-[480px] w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-indigo-400">Diagram Summary:</strong> Illustrates the underlying workflow backend. The domain-specific web portal talks to the <strong>Temporal workflow engine</strong> for durable state, retries, and parallel agents. The model gateway (<strong>Bifrost</strong>) routes between open-weight LLMs (<strong>KServe + OpenEverest</strong>) and domain data/evaluations.
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Interactive 6-Layer Inspector */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Layer Navigation List */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-xs font-mono text-slate-400 px-2 pb-1 flex items-center justify-between">
              <span>SELECT A LAYER TO INSPECT</span>
              <span>6 LAYERS + INFRA</span>
            </div>

            {ARCHITECTURE_LAYERS.map((layer) => {
              const isSelected = selectedLayer.id === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => setSelectedLayerId(layer.id)}
                  className={`w-full p-3.5 rounded-xl text-left transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10'
                      : 'bg-slate-950/80 border-slate-800/80 hover:bg-slate-900/40 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-500">
                        {layer.number}
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {layer.name}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getOodaBadgeColor(
                        layer.oodaPhase
                      )}`}
                    >
                      {layer.oodaPhase}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 line-clamp-1">
                    {layer.headline}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Layer Inspector Detail Card */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
            {/* Layer Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-indigo-400 font-bold">
                    LAYER {selectedLayer.number}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getOodaBadgeColor(
                      selectedLayer.oodaPhase
                    )}`}
                  >
                    OODA: {selectedLayer.oodaPhase}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{selectedLayer.name}</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {selectedLayer.description}
                </p>
              </div>
            </div>

            {/* Subcomponents Grid */}
            <div className="mt-5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Key Components & Algorithms
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedLayer.components.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-white">{comp.name}</span>
                      <span className="text-[10px] font-mono text-indigo-400 uppercase">
                        {comp.type}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mb-1.5">{comp.description}</div>
                    <div className="text-[10px] font-mono text-slate-500 truncate">
                      Tech: {comp.tech}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scripts from Diagram */}
            {selectedLayer.scripts.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Reference Script: {selectedLayer.scripts[0].name}</span>
                  </h4>
                  <button
                    onClick={() =>
                      handleCopy(selectedLayer.scripts[0].code, selectedLayer.scripts[0].name)
                    }
                    className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCode === selectedLayer.scripts[0].name ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <div className="bg-slate-900/60 px-3 py-1.5 text-[11px] font-mono text-slate-400 border-b border-slate-800">
                    {selectedLayer.scripts[0].purpose}
                  </div>
                  <pre className="p-3 text-xs font-mono text-emerald-300 overflow-x-auto max-h-48 leading-relaxed">
                    <code>{selectedLayer.scripts[0].code}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Why This Layer Is Game-Changing */}
            <div className="mt-6 p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
              <div className="text-xs font-bold text-indigo-300 flex items-center gap-1.5 mb-1">
                <Info className="w-3.5 h-3.5" />
                <span>Why This Layer Is Breakthrough vs Traditional Ops</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedLayer.missingInTraditionalOps}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

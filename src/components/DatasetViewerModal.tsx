import React, { useState } from 'react';
import { X, Copy, Check, Download, Database, FileText, CheckCircle2 } from 'lucide-react';
import { FACTORY_MACHINES, INITIAL_ENERGY_INCIDENTS, INITIAL_FACTORY_KPIS } from '../data/energyData';

interface DatasetViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DatasetViewerModal: React.FC<DatasetViewerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'machines' | 'incidents' | 'kpis' | 'readme'>('machines');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const datasetPayload = {
    metadata: {
      title: "VoltHive Industrial Energy Telemetry Dataset",
      version: "1.0.0",
      created: "2026-10-25",
      records: {
        machines: FACTORY_MACHINES.length,
        incidents: INITIAL_ENERGY_INCIDENTS.length,
      }
    },
    machines: FACTORY_MACHINES,
    incidents: INITIAL_ENERGY_INCIDENTS,
    kpis: INITIAL_FACTORY_KPIS,
  };

  const getActiveContent = () => {
    switch (activeTab) {
      case 'machines':
        return JSON.stringify(FACTORY_MACHINES, null, 2);
      case 'incidents':
        return JSON.stringify(INITIAL_ENERGY_INCIDENTS, null, 2);
      case 'kpis':
        return JSON.stringify(INITIAL_FACTORY_KPIS, null, 2);
      case 'readme':
        return `# VoltHive Dataset Reference & Architecture
File locations:
- /README.md: Complete project overview and schema docs
- /public/dataset.json: Direct raw JSON export for external tools (Pandas/SCADA)
- /src/data/energyData.ts: Active TypeScript dataset used by React components

Total sub-metered assets: ${FACTORY_MACHINES.length}
Active anomaly incidents: ${INITIAL_ENERGY_INCIDENTS.length}
Primary anomaly: CMP-03-PNEUM (Excess 47.4 kW, $7.11/hr waste)`;
      default:
        return '';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(datasetPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `volthive-energy-dataset-${activeTab}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px] animate-in fade-in duration-150">
      <div className="bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_#000] w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-[#FFE500] border-b-2 border-black flex items-center justify-between text-black">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-black text-[#FFE500] border border-black shadow-[2px_2px_0px_0px_#000]">
              <Database className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-black uppercase">FACTORY TELEMETRY DATASET & README</div>
              <h3 className="text-base font-black font-mono">
                /public/dataset.json & /README.md
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] text-xs font-black hover:bg-neutral-100 transition-colors cursor-pointer"
              title="Copy active view"
            >
              {copied ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5 stroke-[2.5]" />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-[#FFE500] border-2 border-black shadow-[2px_2px_0px_0px_#000] text-xs font-black hover:bg-neutral-900 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>DOWNLOAD JSON</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Tab Selection Row */}
        <div className="flex items-center gap-2 p-3 bg-neutral-100 border-b-2 border-black overflow-x-auto">
          {[
            { id: 'machines', label: '1. Machines Dataset (6 Assets)' },
            { id: 'incidents', label: '2. Incident & Sensor Telemetry' },
            { id: 'kpis', label: '3. Plant KPIs & Savings' },
            { id: 'readme', label: '4. README Documentation' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-mono font-black border-2 border-black transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#FFE500] text-black shadow-[2px_2px_0px_0px_#000] translate-x-[-1px] translate-y-[-1px]'
                  : 'bg-white text-neutral-800 hover:bg-neutral-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code Content Area */}
        <div className="p-4 flex-1 overflow-y-auto bg-neutral-950 text-neutral-100 font-mono text-xs">
          <pre className="p-2 overflow-x-auto leading-relaxed text-emerald-400">
            <code>{getActiveContent()}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="p-3 border-t-2 border-black bg-white flex items-center justify-between text-xs font-mono text-neutral-700">
          <span>Format: Standard JSON / TypeScript Schema</span>
          <span className="font-bold text-black">Location: /public/dataset.json & /README.md</span>
        </div>
      </div>
    </div>
  );
};

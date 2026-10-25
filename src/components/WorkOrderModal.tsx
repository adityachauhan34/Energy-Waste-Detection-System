import React, { useState } from 'react';
import { EnergyIncident } from '../types/energy';
import { X, Copy, Check, Printer, ShieldAlert, Wrench, FileText, CheckCircle2 } from 'lucide-react';

interface WorkOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: EnergyIncident;
}

export const WorkOrderModal: React.FC<WorkOrderModalProps> = ({
  isOpen,
  onClose,
  incident,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const text = `VOLTHIVE MAINTENANCE WORK ORDER: ${incident.workOrder.ticketId}
Target Machine: ${incident.machineName} (${incident.location})
Priority: ${incident.workOrder.priority} | WSJF Score: ${incident.wsjf.score}
Assigned Tech: ${incident.workOrder.assignedTech}

DIAGNOSED ROOT CAUSE:
${incident.rootCauseTitle}
${incident.rootCauseDescription}

RECOMMENDED ACTION:
${incident.recommendedFix}

PARTS REQUIRED:
${incident.requiredParts.join(', ')}

CHECKLIST & LOTO STEPS:
${incident.workOrder.checklist.map((c, i) => `${i + 1}. [ ] ${c}`).join('\n')}

POST-MAINTENANCE DURABILITY REQUIREMENT:
Observe sub-meter for 48 hours. Target nominal draw: ${incident.verification.baselineTargetKw} kW (±0.5 kW).
Outcome must reach RESOLVED before ticket close certification.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px] animate-in fade-in duration-150">
      <div className="bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_#000] w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header (Cyber Yellow + Black) */}
        <div className="p-4 bg-[#FFE500] border-b-2 border-black flex items-center justify-between text-black">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-black text-[#FFE500] border border-black shadow-[2px_2px_0px_0px_#000]">
              <FileText className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-black uppercase">MAINTENANCE WORK ORDER</div>
              <h3 className="text-base font-black font-mono">
                {incident.workOrder.ticketId}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-1.5 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-100 transition-colors cursor-pointer"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4 stroke-[2.5]" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-neutral-50 border-2 border-black shadow-[2px_2px_0px_0px_#000] font-mono text-xs">
            <div>
              <span className="text-neutral-500 font-bold">MACHINE:</span>
              <div className="text-black font-black truncate">{incident.machineName}</div>
            </div>
            <div>
              <span className="text-neutral-500 font-bold">LOCATION:</span>
              <div className="text-black font-black truncate">{incident.location}</div>
            </div>
            <div>
              <span className="text-neutral-500 font-bold">PRIORITY:</span>
              <div className="text-black font-black bg-[#FF6B4A] px-1 border border-black">{incident.workOrder.priority}</div>
            </div>
            <div>
              <span className="text-neutral-500 font-bold">TECH:</span>
              <div className="text-black font-black">{incident.workOrder.assignedTech}</div>
            </div>
            <div>
              <span className="text-neutral-500 font-bold">EXCESS DRAW:</span>
              <div className="text-black font-black">+{incident.excessKw.toFixed(1)} kW</div>
            </div>
            <div>
              <span className="text-neutral-500 font-bold">MONTHLY LOSS:</span>
              <div className="text-black font-black bg-[#FFE500] px-1 border border-black">${incident.estimatedWasteDollarsPerMonth.toLocaleString()}</div>
            </div>
          </div>

          {/* Root Cause Section */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-mono uppercase text-black font-black">
              Diagnosed Root Cause & Sensor Correlation
            </h4>
            <div className="p-3.5 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] text-xs text-neutral-800 space-y-2 leading-relaxed">
              <strong className="text-black font-black">{incident.rootCauseTitle}</strong>
              <p className="font-medium">{incident.rootCauseDescription}</p>
              <div className="text-neutral-600 text-[11px] pt-1 border-t border-black font-mono font-bold">
                Rule-out check: Production output verified steady at 340 units/hr. Vibration elevated at 4.6 mm/s.
              </div>
            </div>
          </div>

          {/* Recommended Action & Parts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-[#FFFDF5] border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-1">
              <span className="text-xs font-mono text-black font-black">RECOMMENDED ACTION</span>
              <div className="text-xs text-neutral-800 font-medium">{incident.recommendedFix}</div>
            </div>
            <div className="p-3.5 bg-[#FEF08A] border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-1">
              <span className="text-xs font-mono text-black font-black">PARTS REQUIRED</span>
              <div className="text-xs text-black font-mono font-black">{incident.requiredParts.join(', ')}</div>
            </div>
          </div>

          {/* Action Checklist */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase text-black font-black">
              LOTO Safety & Execution Checklist
            </h4>
            <div className="space-y-1.5">
              {incident.workOrder.checklist.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2 bg-neutral-50 border border-black text-xs font-medium text-black">
                  <div className="w-4 h-4 bg-white border-2 border-black shrink-0" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Post-Maintenance Durability Requirement */}
          <div className="p-4 bg-[#D1FAE5] border-2 border-black shadow-[3px_3px_0px_0px_#000] text-xs text-neutral-900 space-y-1.5 font-medium">
            <div className="font-black text-black flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 stroke-[3]" />
              <span>Mandatory Durability Verification Window (48 Hours)</span>
            </div>
            <p className="leading-relaxed">
              Ticket cannot be permanently closed upon wrench-turn. Sub-meter telemetry must remain below <strong>{incident.verification.baselineTargetKw} kW (±0.5 kW)</strong> for 48 consecutive hours to certify permanent resolution.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-black bg-neutral-50 flex items-center justify-between">
          <div className="text-xs text-black font-mono font-bold">
            VoltHive Closed-Loop Agent
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-black text-black bg-[#FFE500] hover:bg-[#FFD700] border-2 border-black shadow-[2px_2px_0px_0px_#000] cursor-pointer"
          >
            CLOSE WORK ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

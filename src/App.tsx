/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EnergyHeader } from './components/EnergyHeader';
import { EnergyHero } from './components/EnergyHero';
import { ClosedLoopAgentPipeline } from './components/ClosedLoopAgentPipeline';
import { FactoryFloorView } from './components/FactoryFloorView';
import { LiveAnomalySimulator } from './components/LiveAnomalySimulator';
import { WsjfEnergyTriage } from './components/WsjfEnergyTriage';
import { DurabilityMetricsView } from './components/DurabilityMetricsView';
import { AiEnergyAdvisor } from './components/AiEnergyAdvisor';
import { WorkOrderModal } from './components/WorkOrderModal';
import { DatasetViewerModal } from './components/DatasetViewerModal';
import { FACTORY_MACHINES, INITIAL_ENERGY_INCIDENTS, INITIAL_FACTORY_KPIS } from './data/energyData';
import { FactoryMachine, EnergyIncident, FactoryKPIs } from './types/energy';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('pipeline');
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [machines, setMachines] = useState<FactoryMachine[]>(FACTORY_MACHINES);
  const [currentIncident, setCurrentIncident] = useState<EnergyIncident>(INITIAL_ENERGY_INCIDENTS[0]);
  const [kpis, setKpis] = useState<FactoryKPIs>(INITIAL_FACTORY_KPIS);
  const [isWorkOrderOpen, setIsWorkOrderOpen] = useState<boolean>(false);
  const [isDatasetOpen, setIsDatasetOpen] = useState<boolean>(false);

  const handleSelectMachine = (machine: FactoryMachine) => {
    // If machine has an active incident, switch to it
    const matchingInc = INITIAL_ENERGY_INCIDENTS.find((inc) => inc.machineId === machine.id);
    if (matchingInc) {
      setCurrentIncident(matchingInc);
    }
  };

  const handleUpdateIncident = (updated: EnergyIncident) => {
    setCurrentIncident(updated);
    // If resolved, update KPI savings and durability score
    if (updated.verification.outcome === 'RESOLVED') {
      setKpis((prev) => ({
        ...prev,
        currentWasteRateKw: Math.max(0, prev.currentWasteRateKw - updated.excessKw),
        costRateWastedDollarsPerHour: Math.max(0, prev.costRateWastedDollarsPerHour - updated.estimatedWasteDollarsPerHour),
        monthlySavingsRealizedDollars: prev.monthlySavingsRealizedDollars + updated.estimatedWasteDollarsPerMonth,
        durabilityFixRate: 98.2,
        recurringLeaksPrevented: prev.recurringLeaksPrevented + 1,
      }));

      // Update machine status on factory floor
      setMachines((prev) =>
        prev.map((m) =>
          m.id === updated.machineId
            ? {
                ...m,
                currentPowerKw: updated.verification.baselineTargetKw,
                status: 'OPTIMAL',
              }
            : m
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-neutral-900 flex flex-col font-sans selection:bg-[#FFE500] selection:text-black">
      {/* 1. Industrial IoT Top Bar Contract */}
      <EnergyHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        kpis={kpis}
        onOpenWorkOrder={() => setIsWorkOrderOpen(true)}
        onOpenDataset={() => setIsDatasetOpen(true)}
        lang={lang}
        setLang={setLang}
      />

      {/* 2. Hero Overview (Addresses the specific user problem & solution) */}
      <EnergyHero
        kpis={kpis}
        lang={lang}
        onLaunchPipeline={() => setActiveTab('pipeline')}
        onExploreFloor={() => setActiveTab('factory-floor')}
        onRunSimulation={() => setActiveTab('simulation')}
      />

      {/* 3. Main Workspace Views */}
      <main className="flex-1">
        {activeTab === 'pipeline' && (
          <ClosedLoopAgentPipeline
            incident={currentIncident}
            onUpdateIncident={handleUpdateIncident}
            lang={lang}
          />
        )}

        {activeTab === 'factory-floor' && (
          <FactoryFloorView
            machines={machines}
            onSelectMachine={handleSelectMachine}
            onLaunchPipelineForMachine={(mac) => {
              handleSelectMachine(mac);
              setActiveTab('pipeline');
            }}
            lang={lang}
          />
        )}

        {activeTab === 'simulation' && (
          <LiveAnomalySimulator lang={lang} />
        )}

        {activeTab === 'wsjf-triage' && (
          <WsjfEnergyTriage lang={lang} />
        )}

        {activeTab === 'durability' && (
          <DurabilityMetricsView lang={lang} />
        )}

        {activeTab === 'ai-engineer' && (
          <AiEnergyAdvisor lang={lang} />
        )}
      </main>

      {/* 4. Maintenance Work Order Inspection Modal */}
      <WorkOrderModal
        isOpen={isWorkOrderOpen}
        onClose={() => setIsWorkOrderOpen(false)}
        incident={currentIncident}
      />

      {/* 5. Telemetry Dataset & README Modal */}
      <DatasetViewerModal
        isOpen={isDatasetOpen}
        onClose={() => setIsDatasetOpen(false)}
      />

      {/* 6. Neobrutalist Editorial Footer */}
      <footer className="border-t-[3px] border-black bg-white py-6 px-4 sm:px-6 lg:px-8 text-xs text-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-black bg-[#FFE500] px-2 py-0.5 border border-black shadow-[1.5px_1.5px_0px_0px_#000] font-mono">
              VOLTHIVE
            </span>
            <span className="font-bold">Autonomous Factory Energy Waste & Durability Engine</span>
          </div>
          <div className="text-neutral-700 font-medium">
            Closing the gap between detecting a problem and verifying it has been fixed.
          </div>
        </div>
      </footer>
    </div>
  );
}

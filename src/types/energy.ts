export type AnomalySeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type MachineCategory = 
  | 'Compressed Air'
  | 'HVAC & Chillers'
  | 'Motors & Drives'
  | 'Hydraulics & Molding'
  | 'Transformers & Distribution';

export type OutcomeClassification = 'RESOLVED' | 'PARTIAL' | 'RECURRING' | 'MONITORING';

export interface FactoryMachine {
  id: string;
  name: string;
  tag: string;
  location: string;
  category: MachineCategory;
  nominalPowerKw: number;
  currentPowerKw: number;
  baselineKw: number;
  status: 'OPTIMAL' | 'ANOMALY_DETECTED' | 'MAINTENANCE_IN_PROGRESS' | 'VERIFYING_DURABILITY';
  activeAnomalyId?: string;
  powerFactor: number;
  dailyCost: number;
  runningHoursPerDay: number;
}

export interface SensorReading {
  timestamp: string;
  powerKw: number;
  vibrationMmS: number;
  temperatureC: number;
  productionUnitsPerHour: number;
  pressureBar?: number;
}

export interface EnergyIncident {
  id: string;
  machineId: string;
  machineName: string;
  location: string;
  category: MachineCategory;
  severity: AnomalySeverity;
  detectedAt: string;
  
  // Step 1: Detect
  metricAnomalous: string;
  excessKw: number; // Current - Baseline
  estimatedWasteDollarsPerHour: number;
  estimatedWasteDollarsPerMonth: number;
  co2KgPerHour: number;
  detectionConfidence: number; // e.g. 0.94
  
  // Step 2: Investigate (Correlations)
  sensorCorrelations: {
    productionSurgeRuledOut: boolean;
    productionExplanation: string;
    vibrationAnomalyDetected: boolean;
    vibrationDetails: string;
    temperatureAnomalyDetected: boolean;
    temperatureDetails: string;
    pressureLossDetected?: boolean;
    pressureDetails?: string;
  };
  
  // Step 3: Most Likely Root Cause
  rootCauseTitle: string;
  rootCauseDescription: string;
  alternativeCausesConsidered: { cause: string; probability: number; reasonDismissed: string }[];
  recommendedFix: string;
  requiredParts: string[];
  estimatedFixTimeHours: number;
  
  // Triage & WSJF Priority
  wsjf: {
    financialWasteCost: number; // 1-10 (Dollars per day)
    productionRisk: number; // 1-10
    assetDamageRisk: number; // 1-10
    maintenanceJobSize: number; // 1-10 (time & crew required)
    score: number; // (Cost of Delay) / Job Size
  };
  
  // Step 4: Maintenance Work Order
  workOrder: {
    ticketId: string;
    assignedTech: string;
    priority: string;
    checklist: string[];
    dispatchStatus: 'PENDING' | 'DISPATCHED' | 'IN_PROGRESS' | 'COMPLETED';
    techNotes?: string;
  };
  
  // Step 5: Post-Maintenance Verification & Durability
  verification: {
    windowProfile: 'CANARY_1H' | 'SHIFT_12H' | 'DURABILITY_48H';
    windowHours: number;
    hoursObserved: number;
    postMaintenanceKw: number;
    baselineTargetKw: number;
    outcome: OutcomeClassification;
    recurrenceCount: number;
    stabilityScore: number; // 0-100%
  };

  telemetryHistory: SensorReading[];
}

export interface FactoryKPIs {
  totalActiveMachines: number;
  totalCurrentDemandKw: number;
  totalNominalBaselineKw: number;
  currentWasteRateKw: number;
  costRateWastedDollarsPerHour: number;
  monthlySavingsRealizedDollars: number;
  durabilityFixRate: number; // e.g. 96.4%
  meanTimeToDetectMinutes: number;
  meanTimeToRemediateHours: number;
  recurringLeaksPrevented: number;
}

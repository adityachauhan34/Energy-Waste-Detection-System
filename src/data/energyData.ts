import { FactoryMachine, EnergyIncident, FactoryKPIs } from '../types/energy';

export const FACTORY_MACHINES: FactoryMachine[] = [
  {
    id: 'mac-compressor-c3',
    name: 'Industrial Rotary Screw Compressor #3',
    tag: 'CMP-03-PNEUM',
    location: 'Utility Bay B - South Wing',
    category: 'Compressed Air',
    nominalPowerKw: 45.0,
    currentPowerKw: 92.4, // Massive anomaly!
    baselineKw: 45.0,
    status: 'ANOMALY_DETECTED',
    activeAnomalyId: 'inc-pneu-leak-401',
    powerFactor: 0.81,
    dailyCost: 288.4,
    runningHoursPerDay: 24,
  },
  {
    id: 'mac-chiller-beta',
    name: 'Central Process Water Chiller Beta',
    tag: 'CHL-02-HVAC',
    location: 'Central Plant Roof Level',
    category: 'HVAC & Chillers',
    nominalPowerKw: 88.0,
    currentPowerKw: 136.2, // Anomaly!
    baselineKw: 88.0,
    status: 'ANOMALY_DETECTED',
    activeAnomalyId: 'inc-chiller-foul-402',
    powerFactor: 0.86,
    dailyCost: 442.0,
    runningHoursPerDay: 24,
  },
  {
    id: 'mac-molding-cell4',
    name: 'Hydraulic Injection Molding Machine 4',
    tag: 'IMM-04-HYDR',
    location: 'Plastics Hall Bay 2',
    category: 'Hydraulics & Molding',
    nominalPowerKw: 55.0,
    currentPowerKw: 56.1,
    baselineKw: 55.0,
    status: 'OPTIMAL',
    powerFactor: 0.92,
    dailyCost: 198.0,
    runningHoursPerDay: 16,
  },
  {
    id: 'mac-conveyor-loop2',
    name: 'Packaging Line Conveyor Drive Loop 2',
    tag: 'CNV-02-DRIVE',
    location: 'Packaging & Warehouse Floor',
    category: 'Motors & Drives',
    nominalPowerKw: 18.0,
    currentPowerKw: 18.2,
    baselineKw: 18.0,
    status: 'OPTIMAL',
    powerFactor: 0.88,
    dailyCost: 65.0,
    runningHoursPerDay: 18,
  },
  {
    id: 'mac-furnace-blower',
    name: 'Tempering Furnace Exhaust Blower 1',
    tag: 'BLW-01-THERM',
    location: 'Heat Treatment Area',
    category: 'Motors & Drives',
    nominalPowerKw: 37.0,
    currentPowerKw: 38.0,
    baselineKw: 37.0,
    status: 'OPTIMAL',
    powerFactor: 0.89,
    dailyCost: 136.0,
    runningHoursPerDay: 20,
  },
  {
    id: 'mac-substation-feeder',
    name: '11kV Feeder Transformer Substation 1',
    tag: 'SUB-01-GRID',
    location: 'Main Electrical Yard',
    category: 'Transformers & Distribution',
    nominalPowerKw: 320.0,
    currentPowerKw: 341.0,
    baselineKw: 320.0,
    status: 'OPTIMAL',
    powerFactor: 0.94,
    dailyCost: 1220.0,
    runningHoursPerDay: 24,
  },
];

export const INITIAL_ENERGY_INCIDENTS: EnergyIncident[] = [
  {
    id: 'inc-pneu-leak-401',
    machineId: 'mac-compressor-c3',
    machineName: 'Industrial Rotary Screw Compressor #3',
    location: 'Utility Bay B - South Wing',
    category: 'Compressed Air',
    severity: 'CRITICAL',
    detectedAt: '24 mins ago (10:14 AM)',
    metricAnomalous: 'Active Power (kW) & Rapid Cycling Load Rate',
    excessKw: 47.4, // 92.4 - 45.0
    estimatedWasteDollarsPerHour: 7.11, // At $0.15/kWh
    estimatedWasteDollarsPerMonth: 5119.2,
    co2KgPerHour: 21.3,
    detectionConfidence: 0.97,

    sensorCorrelations: {
      productionSurgeRuledOut: true,
      productionExplanation: 'Packaging line is running at normal 340 units/hr (no production surge occurred). Anomaly is NOT output-driven.',
      vibrationAnomalyDetected: true,
      vibrationDetails: 'Motor drive vibration elevated at 4.6 mm/s (nominal is < 1.8 mm/s). Indicates continuous unloaded compression strain.',
      temperatureAnomalyDetected: true,
      temperatureDetails: 'Oil sump discharge temperature spiked to 92°C (nominal 76°C) due to non-stop cycling.',
      pressureLossDetected: true,
      pressureDetails: 'Manifold pressure fluctuates between 5.8 bar and 6.4 bar despite full motor draw, indicating downstream pneumatic leakage.',
    },

    rootCauseTitle: 'Ruptured Solenoid Unloader Valve & Header Flange Leak',
    rootCauseDescription: 'The electro-pneumatic unloader valve failed in an intermediate state, preventing the compressor from entering idle standby. Combined with a 6mm ruptured seal on Header Line #4, the motor runs continuously at near 100% load during zero-demand intervals.',
    alternativeCausesConsidered: [
      {
        cause: 'Factory Production Shift Surge',
        probability: 0.05,
        reasonDismissed: 'Production line PLC telemetry confirms steady-state 340 parts/hour.',
      },
      {
        cause: 'Stator Electrical Winding Short',
        probability: 0.12,
        reasonDismissed: 'Phase-to-phase current balance is within 2.1%; no ground fault flags triggered.',
      },
      {
        cause: 'Ambient Summer Heat Load',
        probability: 0.08,
        reasonDismissed: 'Ambient temperature inside Bay B is 22°C (conditioned air).',
      },
    ],
    recommendedFix: '1. Replace damaged unloader diaphragm kit (Part #PNEU-VLV-42). 2. Torque Header Flange #4 bolts to 85 Nm and inspect rubber gasket seal.',
    requiredParts: ['Unloader Solenoid Kit (CMP-UK-03)', 'EPDM High-Pressure Gasket 4"'],
    estimatedFixTimeHours: 1.5,

    wsjf: {
      financialWasteCost: 9, // $5,119/mo waste rate
      productionRisk: 7, // Risk of total pneumatic failure
      assetDamageRisk: 8, // Overheating risks rotor seizure
      maintenanceJobSize: 2, // 1.5 hours technician job
      score: 12.0, // (9 + 7 + 8) / 2 = 12.0 (URGENT P0)
    },

    workOrder: {
      ticketId: 'WO-ENERG-2026-884',
      assignedTech: 'Marcus Vance (Senior Mechatronics Tech)',
      priority: 'P0 - IMMEDIATE EMERGENCY',
      checklist: [
        'Lock-out / Tag-out (LOTO) on Sub-Panel 4B Breaker #12',
        'Depressurize auxiliary air receiver tank to 0 bar',
        'Inspect and swap solenoid unloader assembly',
        'Ultrasonic acoustic inspection along Header Line #4',
        'Torque flange bolts and test pressure retention for 10 min',
      ],
      dispatchStatus: 'DISPATCHED',
      techNotes: 'Tech on site with replacement gasket kit. Estimated completion in 35 mins.',
    },

    verification: {
      windowProfile: 'DURABILITY_48H',
      windowHours: 48,
      hoursObserved: 0,
      postMaintenanceKw: 45.2,
      baselineTargetKw: 45.0,
      outcome: 'MONITORING',
      recurrenceCount: 0,
      stabilityScore: 0,
    },

    telemetryHistory: [
      { timestamp: '09:00', powerKw: 45.1, vibrationMmS: 1.4, temperatureC: 75.2, productionUnitsPerHour: 340, pressureBar: 7.0 },
      { timestamp: '09:30', powerKw: 46.0, vibrationMmS: 1.5, temperatureC: 76.0, productionUnitsPerHour: 342, pressureBar: 6.9 },
      { timestamp: '10:00', powerKw: 68.2, vibrationMmS: 2.8, temperatureC: 81.4, productionUnitsPerHour: 338, pressureBar: 6.4 },
      { timestamp: '10:14', powerKw: 92.4, vibrationMmS: 4.6, temperatureC: 92.0, productionUnitsPerHour: 340, pressureBar: 5.8 },
      { timestamp: '10:30', powerKw: 93.1, vibrationMmS: 4.7, temperatureC: 93.5, productionUnitsPerHour: 341, pressureBar: 5.7 },
    ],
  },
  {
    id: 'inc-chiller-foul-402',
    machineId: 'mac-chiller-beta',
    machineName: 'Central Process Water Chiller Beta',
    location: 'Central Plant Roof Level',
    category: 'HVAC & Chillers',
    severity: 'HIGH',
    detectedAt: '1 hour ago (09:40 AM)',
    metricAnomalous: 'Compressor Motor Amperage & Heat Exchanger ΔT',
    excessKw: 48.2, // 136.2 - 88.0
    estimatedWasteDollarsPerHour: 7.23,
    estimatedWasteDollarsPerMonth: 5205.6,
    co2KgPerHour: 21.7,
    detectionConfidence: 0.94,

    sensorCorrelations: {
      productionSurgeRuledOut: true,
      productionExplanation: 'Thermal cooling demand is steady at 450 kWth. Electricity draw increased 54% without additional cooling output.',
      vibrationAnomalyDetected: false,
      vibrationDetails: 'Centrifugal compressor vibration normal at 1.1 mm/s.',
      temperatureAnomalyDetected: true,
      temperatureDetails: 'Condenser water entering/leaving temperature differential collapsed to 1.8°C (should be > 5.0°C). Indicates severe heat transfer blockage.',
      pressureLossDetected: true,
      pressureDetails: 'Refrigerant head pressure is 18.2 bar (above 15.0 bar design limit).',
    },

    rootCauseTitle: 'Condenser Water Tube Scaling & Biocide Pump Starvation',
    rootCauseDescription: 'Chemical dosing feeder ran dry over the weekend, leading to rapid bio-fouling and mineral scaling inside the shell-and-tube condenser. Compressor is forced to run at maximum variable speed to overcome high discharge head pressure.',
    alternativeCausesConsidered: [
      { cause: 'High Ambient Summer Temperature', probability: 0.15, reasonDismissed: 'Wet-bulb ambient temp is 21°C (nominal design point).' },
      { cause: 'Refrigerant Leak', probability: 0.08, reasonDismissed: 'Evaporator suction pressure is healthy at 3.9 bar.' },
    ],
    recommendedFix: '1. Acid circulation flush on condenser loop. 2. Refill biocide tank and calibrate chemical metering pump.',
    requiredParts: ['Scale-Away Eco-Flush (50L)', 'Biocide Solution B-22'],
    estimatedFixTimeHours: 3.0,

    wsjf: {
      financialWasteCost: 9,
      productionRisk: 6,
      assetDamageRisk: 7,
      maintenanceJobSize: 3,
      score: 7.33,
    },

    workOrder: {
      ticketId: 'WO-ENERG-2026-885',
      assignedTech: 'Elena Rostova (HVAC & Facilities Specialist)',
      priority: 'P1 - HIGH',
      checklist: [
        'Isolate condenser water isolation valves',
        'Connect portable circulation pump and acid wash manifold',
        'Flush tubes for 90 minutes until effluent pH neutralizes',
        'Check biocide dispenser level sensor and test pump prime',
        'Restart chiller and verify condenser ΔT > 4.5°C',
      ],
      dispatchStatus: 'IN_PROGRESS',
      techNotes: 'Acid flush initiated. Scale sludge clearing effectively.',
    },

    verification: {
      windowProfile: 'SHIFT_12H',
      windowHours: 12,
      hoursObserved: 0,
      postMaintenanceKw: 88.5,
      baselineTargetKw: 88.0,
      outcome: 'MONITORING',
      recurrenceCount: 1, // Recurring issue from 2 weeks ago!
      stabilityScore: 0,
    },

    telemetryHistory: [
      { timestamp: '08:00', powerKw: 88.2, vibrationMmS: 1.0, temperatureC: 45.0, productionUnitsPerHour: 340 },
      { timestamp: '08:45', powerKw: 98.4, vibrationMmS: 1.0, temperatureC: 47.2, productionUnitsPerHour: 340 },
      { timestamp: '09:15', powerKw: 118.0, vibrationMmS: 1.1, temperatureC: 51.0, productionUnitsPerHour: 340 },
      { timestamp: '09:40', powerKw: 136.2, vibrationMmS: 1.1, temperatureC: 56.4, productionUnitsPerHour: 340 },
    ],
  },
  {
    id: 'inc-conveyor-idle-403',
    machineId: 'mac-conveyor-loop2',
    machineName: 'Packaging Line Conveyor Drive Loop 2',
    location: 'Packaging & Warehouse Floor',
    category: 'Motors & Drives',
    severity: 'MEDIUM',
    detectedAt: '35 mins ago (10:05 AM)',
    metricAnomalous: 'No-Load Idle Running During Shift Change',
    excessKw: 18.2,
    estimatedWasteDollarsPerHour: 2.73,
    estimatedWasteDollarsPerMonth: 1965.6,
    co2KgPerHour: 8.2,
    detectionConfidence: 0.98,

    sensorCorrelations: {
      productionSurgeRuledOut: true,
      productionExplanation: 'Packaging line optical photo-eye detects ZERO cartons passing for 55 consecutive minutes.',
      vibrationAnomalyDetected: false,
      vibrationDetails: 'Motor drive vibration nominal at 0.9 mm/s.',
      temperatureAnomalyDetected: false,
      temperatureDetails: 'Motor frame temperature normal at 42°C.',
      pressureLossDetected: false,
    },

    rootCauseTitle: 'Optical Presence Sensor Misalignment & Absent Sleep Logic',
    rootCauseDescription: 'Photo-eye sensor reflector was bumped by a forklift pallet, causing the conveyor interlock to stay in continuous RUN mode even during lunch breaks and shift changeovers when no cartons are present.',
    alternativeCausesConsidered: [
      { cause: 'Conveyor Mechanical Jam', probability: 0.05, reasonDismissed: 'Motor torque current is low; no mechanical binding detected.' },
    ],
    recommendedFix: '1. Re-align photo-eye sensor and tighten mounting bracket. 2. Push PLC logic update to auto-idle conveyor after 180s of empty travel.',
    requiredParts: ['Sensor Mounting Bracket (M12-BRK)'],
    estimatedFixTimeHours: 0.5,

    wsjf: {
      financialWasteCost: 5,
      productionRisk: 2,
      assetDamageRisk: 2,
      maintenanceJobSize: 1,
      score: 9.0,
    },

    workOrder: {
      ticketId: 'WO-ENERG-2026-886',
      assignedTech: 'Devon Patel (Electrical Controls Tech)',
      priority: 'P2 - ROUTINE SHIFT',
      checklist: [
        'Inspect photo-eye beam alignment with laser pointer',
        'Tighten bracket hardware and verify amber indicator LED',
        'Upload 3-minute idle sleep timer block to Line PLC',
      ],
      dispatchStatus: 'PENDING',
      techNotes: 'Ready for quick 20-minute calibration during break.',
    },

    verification: {
      windowProfile: 'CANARY_1H',
      windowHours: 1,
      hoursObserved: 0,
      postMaintenanceKw: 0.0,
      baselineTargetKw: 0.0,
      outcome: 'MONITORING',
      recurrenceCount: 0,
      stabilityScore: 0,
    },

    telemetryHistory: [
      { timestamp: '09:00', powerKw: 18.0, vibrationMmS: 0.9, temperatureC: 41.0, productionUnitsPerHour: 0 },
      { timestamp: '09:30', powerKw: 18.2, vibrationMmS: 0.9, temperatureC: 42.1, productionUnitsPerHour: 0 },
      { timestamp: '10:00', powerKw: 18.2, vibrationMmS: 0.9, temperatureC: 42.5, productionUnitsPerHour: 0 },
    ],
  },
];

export const INITIAL_FACTORY_KPIS: FactoryKPIs = {
  totalActiveMachines: 6,
  totalCurrentDemandKw: 681.3,
  totalNominalBaselineKw: 585.0,
  currentWasteRateKw: 95.6, // Active ongoing power bleed
  costRateWastedDollarsPerHour: 14.34, // $0.15/kWh * 95.6 kW
  monthlySavingsRealizedDollars: 12450.0,
  durabilityFixRate: 96.8, // 96.8% of past fixes remained stable without recurring
  meanTimeToDetectMinutes: 3.8, // Under 4 minutes vs 2 weeks utility bills!
  meanTimeToRemediateHours: 1.8,
  recurringLeaksPrevented: 38,
};

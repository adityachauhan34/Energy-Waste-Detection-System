# VoltHive: Autonomous Factory Energy Waste & Durability Engine ⚡🏭

> **Core Philosophy:** "Our focus isn't simply monitoring electricity usage. It's closing the gap between detecting a problem and verifying that it has actually been fixed."

VoltHive is a production-grade, Neobrutalist industrial IoT and autonomous SRE durability platform. It solves unnoticed energy waste across factories by combining real-time sub-meter telemetry anomaly detection, PLC production correlation, AI root-cause diagnosis, automated maintenance dispatch (WSJF), and **48-hour post-maintenance durability verification**.

---

## 📁 Dataset Directory & Architecture

All application datasets, telemetry time-series, and schema models are organized as follows:

| File Path | Description | Format |
| :--- | :--- | :--- |
| **`/README.md`** | Complete system documentation, architecture guide, and dataset specifications. | Markdown |
| **`/public/dataset.json`** | Direct raw JSON export of all factory machines, incidents, sensor time-series, and KPI metrics. | JSON |
| **`/src/data/energyData.ts`** | Core TypeScript energy dataset (factory machines, active incidents, sensor correlations, work orders). | TypeScript |
| **`/src/data/architectureData.ts`** | 6-Layer OODA architecture dataset, SRE incidents, product concepts, and DORA metrics. | TypeScript |
| **`/src/types/energy.ts`** | TypeScript interface schemas for machines, sensor readings, incidents, and durability windows. | TypeScript |

---

## 📊 Dataset Schema Overview

### 1. Factory Machines Dataset (`FACTORY_MACHINES`)
Tracks sub-meter electrical metrics across key factory assets:
```json
{
  "id": "mac-compressor-c3",
  "name": "Industrial Rotary Screw Compressor #3",
  "tag": "CMP-03-PNEUM",
  "location": "Utility Bay B - South Wing",
  "category": "Compressed Air",
  "nominalPowerKw": 45.0,
  "currentPowerKw": 92.4,
  "baselineKw": 45.0,
  "status": "ANOMALY_DETECTED",
  "powerFactor": 0.81,
  "dailyCost": 288.40,
  "runningHoursPerDay": 24
}
```

### 2. Energy Anomaly & Incident Dataset (`INITIAL_ENERGY_INCIDENTS`)
Contains detailed multi-sensor correlation evidence, diagnosed root causes, and post-repair verification logs:
```json
{
  "id": "inc-pneu-leak-401",
  "machineId": "mac-compressor-c3",
  "severity": "CRITICAL",
  "excessKw": 47.4,
  "estimatedWasteDollarsPerHour": 7.11,
  "estimatedWasteDollarsPerMonth": 5119.20,
  "sensorCorrelations": {
    "productionSurgeRuledOut": true,
    "productionExplanation": "Packaging line is running at normal 340 units/hr (no production surge occurred).",
    "vibrationAnomalyDetected": true,
    "vibrationDetails": "Motor drive vibration elevated at 4.6 mm/s (nominal < 1.8 mm/s).",
    "temperatureAnomalyDetected": true,
    "temperatureDetails": "Oil sump discharge temperature spiked to 92°C (nominal 76°C).",
    "pressureLossDetected": true,
    "pressureDetails": "Manifold pressure fluctuates between 5.8 bar and 6.4 bar."
  },
  "rootCauseTitle": "Ruptured Solenoid Unloader Valve & Header Flange Leak",
  "wsjf": {
    "financialWasteCost": 9,
    "productionRisk": 7,
    "assetDamageRisk": 8,
    "maintenanceJobSize": 2,
    "score": 12.0
  },
  "verification": {
    "windowProfile": "DURABILITY_48H",
    "windowHours": 48,
    "postMaintenanceKw": 45.2,
    "baselineTargetKw": 45.0,
    "outcome": "RESOLVED",
    "stabilityScore": 98.4
  }
}
```

### 3. Time-Series Telemetry History (`telemetryHistory`)
Continuous sub-meter and multi-probe logs used for regression and post-maintenance durability validation:
```json
[
  { "timestamp": "09:00", "powerKw": 45.1, "vibrationMmS": 1.4, "temperatureC": 75.2, "productionUnitsPerHour": 340, "pressureBar": 7.0 },
  { "timestamp": "09:30", "powerKw": 46.0, "vibrationMmS": 1.5, "temperatureC": 76.0, "productionUnitsPerHour": 342, "pressureBar": 6.9 },
  { "timestamp": "10:00", "powerKw": 68.2, "vibrationMmS": 2.8, "temperatureC": 81.4, "productionUnitsPerHour": 338, "pressureBar": 6.4 },
  { "timestamp": "10:14", "powerKw": 92.4, "vibrationMmS": 4.6, "temperatureC": 92.0, "productionUnitsPerHour": 340, "pressureBar": 5.8 },
  { "timestamp": "10:30", "powerKw": 93.1, "vibrationMmS": 4.7, "temperatureC": 93.5, "productionUnitsPerHour": 341, "pressureBar": 5.7 }
]
```

---

## 🔄 The 5-Step Agent Loop Explained

1. **Step 1: Detect Unusual Consumption**
   - Ingests real-time sub-meter readings.
   - Detects statistical deviations ($z \ge 3\sigma$) above baseline within **3.8 minutes** (vs. 14–30 day delay on utility bills).
2. **Step 2: Investigate Causes via Multi-Sensor Correlation**
   - Rules out production increases by querying line PLC tags (e.g. units/hour).
   - Correlates thermal, vibration, and pressure sensors to distinguish mechanical friction, idle running, or air leakage.
3. **Step 3: Identify Most Likely Cause**
   - AI diagnostic engine evaluates alternative hypotheses and assigns probability confidence scores.
   - Outputs required spare parts, LOTO safety guidelines, and job hour estimates.
4. **Step 4: Coordinate with Maintenance Team**
   - Computes mathematical priority via **WSJF (Weighted Shortest Job First)**:
     $$\text{WSJF} = \frac{\text{Financial Waste (\$/day)} + \text{Downtime Risk} + \text{Asset Damage Risk}}{\text{Technician Hours}}$$
   - Generates and dispatches a formal work order ticket with pre-kitted parts.
5. **Step 5: Verify Problem Resolution (Durability)**
   - Activates an adaptive **48-Hour Durability Window**.
   - Asserts that post-repair power draw remains at nominal baseline across all shift variations.
   - Classifies outcome into **RESOLVED** (durable fix), **PARTIAL** (incomplete fix), or **RECURRING** (regression).

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start full-stack development server (Express + Vite)
npm run dev

# Run TypeScript linting
npm run lint

# Build production bundle
npm run build
```

---

## 🔌 Integrating Real Factory Data

To stream live factory telemetry into VoltHive, replace `src/data/energyData.ts` with your API endpoints or MQTT / OPC-UA broker:

- **OPC-UA / Modbus TCP:** Stream active power (`kW`), voltage (`V`), and current (`A`) directly into the sub-meter collector.
- **SCADA / MES PLC Tags:** Stream production output (`units/hour`) to automate the "production surge vs. equipment fault" correlation.
- **REST / Webhooks:** Post incident alerts to `/api/ai/architect-advice` for instant Gemini-powered root cause analysis and automated work orders.

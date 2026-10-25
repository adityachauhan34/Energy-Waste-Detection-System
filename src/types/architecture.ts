export type SystemLayerId =
  | 'signal-collection'
  | 'triage-prioritization'
  | 'hive-orchestration'
  | 'adaptive-verification'
  | 'outcome-classification'
  | 'feedback-metrics'
  | 'temporal-infra'
  | 'model-gateway';

export interface ArchitectureLayer {
  id: SystemLayerId;
  number: string;
  name: string;
  oodaPhase: 'OBSERVE' | 'ORIENT + DECIDE' | 'ACT' | 'VERIFY' | 'EVALUATE' | 'LEARN' | 'INFRASTRUCTURE';
  headline: string;
  description: string;
  components: {
    name: string;
    type: 'telemetry' | 'algorithm' | 'agent' | 'governance' | 'metric' | 'gateway';
    description: string;
    tech: string;
  }[];
  scripts: {
    name: string;
    language: string;
    code: string;
    purpose: string;
  }[];
  keyCapabilities: string[];
  missingInTraditionalOps: string;
}

export interface ProductConcept {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  keyFeatures: string[];
  techStack: string[];
  targetAudience: string;
  monetization: string;
  howThisArchitecturePowersIt: string;
  iconName: string;
}

export interface IncidentScenario {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  source: 'GA4 Telemetry' | 'Regression Scan' | 'Contributor Bug' | 'Runtime Anomaly';
  summary: string;
  rawSignal: {
    metric: string;
    anomalyScore: number;
    baseline: string;
    current: string;
    affectedUsers: number;
  };
  wsjf: {
    userValue: number; // 1-10
    timeCriticality: number; // 1-10
    riskReduction: number; // 1-10
    jobSize: number; // 1-10
  };
  rootCause: string;
  patchDiff: {
    file: string;
    original: string;
    patched: string;
  };
  verificationProfiles: {
    standard: { windowHours: number; checks: string[] };
    elevated: { windowHours: number; checks: string[] };
    strict: { windowHours: number; checks: string[] };
  };
  recurrenceCount: number;
}

export interface DoraMetricsState {
  deploymentFrequency: string; // e.g. "14.2 / day"
  leadTimeForChanges: string; // e.g. "18 min"
  meanTimeToRestore: string; // e.g. "7.4 min"
  changeFailureRate: number; // percentage e.g. 2.1%
  durabilityScore: number; // percentage e.g. 94.8%
  activeRepairs: number;
  preventedRegressions: number;
}

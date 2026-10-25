import { ArchitectureLayer, IncidentScenario, ProductConcept, DoraMetricsState } from '../types/architecture';

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: 'signal-collection',
    number: '01',
    name: 'Signal Collection Layer',
    oodaPhase: 'OBSERVE',
    headline: 'Continuous Runtime Observation & Anomaly Ingestion',
    description: 'Observes runtime behavior, telemetry anomalies, scans, and contributor reports, then converts noisy signals into structured actionable alerts that trigger Hive autonomous workflows.',
    components: [
      {
        name: 'GA4 Telemetry Pipeline',
        type: 'telemetry',
        description: 'Collects operational frontend and client-side runtime anomalies, websocket dropouts, and UI rendering crashes.',
        tech: 'Google Analytics 4 Data API + BigQuery Streaming',
      },
      {
        name: 'Anomaly Detector Daemon',
        type: 'telemetry',
        description: 'Runs statistical z-score and moving window anomaly detection over live telemetry streams.',
        tech: 'ga4-anomaly-detector.sh + Python Statistical Prober',
      },
      {
        name: 'Regression Scanner',
        type: 'telemetry',
        description: 'Periodically checks test suite coverage dropouts and canary build discrepancies.',
        tech: 'fetch-coverage.sh + Jest/Vitest diff analyzer',
      },
      {
        name: 'Contributor Bug Reports',
        type: 'telemetry',
        description: 'Ingests GitHub issues, Discord/Slack bug pings, and Sentry exception alerts.',
        tech: 'GitHub Webhooks + Issue Ingestion Service',
      },
    ],
    scripts: [
      {
        name: 'ga4-anomaly-detector.sh',
        language: 'bash',
        code: `#!/usr/bin/env bash
# Fetches latest 15m error rates from GA4 Data API and computes deviation
ENDPOINT="https://analyticsdata.googleapis.com/v1beta/properties/\${GA4_PROPERTY_ID}:runRealtimeReport"
PAYLOAD='{"metrics":[{"name":"eventCount"}],"dimensions":[{"name":"eventName"}],"dimensionFilter":{"filter":{"fieldName":"eventName","stringFilter":{"value":"runtime_exception"}}}}'

RESPONSE=$(curl -s -X POST "$ENDPOINT" -H "Authorization: Bearer $(gcloud auth print-access-token)" -d "$PAYLOAD")
ANOMALY_SCORE=$(echo "$RESPONSE" | jq -r '.rows[0].metricValues[0].value // 0')

if [ "$ANOMALY_SCORE" -gt 45 ]; then
  echo "[ALERT] Anomaly threshold breached (count: $ANOMALY_SCORE). Triggering Triage Layer..."
  curl -s -X POST http://triage-service:8080/ingest -d "{\\"source\\": \\"ga4\\", \\"score\\": $ANOMALY_SCORE}"
fi`,
        purpose: 'Monitors real-time client runtime exceptions via GA4 Data API and triggers triage.',
      },
      {
        name: 'health-check.sh',
        language: 'bash',
        code: `#!/usr/bin/env bash
# Synthetic endpoint probe for websocket and REST health
CURL_OUT=$(curl -o /dev/null -s -w "%{http_code}:%{time_total}" https://api.production.app/v1/healthz)
STATUS=$(echo "$CURL_OUT" | cut -d: -f1)
LATENCY=$(echo "$CURL_OUT" | cut -d: -f2)

if [ "$STATUS" != "200" ] || (( $(echo "$LATENCY > 1.2" | bc -l) )); then
  echo "Degraded health: HTTP $STATUS, Latency: \${LATENCY}s"
  exit 1
fi`,
        purpose: 'Validates critical API availability and latency thresholds.',
      },
    ],
    keyCapabilities: [
      'Transforms unstructured telemetry into clean incident event objects',
      'Correlates client-side GA4 events with backend microservice traces',
      'Filters out transient blips via sliding window thresholds',
    ],
    missingInTraditionalOps: 'Traditional ops relies on manual developer triage or static pager alerts. This layer streams actionable structured inputs directly into autonomous self-healing engines.',
  },
  {
    id: 'triage-prioritization',
    number: '02',
    name: 'Triage & Prioritization Layer',
    oodaPhase: 'ORIENT + DECIDE',
    headline: 'Algorithmic Job Scoring & Governance Control',
    description: 'Evaluates incoming operational signals and calculates mathematical repair priority (WSJF + RICE), urgency, error budget consumption, and governance intensity before routing to autonomous workers.',
    components: [
      {
        name: 'WSJF Calculator',
        type: 'algorithm',
        description: 'Calculates Weighted Shortest Job First: Cost of Delay (User Value + Time Criticality + Risk Reduction) divided by Job Size.',
        tech: 'Mathematical Priority Engine',
      },
      {
        name: 'RICE Scoring Engine',
        type: 'algorithm',
        description: 'Estimates (Reach × Impact × Confidence) / Effort to balance user volume against engineering investment.',
        tech: 'Quantitative Triage Evaluator',
      },
      {
        name: 'Error Budget Guard',
        type: 'governance',
        description: 'Tracks SLA/SLO consumption. Halts risky automated merges if error budgets are depleted.',
        tech: 'Prometheus / OpenTelemetry SLO Monitor',
      },
      {
        name: 'Merge Velocity & Escalation Gate',
        type: 'governance',
        description: 'Determines whether an issue is eligible for full autonomous PR merge or requires Human-in-the-Loop review.',
        tech: 'Governance Policy Controller',
      },
    ],
    scripts: [
      {
        name: 'issue-classifier.sh',
        language: 'bash',
        code: `#!/usr/bin/env bash
# Evaluates WSJF and routes issue to autonomous agent or escalation queue
ISSUE_JSON="$1"
COST_OF_DELAY=$(echo "$ISSUE_JSON" | jq '.user_value + .time_criticality + .risk_reduction')
JOB_SIZE=$(echo "$ISSUE_JSON" | jq '.job_size // 3')
WSJF=$(awk "BEGIN {print $COST_OF_DELAY / $JOB_SIZE}")

echo "Computed WSJF: $WSJF"
if (( $(echo "$WSJF >= 4.0" | bc -l) )); then
  echo "High Priority: Dispatching immediate autonomous Hive agent workflow."
  ./kick-governor.sh --priority high --wsjf "$WSJF"
else
  echo "Queued for routine batch repair."
fi`,
        purpose: 'Classifies issue urgency and enforces governance merge throttles.',
      },
    ],
    keyCapabilities: [
      'Eliminates arbitrary developer triage arguments through transparent WSJF scoring',
      'Dynamic escalation to human reviewers for high-blast-radius code paths',
      'Error budget-aware velocity controls to prevent self-healing loops from breaking prod',
    ],
    missingInTraditionalOps: 'Traditional issue trackers leave prioritization to subjective human opinion. This layer mathematically calculates cost of delay vs repair size.',
  },
  {
    id: 'hive-orchestration',
    number: '03',
    name: 'Hive Orchestration Layer',
    oodaPhase: 'ACT',
    headline: 'Multi-Agent Autonomous Code Patching & PR Generation',
    description: 'Coordinates autonomous multi-agent swarms that transform actionable issues into tested pull requests, regression validation steps, and controlled merge operations.',
    components: [
      {
        name: 'Temporal Workflow Engine',
        type: 'agent',
        description: 'Maintains durable state, parallel agent branches, activity retries, heartbeats, and human review signals.',
        tech: 'Temporal.io Cluster + TypeScript SDK',
      },
      {
        name: 'Scanner & Code AST Agent',
        type: 'agent',
        description: 'Scans the repository, traces stack traces to exact source lines, and builds AST dependency graphs.',
        tech: 'Tree-sitter + Git grep + AST Parsers',
      },
      {
        name: 'AI PR Generation Agent',
        type: 'agent',
        description: 'Prompts fine-tuned / open-weight models via Bifrost gateway to generate targeted, minimal code diffs.',
        tech: 'KServe + OpenEverest / Gemini LLM API',
      },
      {
        name: 'Reviewer Agent & Lint Pipeline',
        type: 'agent',
        description: 'Validates type safety, security boundaries, and unit test compliance before opening a PR.',
        tech: 'Supervised tmux runners + git-wrapper.sh',
      },
    ],
    scripts: [
      {
        name: 'kick-agents.sh',
        language: 'bash',
        code: `#!/usr/bin/env bash
# Spawns parallel scanner & patch agents inside isolated tmux / container workers
WORKFLOW_ID="hive-repair-$(date +%s)"
echo "[HIVE] Spawning Temporal workflow: $WORKFLOW_ID"

temporal workflow start \\
  --workflow-type RepairIncidentWorkflow \\
  --task-queue hive-repair-queue \\
  --workflow-id "$WORKFLOW_ID" \\
  --input '{"incident_id":"WS-302","repo":"acme/web","strategy":"ast_patch"}'`,
        purpose: 'Triggers the Temporal durable workflow that coordinates parallel AI agents.',
      },
    ],
    keyCapabilities: [
      'Durable execution surviving server reboots without losing agent progress',
      'Multi-agent separation: Scanner analyzes, Coder patches, Reviewer verifies',
      'Clean Git commits with comprehensive rationale, repro steps, and test diffs',
    ],
    missingInTraditionalOps: 'Traditional auto-fixers are one-shot scripts that fail silently. Hive + Temporal provides stateful, multi-agent fault-tolerant code surgery.',
  },
  {
    id: 'adaptive-verification',
    number: '04',
    name: 'Adaptive Verification Layer',
    oodaPhase: 'VERIFY',
    headline: 'Telemetry-Based Durability & Dynamic Test Intensity',
    description: 'Evaluates whether merged repairs actually remain operationally effective over time. Verification intensity and monitoring windows dynamically increase for recurring regressions.',
    components: [
      {
        name: 'Standard Verification Window',
        type: 'governance',
        description: '1-hour post-merge canary monitoring window for first-time low-risk repairs.',
        tech: 'Canary Deployer + Prometheus Prober',
      },
      {
        name: 'Elevated Verification Window',
        type: 'governance',
        description: '6-hour intensive monitoring with synthetic traffic injection for medium blast-radius fixes.',
        tech: 'Playwright E2E + K6 Synthetic Load Injector',
      },
      {
        name: 'Strict Verification Window',
        type: 'governance',
        description: '24-to-48-hour continuous telemetry lock for recurring regressions, requiring zero anomaly recurrence.',
        tech: 'Telemetry Stability Verifier + Auto-Rollback Guard',
      },
    ],
    scripts: [
      {
        name: 'verify-durability.sh',
        language: 'bash',
        code: `#!/usr/bin/env bash
# Evaluates post-merge telemetry stability across the chosen verification window
WINDOW_HOURS=$1
ANOMALY_COUNT=$(curl -s "http://telemetry-api:8080/metrics/anomalies?window=\${WINDOW_HOURS}h" | jq '.total')

if [ "$ANOMALY_COUNT" -eq 0 ]; then
  echo "Durability verified: 0 anomalies in \${WINDOW_HOURS}h window."
  exit 0
else
  echo "Regression detected: $ANOMALY_COUNT anomalies encountered! Escalating..."
  exit 1
fi`,
        purpose: 'Enforces the post-merge verification window before classifying repair as durable.',
      },
    ],
    keyCapabilities: [
      'Dynamic escalation: recurring bugs automatically get longer and stricter observation windows',
      'Synthetic load testing during canary phase to stress-test corner cases',
      'Immediate auto-rollback trigger if error metrics spike post-merge',
    ],
    missingInTraditionalOps: 'Traditional CI/CD stops verifying the moment tests pass and code merges into main. This layer watches production telemetry long after the merge to ensure true durability.',
  },
  {
    id: 'outcome-classification',
    number: '05',
    name: 'Outcome Classification Layer',
    oodaPhase: 'EVALUATE',
    headline: 'From "Did the PR Merge?" to "Did the System Stabilize?"',
    description: 'The defining innovation of the architecture: instead of celebrating a merged PR, it classifies real-world operational health into Resolved, Partial, or Recurring.',
    components: [
      {
        name: 'Telemetry Stability Classifier',
        type: 'algorithm',
        description: 'Classifies repair effectiveness based on operational telemetry: Resolved (zero anomalies), Partial (reduced error rate), or Recurring (relapse).',
        tech: 'Operational Durability Engine',
      },
      {
        name: 'Recurrence Counter & Memory',
        type: 'algorithm',
        description: 'Maintains durable persistent memory of historic fix attempts, preventing the AI from repeating identical ineffective patches.',
        tech: 'Postgres / Vector Index of Past Fixes',
      },
      {
        name: 'Escalation Dispatcher',
        type: 'governance',
        description: 'If a repair recurs twice, immediately flags the subsystem for senior human architectural review.',
        tech: 'PagerDuty / Slack / Incident Dispatcher',
      },
    ],
    scripts: [
      {
        name: 'classify-outcome.py',
        language: 'python',
        code: `def classify_repair(pre_merge_rate, post_merge_rate, duration_hours):
    reduction = (pre_merge_rate - post_merge_rate) / pre_merge_rate
    if post_merge_rate == 0 and duration_hours >= 24:
        return {"status": "RESOLVED", "confidence": 0.99, "action": "CLOSE_INCIDENT"}
    elif reduction >= 0.70:
        return {"status": "PARTIAL", "confidence": 0.85, "action": "SCHEDULE_DEEP_CLEANUP"}
    else:
        return {"status": "RECURRING", "confidence": 0.95, "action": "TRIGGER_STRICT_PROFILE"}`,
        purpose: 'Mathematically scores repair outcome based on metric reduction and time elapsed.',
      },
    ],
    keyCapabilities: [
      'Solves the false sense of security caused by green CI builds',
      'Provides a "Durability Memory" so agents learn what failed previously',
      'Feeds objective outcome data back into future triage and prioritization algorithms',
    ],
    missingInTraditionalOps: 'Most teams only ask "Did tests pass?". They lack a systematic mechanism to ask "Did the bug come back next week?".',
  },
  {
    id: 'feedback-metrics',
    number: '06',
    name: 'Feedback & Metrics Layer',
    oodaPhase: 'LEARN',
    headline: 'Continuous Durability Learning & DORA Telemetry',
    description: 'Feeds operational repair outcomes back into the Triage Layer, calculates enterprise DORA metrics, and tracks engineering reliability growth over time.',
    components: [
      {
        name: 'DORA Metrics Engine',
        type: 'metric',
        description: 'Calculates elite DevOps indicators: Deployment Frequency, Lead Time for Changes, MTTR, and Change Failure Rate.',
        tech: 'DORA Telemetry Aggregator',
      },
      {
        name: 'Repair Durability Score',
        type: 'metric',
        description: 'Percentage of autonomous fixes that remain stable without recurrence for 30+ days.',
        tech: 'Durability Analytics Engine',
      },
      {
        name: 'Priority Weight Tuning',
        type: 'algorithm',
        description: 'Dynamically tunes WSJF parameters based on past repair accuracy and false-alarm frequency.',
        tech: 'Reinforcement Feedback Optimizer',
      },
    ],
    scripts: [
      {
        name: 'calculate-dora.sh',
        language: 'bash',
        code: `#!/usr/bin/env bash
# Computes Rolling 30-Day DORA Metrics + Repair Durability Score
MTTR_MINUTES=$(psql -d metrics -t -c "SELECT AVG(EXTRACT(EPOCH FROM (stabilized_at - detected_at))/60) FROM repairs WHERE status='RESOLVED';")
CHANGE_FAILURE=$(psql -d metrics -t -c "SELECT (COUNT(*) FILTER (WHERE status='RECURRING')::float / COUNT(*)::float) * 100 FROM repairs;")
DURABILITY=$(psql -d metrics -t -c "SELECT (COUNT(*) FILTER (WHERE recurrence_count=0)::float / COUNT(*)::float) * 100 FROM repairs;")

echo "MTTR: \${MTTR_MINUTES}m | Change Failure: \${CHANGE_FAILURE}% | Durability: \${DURABILITY}%"`,
        purpose: 'Computes system-wide SRE and DORA health metrics.',
      },
    ],
    keyCapabilities: [
      'Proves concrete ROI of autonomous self-healing to leadership',
      'Reduces Mean Time to Restore (MTTR) from hours down to minutes',
      'Identifies brittle code modules that repeatedly spawn recurring incidents',
    ],
    missingInTraditionalOps: 'DORA metrics are usually calculated quarterly in static spreadsheets. This layer updates them continuously in real time as autonomous agents resolve issues.',
  },
  {
    id: 'temporal-infra',
    number: '00-A',
    name: 'Temporal Workflow Engine',
    oodaPhase: 'INFRASTRUCTURE',
    headline: 'Durable State, Parallel Workers & Human-in-the-Loop',
    description: 'The mission-critical backbone connecting the web portal with autonomous agent workers. Ensures durable state persistence, exponential backoff retries, and asynchronous human approval gates.',
    components: [
      {
        name: 'Durable Execution Engine',
        type: 'agent',
        description: 'Guarantees that long-running agent workflows survive process crashes, node migrations, and network partitions.',
        tech: 'Temporal Core Server (Go / Rust engine)',
      },
      {
        name: 'Parallel Agent Activities',
        type: 'agent',
        description: 'Executes scanner, linter, test runner, and LLM patch generation activities concurrently across worker pools.',
        tech: 'Temporal Worker Daemon in Node.js / Python',
      },
      {
        name: 'Human Review Signal Gate',
        type: 'governance',
        description: 'Pauses workflow execution and awaits an asynchronous cryptographic signature or web click from an engineer.',
        tech: 'Temporal Signals & Queries',
      },
    ],
    scripts: [
      {
        name: 'repair-workflow.ts',
        language: 'typescript',
        code: `import { proxyActivities, defineSignal, setHandler } from '@temporalio/workflow';
import type * as activities from './activities';

const { scanCodebase, generatePatch, runAdaptiveTests, monitorStability } = proxyActivities<typeof activities>({
  startToCloseTimeout: '30m',
  retry: { initialInterval: '1s', maximumAttempts: 5 }
});

export const approveSignal = defineSignal<[boolean]>('humanApproval');

export async function RepairIncidentWorkflow(incident: any): Promise<string> {
  // 1. Scan codebase & retrieve domain evidence
  const astContext = await scanCodebase(incident);
  
  // 2. Generate patch via Bifrost / Model Gateway
  const patch = await generatePatch(incident, astContext);
  
  // 3. Human in the loop gate (if blast radius is high)
  if (incident.wsjf > 8.0) {
    let approved = false;
    setHandler(approveSignal, (val) => { approved = val; });
    // Workflow sleeps durably until signal arrives
  }
  
  // 4. Run adaptive verification window
  await runAdaptiveTests(patch, incident.verificationProfile);
  
  // 5. Monitor post-merge stability for durability
  return await monitorStability(incident.id, incident.windowHours);
}`,
        purpose: 'Temporal workflow implementation providing durable multi-agent orchestration.',
      },
    ],
    keyCapabilities: [
      'Zero lost state: workflows resume exactly where they left off after node failure',
      'Clean separation between agent reasoning activities and workflow coordination',
      'Audit log trail of every prompt, code diff, test result, and approval event',
    ],
    missingInTraditionalOps: 'Traditional Celery or cron-based jobs crash mid-execution and leave repositories in dirty states with orphan branches.',
  },
  {
    id: 'model-gateway',
    number: '00-B',
    name: 'Model Gateway & Bifrost Router',
    oodaPhase: 'INFRASTRUCTURE',
    headline: 'Unified Routing between Open-Weight LLMs & Domain Evidence',
    description: 'Bifrost Model Gateway routes agent code generation tasks between high-throughput open-weight models (served via KServe + OpenEverest) and specialized commercial APIs, grounded in trusted domain documentation.',
    components: [
      {
        name: 'Bifrost Model Gateway',
        type: 'gateway',
        description: 'Dynamic load balancing, prompt caching, token rate limiting, and fallback routing across LLM backends.',
        tech: 'Bifrost Proxy / LiteLLM Gateway',
      },
      {
        name: 'KServe + OpenEverest Cluster',
        type: 'agent',
        description: 'High-speed local inference serving open-weight code models (e.g. Qwen2.5-Coder, DeepSeek-Coder, Llama 3) inside private VPCs.',
        tech: 'vLLM / KServe on Kubernetes',
      },
      {
        name: 'Domain Data & Evaluation Vault',
        type: 'algorithm',
        description: 'Provides structured evidence, past incident postmortems, API specs, and regression test suites for grounded prompt injection.',
        tech: 'Qdrant / pgvector + Hybrid RAG Retrieval',
      },
    ],
    scripts: [
      {
        name: 'bifrost-router.py',
        language: 'python',
        code: `import httpx

async def route_model_request(task_type: str, prompt: str, domain_context: dict):
    # Route routine AST syntax fixes to ultra-fast local KServe models
    if task_type == "syntax_fix" or task_type == "linter_clean":
        endpoint = "http://kserve-openeverest.internal/v1/chat/completions"
        model = "qwen2.5-coder-32b"
    else:
        # Route complex multi-file architectural reasoning to frontier model
        endpoint = "https://gateway.bifrost.internal/v1/generate"
        model = "frontier-reasoning"
        
    async with httpx.AsyncClient() as client:
        return await client.post(endpoint, json={"model": model, "messages": [{"role": "user", "content": prompt}]})`,
        purpose: 'Dynamic model routing based on task complexity, cost, and latency.',
      },
    ],
    keyCapabilities: [
      'Drastically cuts AI inference costs by delegating simple fixes to open-weight models',
      'Strict zero-data-leakage compliance by keeping proprietary codebase within VPC',
      'Grounds code generation in verified internal architecture guidelines',
    ],
    missingInTraditionalOps: 'Direct hardcoded API calls to single third-party AI providers that suffer from vendor lock-in, rate limits, and compliance red flags.',
  },
];

export const PRODUCT_CONCEPTS: ProductConcept[] = [
  {
    id: 'prod-autonomous-sre',
    title: 'HiveHeal: Autonomous SRE & Self-Healing CI/CD',
    tagline: 'An AI engineer that monitors your production telemetry, writes PRs, and verifies post-merge durability.',
    description: 'A full-stack autonomous reliability platform that ingests real-time error anomalies from GA4, Datadog, or Sentry, triggers Temporal multi-agent workers to draft verified code patches, and guarantees fixes actually stabilize the system.',
    category: 'Autonomous DevOps & SRE',
    keyFeatures: [
      'Real-time anomaly ingestion directly into self-healing workflows',
      'Temporal-orchestrated multi-agent pipeline (Scanner, Patch Generator, Reviewer)',
      'Automated pull request creation with git diffs and test evidence',
      'Adaptive post-merge canary monitoring (Standard, Elevated, Strict)',
      'Durability memory preventing recurring bug regressions',
    ],
    techStack: ['Temporal.io', 'KServe + vLLM', 'Node.js/TypeScript', 'PostgreSQL', 'Docker/K8s'],
    targetAudience: 'Engineering teams with 15-200 developers spending >30% of their sprint fixing repetitive regressions and telemetry alerts.',
    monetization: '$499 - $3,500/month per repository + tiered seats for Human-in-the-Loop approvers.',
    howThisArchitecturePowersIt: 'Direct 1:1 realization of the entire 6-layer pipeline: Signal Collection -> WSJF Triage -> Hive PR Generation -> Adaptive Verification -> Outcome Classification.',
    iconName: 'Cpu',
  },
  {
    id: 'prod-durability-guard',
    title: 'DurabilityGuard: Post-Merge Verification & Regression Firewall',
    tagline: 'Stop asking "Did the PR merge?" — Start measuring "Did the system actually stabilize?"',
    description: 'A standalone verification layer for existing CI/CD pipelines (GitHub Actions, GitLab CI). It observes production telemetry for a tailored window (1h to 48h) after every deployment, automatically classifying repairs as Resolved, Partial, or Recurring.',
    category: 'Continuous Delivery & Quality Engineering',
    keyFeatures: [
      'Rolling post-merge verification windows based on regression history',
      'Automatic rollback triggers when telemetry deviates beyond baseline',
      'Durability Scorecards for engineering teams and microservices',
      'Recurrence tracking preventing the "whack-a-mole" bug cycle',
      'Integration with GitHub Checks API to hold releases until verification window completes',
    ],
    techStack: ['OpenTelemetry', 'Prometheus', 'GitHub App SDK', 'Python/FastAPI', 'ClickHouse'],
    targetAudience: 'High-velocity engineering teams suffering from frequent "fixes" that break again two weeks later.',
    monetization: '$199/month for starter teams, $1,200/month enterprise with custom SLA and compliance audits.',
    howThisArchitecturePowersIt: 'Focuses specifically on Layers 4 & 5 (Adaptive Verification + Outcome Classification), turning the "Missing Today" gap in the diagram into a standalone commercial product.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'prod-telemetry-triage',
    title: 'PriorityEngine: WSJF & Telemetry-Driven Backlog Prioritizer',
    tagline: 'Algorithmic bug prioritization driven by live user impact and error budgets.',
    description: 'Replaces noisy Slack channels and biased Jira poker planning with mathematical WSJF (Weighted Shortest Job First) and RICE scoring fed directly by GA4 frontend telemetry, user session impact, and error budget limits.',
    category: 'Product & Backlog Intelligence',
    keyFeatures: [
      'Continuous WSJF scoring: Cost of Delay / Job Size calculated in real time',
      'Real-time GA4 event integration tracking active user sessions impacted',
      'Error Budget governance with automated merge velocity throttling',
      'Bi-directional sync with Jira, Linear, and GitHub Issues',
      'Executive ROI & MTTR prediction dashboards',
    ],
    techStack: ['React', 'Express', 'GA4 API', 'Linear GraphQL API', 'Postgres'],
    targetAudience: 'Product Managers, Engineering Leads, and SRE managers struggling to triage 100+ weekly bug reports.',
    monetization: '$15/seat/month or $299/month flat team tier.',
    howThisArchitecturePowersIt: 'Implements Layer 2 (Triage & Prioritization) with the RICE + WSJF + Error Budget mathematical algorithms.',
    iconName: 'Gauge',
  },
  {
    id: 'prod-temporal-agent-orchestrator',
    title: 'AgentOrchestrate: Temporal-Native AI Code Agent Framework',
    tagline: 'Production-ready framework for running multi-agent code refactoring swarms with durable state.',
    description: 'An enterprise open-source/hosted orchestrator that solves the fragility of AI agents. Uses Temporal to manage parallel agents (Scanners, Code Generators, Reviewers) with guaranteed retries, human review webhooks, and audit logs.',
    category: 'Developer Infrastructure & Agent Ops',
    keyFeatures: [
      'Pre-built Temporal workflows for AST scanning, code generation, and test validation',
      'Human-in-the-Loop review gates with interactive diff inspection',
      'Built-in tmux / Docker supervised sandbox isolation for agent tool execution',
      'Bifrost model gateway with fallback from local KServe to frontier models',
      'Comprehensive replayable execution traces for security compliance',
    ],
    techStack: ['Temporal', 'TypeScript', 'Docker', 'Tree-sitter', 'Python'],
    targetAudience: 'Companies building in-house AI coding agents that keep crashing or hallucinating without durable state.',
    monetization: 'Open-core with hosted cloud orchestrator at $0.05 per agent workflow execution + enterprise support.',
    howThisArchitecturePowersIt: 'Directly mirrors Diagram 2 ("Web app -> Temporal workflow engine -> Model Gateway Bifrost -> Domain data").',
    iconName: 'Workflow',
  },
  {
    id: 'prod-bifrost-kserve-gateway',
    title: 'Bifrost Gateway: Hybrid Open-Weight LLM Router for Code',
    tagline: 'Route routine code edits to fast private open-weight models; escalate complex logic to frontier models.',
    description: 'An intelligent AI model gateway optimized specifically for software engineering. Routes AST fixes to self-hosted KServe instances (cutting 80% of token bills) while routing complex cross-file architectural changes to frontier models, with domain RAG injection.',
    category: 'AI Infrastructure & Model Management',
    keyFeatures: [
      'Task-aware router: syntax/lint fixes -> KServe local; architectural reasoning -> Frontier LLM',
      'Private VPC deployment with zero code retention guarantee',
      'Semantic prompt caching and AST snippet compression',
      'Domain reference RAG injector with vector retrieval of past postmortems',
      'Unified OpenAI-compatible API endpoint',
    ],
    techStack: ['vLLM', 'KServe', 'Rust / Python', 'Redis', 'Qdrant'],
    targetAudience: 'Security-conscious enterprises (fintech, healthcare, defense) wanting AI developer tools without sending source code to third-party clouds.',
    monetization: 'Enterprise license starting at $15,000/year per cluster.',
    howThisArchitecturePowersIt: 'Implements the lower half of Diagram 2: Open-weight LLM (KServe + OpenEverest) + Model gateway (Bifrost) + Domain data evaluation.',
    iconName: 'Layers',
  },
];

export const INCIDENT_SCENARIOS: IncidentScenario[] = [
  {
    id: 'incident-ws-302',
    title: 'WebSocket Connection Storm & Client Memory Leak',
    severity: 'HIGH',
    source: 'GA4 Telemetry',
    summary: 'GA4 runtime exception stream detects recurring socket dropouts and rapid reconnection storms causing browser tab crashes on checkout pages.',
    rawSignal: {
      metric: 'ws_disconnect_storm_events',
      anomalyScore: 4.8,
      baseline: '0.4 events / min',
      current: '38.2 events / min',
      affectedUsers: 1420,
    },
    wsjf: {
      userValue: 8,
      timeCriticality: 9,
      riskReduction: 8,
      jobSize: 3, // WSJF = (8 + 9 + 8) / 3 = 8.33 (CRITICAL)
    },
    rootCause: 'Missing exponential backoff and unbounded event listener accumulation in WebSocketClient reconnection loop.',
    patchDiff: {
      file: 'src/lib/realtime/WebSocketClient.ts',
      original: `// Bug: Reconnect immediately without backoff and leaking listeners
reconnect() {
  this.ws = new WebSocket(this.url);
  this.ws.addEventListener('message', this.handleMessage);
  this.ws.addEventListener('close', () => this.reconnect());
}`,
      patched: `// Fix: Add exponential backoff, jitter, and listener cleanup
reconnect() {
  if (this.reconnectAttempts >= 8) {
    this.fallbackToPolling();
    return;
  }
  this.cleanupListeners();
  const backoff = Math.min(1000 * Math.pow(1.5, this.reconnectAttempts), 30000);
  const jitter = Math.random() * 500;
  this.reconnectTimer = setTimeout(() => {
    this.reconnectAttempts++;
    this.initSocket();
  }, backoff + jitter);
}`,
    },
    verificationProfiles: {
      standard: { windowHours: 1, checks: ['Unit tests pass', 'Lint check ok'] },
      elevated: { windowHours: 6, checks: ['Synthetic reconnect load test (500 clients)', 'Memory heap leak prober'] },
      strict: { windowHours: 24, checks: ['48h continuous GA4 zero-spike assertion', 'Canary 5% traffic split', 'Client unhandled rejection monitor'] },
    },
    recurrenceCount: 2,
  },
  {
    id: 'incident-chk-500',
    title: 'Checkout 500 Server Error on Multi-Item Discount',
    severity: 'CRITICAL',
    source: 'Runtime Anomaly',
    summary: 'Spike in HTTP 500 responses on /api/checkout/apply-coupon when users cart contains coupon codes exceeding 100% item value.',
    rawSignal: {
      metric: 'http_500_rate_checkout',
      anomalyScore: 7.2,
      baseline: '0.01%',
      current: '4.85%',
      affectedUsers: 3200,
    },
    wsjf: {
      userValue: 10,
      timeCriticality: 10,
      riskReduction: 9,
      jobSize: 2, // WSJF = 29 / 2 = 14.5 (P0 BLOCKED REVENUE)
    },
    rootCause: 'Uncaught TypeError in pricing calculation engine when discount total exceeds subtotal.',
    patchDiff: {
      file: 'src/services/billing/CartCalculator.ts',
      original: `// Bug: Subtraction causes negative total crashing payment gateway schema
const total = subtotal - discount;
return { finalAmount: total.toFixed(2) };`,
      patched: `// Fix: Guard against negative amounts and clamp at zero
const validDiscount = Math.min(subtotal, Math.max(0, discount));
const total = Math.max(0, subtotal - validDiscount);
return { finalAmount: total.toFixed(2), appliedDiscount: validDiscount };`,
    },
    verificationProfiles: {
      standard: { windowHours: 1, checks: ['Cart test suite', 'Snapshot verification'] },
      elevated: { windowHours: 4, checks: ['10,000 synthetic cart coupon combinations', 'E2E checkout flow'] },
      strict: { windowHours: 12, checks: ['Real payment gateway sandbox probe', 'Zero 500s across 12h telemetry'] },
    },
    recurrenceCount: 1,
  },
  {
    id: 'incident-pg-timeout',
    title: 'Payment Gateway Webhook Signature Verification Timeout',
    severity: 'MEDIUM',
    source: 'Contributor Bug',
    summary: 'Async worker pool starving during peak webhook volume due to synchronous HMAC re-computation on large raw body payloads.',
    rawSignal: {
      metric: 'webhook_worker_lag_ms',
      anomalyScore: 3.2,
      baseline: '45 ms',
      current: '6,200 ms',
      affectedUsers: 480,
    },
    wsjf: {
      userValue: 6,
      timeCriticality: 5,
      riskReduction: 6,
      jobSize: 4, // WSJF = 17 / 4 = 4.25
    },
    rootCause: 'Synchronous crypto.createHmac in Node event loop blocking incoming socket handlers.',
    patchDiff: {
      file: 'src/api/webhooks/signatureValidator.ts',
      original: `// Bug: Synchronous digest computation blocks event loop under load
const computed = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(signature));`,
      patched: `// Fix: Use crypto.subtle or worker thread pool for offloaded HMAC
import { subtle } from 'crypto';
const key = await subtle.importKey('raw', secretBuffer, { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
return await subtle.verify('HMAC', key, signatureBuffer, rawBodyBuffer);`,
    },
    verificationProfiles: {
      standard: { windowHours: 1, checks: ['Unit tests pass'] },
      elevated: { windowHours: 3, checks: ['1,000 req/sec benchmark load test'] },
      strict: { windowHours: 8, checks: ['Zero queue lag over 8 hours', 'CPU throttle monitor'] },
    },
    recurrenceCount: 0,
  },
];

export const INITIAL_DORA_METRICS: DoraMetricsState = {
  deploymentFrequency: '18.4 / day',
  leadTimeForChanges: '14.2 min',
  meanTimeToRestore: '6.5 min',
  changeFailureRate: 1.8,
  durabilityScore: 96.4,
  activeRepairs: 3,
  preventedRegressions: 42,
};

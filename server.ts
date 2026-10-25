import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini if API key is present
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  // AI Architect & Incident Analysis API endpoint
  app.post('/api/ai/architect-advice', async (req, res) => {
    try {
      const { question, incidentContext, systemLayer } = req.body;

      if (!ai) {
        return res.json({
          text: `[Offline Mode: GEMINI_API_KEY not configured] Analysis for ${systemLayer || 'Architecture'}:\nBased on your architecture diagram, the key recommendation is to bind GA4 telemetry directly into Temporal state machines. For this scenario, ensure your WSJF (Weighted Shortest Job First) calculator factors in user session impact to prevent lower priority bugs from overwhelming the Hive PR generation queue. Verify post-merge durability over a 48-hour rolling window.`,
          simulated: true,
        });
      }

      const prompt = `You are a Principal SRE & Autonomous Agent Systems Architect specializing in Temporal workflow engines, KServe LLM gateways, and the Hive Autonomous Repair Durability architecture depicted in the user's diagram.
      
Diagram details:
- Layer 1: Signal Collection (GA4 Telemetry, contributor reports, regression scans, runtime anomalies, ga4-anomaly-detector.sh)
- Layer 2: Triage & Prioritization (RICE scoring, WSJF = Cost of Delay / Job Size, Error Budgets, Governance with Merge Velocity Control & Escalated QA)
- Layer 3: Hive Orchestration Layer (Autonomous issue handling, AI PR generation, merge pipeline, kick-agents.sh, scanner/reviewer agents)
- Layer 4: Adaptive Verification Layer (Standard, Elevated, Strict verification profiles; duration & intensity scale with recurrence)
- Layer 5: Outcome Classification Layer (Resolved, Partial, Recurring; asking "Did the system actually stabilize post-merge?" instead of just "Did the PR merge?")
- Layer 6: Feedback & Metrics Layer (DORA metrics: MTTR, Change Failure Rate, Deployment Frequency, Recurrence tracking, Durability score)
- Backend Workflow Engine: Temporal workflow engine for parallel agents, durable state, retries, and human-in-the-loop review.
- Model Gateway: Bifrost / Open-weight LLMs via KServe + OpenEverest.

User Question: ${question}
Layer Context: ${systemLayer || 'General'}
Incident Scenario Context: ${JSON.stringify(incidentContext || {})}

Provide a sharp, practical, production-ready engineering answer with clear architecture breakdown, concrete recommendations, and (if applicable) code/workflow snippet. Keep formatting clean with concise markdown.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return res.json({
        text: response.text || 'No response generated.',
        simulated: false,
      });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      return res.status(500).json({
        error: err.message || 'Internal server error',
        fallback: 'Architecture tip: Ensure OODA loop loop-back delays are throttled via Temporal timer activities to avoid cascade PR thrashing.',
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // Vite middleware in dev or static files in prod
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HiveOps server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

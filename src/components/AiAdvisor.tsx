import React, { useState } from 'react';
import { Send, Bot, Sparkles, Terminal, BookOpen, CheckCircle, RefreshCw } from 'lucide-react';

interface AiAdvisorProps {
  lang: 'en' | 'hi';
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const AiAdvisor: React.FC<AiAdvisorProps> = ({ lang }) => {
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        lang === 'hi'
          ? `Namaste! Main aapka AI SRE Architect hoon. Aapke dono blueprints (Hive 6-Layer Durability Engine & Temporal + Bifrost Infrastructure) ke baare mein aap mujhse koi bhi sawal pooch sakte hain.\n\nKuch popular topics:\n1. Is architecture par startup kaise banayein?\n2. GA4 anomaly detection ko Temporal workflow se kaise link karein?\n3. WSJF Prioritization formula kaise deploy karein?\n4. KServe + Bifrost setup kaise karein?`
          : `Hello! I am your AI SRE & Systems Architect. I can help you design, implement, and commercialize the 6-layer autonomous durability architecture and Temporal multi-agent backend depicted in your diagrams.\n\nAsk me about implementation details, code templates, startup viability, or technical trade-offs.`,
      timestamp: 'Just now',
    },
  ]);

  const quickPrompts = [
    {
      label: lang === 'hi' ? 'Isse SaaS startup kaise banayein?' : 'How to commercialize this as a SaaS startup?',
      prompt: 'What is the fastest go-to-market plan to launch a commercial B2B SaaS product based on this Hive durability and post-merge verification architecture?',
    },
    {
      label: lang === 'hi' ? 'GA4 ko Temporal se kaise jodein?' : 'How to connect GA4 to Temporal workflows?',
      prompt: 'Explain the technical implementation of feeding real-time GA4 error anomalies into Temporal workflow triggers via ga4-anomaly-detector.sh.',
    },
    {
      label: lang === 'hi' ? 'Outcome Classification Layer kya hai?' : 'Explain Outcome Classification Layer',
      prompt: 'Why is the Outcome Classification Layer (Resolved vs Partial vs Recurring) the most important capability missing in traditional CI/CD, and how do we calculate durability score?',
    },
    {
      label: lang === 'hi' ? 'KServe aur Bifrost gateway ka role?' : 'Bifrost & KServe Model Gateway',
      prompt: 'How does Bifrost model gateway balance between private KServe open-weight LLMs and frontier reasoning models for automated code patches?',
    },
  ];

  const handleSend = async (textToSend?: string) => {
    const question = textToSend || input;
    if (!question.trim()) return;

    const userMsg: Message = {
      role: 'user',
      content: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/architect-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          systemLayer: 'Comprehensive Architecture & Product Strategy',
        }),
      });

      const data = await res.json();
      const reply = data.text || data.fallback || 'Response generated successfully.';

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            lang === 'hi'
              ? `Architecture Strategy: Yeh architecture complete hone ke baad software engineering teams ko autonomous auto-healing provide karta hai. Iska sabse bada USP hai Layer 5: Durability Verification Window (jo traditional CI/CD mein nahi hota). Temporal engine assure karta hai ki worker crash hone par bhi agent state resume ho sake.`
              : `Key Architectural Insight: The defining value proposition of this architecture is Layer 5 (Outcome Classification) & Layer 4 (Adaptive Verification). Unlike standard GitHub Actions that finish when a PR merges, this system runs a 1h to 48h canary window measuring GA4 telemetry, ensuring the repair is truly durable.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
          AI SYSTEMS ARCHITECT ADVISOR
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          {lang === 'hi' ? 'SRE & Product Architect Q&A' : 'AI Systems Architect & Implementation Advisor'}
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          {lang === 'hi'
            ? 'Architecture, code implementation, Temporal workflows, ya startup strategy par koi bhi sawaal poochein.'
            : 'Ask any questions on production deployment, Temporal orchestration, GA4 integration, or startup monetization.'}
        </p>
      </div>

      {/* Quick Prompts */}
      <div className="mb-6 flex flex-wrap gap-2">
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            onClick={() => handleSend(qp.prompt)}
            disabled={loading}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-indigo-500/50 transition-colors cursor-pointer disabled:opacity-50"
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-md flex flex-col h-[520px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-xl p-4 text-xs sm:text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-950/80 border border-slate-800 text-slate-200 whitespace-pre-line'
                }`}
              >
                {m.content}
                <div
                  className={`text-[10px] mt-2 font-mono ${
                    m.role === 'user' ? 'text-indigo-200' : 'text-slate-500'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 p-3 bg-slate-950/60 rounded-xl border border-slate-800 w-fit">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing architecture diagrams and formulating solution...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="pt-4 border-t border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              lang === 'hi'
                ? 'Is architecture ke baare mein kuch bhi poochein...'
                : 'Ask anything about building with this architecture...'
            }
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </section>
  );
};

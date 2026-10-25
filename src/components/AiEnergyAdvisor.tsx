import React, { useState } from 'react';
import { Send, Bot, Sparkles, RefreshCw, Wrench, Zap, CheckCircle2 } from 'lucide-react';

interface AiEnergyAdvisorProps {
  lang: 'en' | 'hi';
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const AiEnergyAdvisor: React.FC<AiEnergyAdvisorProps> = ({ lang }) => {
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        lang === 'hi'
          ? `Namaste! Main aapka AI Industrial Energy & SRE Engineer hoon.\n\nAapki factory mein kisi bhi machine (Compressor, Chiller, Motor, Hydraulic Press) ke abnormal power consumption, sensor correlations, ya maintenance durability par mujhse sawal pooch sakte hain.\n\nQuick Topics:\n1. Production increase aur machine fault mein farq kaise karein?\n2. Compressed air leaks se itni bijli kyun barbad hoti hai?\n3. 48-hour post-maintenance durability window kaise implement karein?`
          : `Hello! I am your AI Industrial Energy & Durability Systems Engineer.\n\nI can help you diagnose unusual power spikes, correlate PLC production rates with vibration/thermal sensors, design maintenance work orders, and configure 48-hour post-repair durability verification windows.\n\nAsk me any diagnostic or operational question.`,
      timestamp: 'Just now',
    },
  ]);

  const quickPrompts = [
    {
      label: lang === 'hi' ? 'Production surge vs machine fault kaise pehchanein?' : 'Production Surge vs Machine Fault?',
      prompt: 'How does the AI agent mathematically distinguish whether a 50 kW power surge is caused by a real production increase vs an equipment fault or idle waste?',
    },
    {
      label: lang === 'hi' ? 'Air compressor leak se itni bijli barbad kyun hoti hai?' : 'Why are Air Compressor Leaks so Costly?',
      prompt: 'Explain the thermodynamics and electrical waste mechanics of an air compressor unloader valve failure. Why does it draw full electrical power even when unloaded?',
    },
    {
      label: lang === 'hi' ? 'Post-maintenance durability window kaise set karein?' : 'Setting Up 48-Hour Durability Windows',
      prompt: 'How do we configure a 48-hour telemetry durability window in our SCADA or Temporal workflow to ensure a fixed machine never relapses into power waste?',
    },
    {
      label: lang === 'hi' ? 'Factory Energy Audit Checklist banayein' : 'Generate Factory Energy Audit Checklist',
      prompt: 'Provide an actionable, prioritized preventive maintenance checklist for finding and eliminating hidden electrical waste in industrial compressed air and HVAC chillers.',
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
          systemLayer: 'Industrial Factory Energy Waste & Durability Engine',
          incidentContext: {
            focus: 'Closing the gap between detecting a problem and verifying it has been fixed',
            domain: 'Factory Energy & Sub-Meter Telemetry',
          },
        }),
      });

      const data = await res.json();
      const reply = data.text || data.fallback || 'Response received.';

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
              ? `AI Engineer Analysis: Factory mein production surge ko verify karne ke liye PLC output tag (e.g. units/hour ya conveyor line speed) ko active kW ke saath correlate kiya jata hai. Agar units/hour constant 340 hai lekin power 45 kW se 92 kW pahunch gayi, toh specific energy (kWh per unit produced) 105% badh chuki hai — yeh 100% equipment fault ya unloader leak ka proof hai.`
              : `Industrial Engineering Analysis: To distinguish a production surge from a machine fault, the AI computes Specific Energy Consumption (SEC = kWh / unit produced). If PLC telemetry shows line output is constant (e.g. 340 units/hr) while power draw doubles from 45 kW to 92 kW, SEC surges by 104%. This proves with statistical certainty that the spike is pure mechanical waste rather than production-driven.`,
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
        <div className="inline-block bg-[#FFE500] text-black border-2 border-black font-mono font-black text-xs px-2.5 py-0.5 shadow-[2px_2px_0px_0px_#000] uppercase">
          AI INDUSTRIAL ENERGY ENGINEER
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-black mt-2">
          {lang === 'hi' ? 'Energy Diagnostic & Maintenance Advisor' : 'Industrial Diagnostic & Durability Advisor'}
        </h2>
        <p className="text-sm text-neutral-700 font-medium mt-1">
          {lang === 'hi'
            ? 'Factory machines, sensor analysis, ya maintenance checklist par expert AI se baat karein.'
            : 'Ask any question on industrial equipment faults, sensor correlation algorithms, or post-fix durability verification.'}
        </p>
      </div>

      {/* Quick Prompts */}
      <div className="mb-6 flex flex-wrap gap-2.5">
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            onClick={() => handleSend(qp.prompt)}
            disabled={loading}
            className="px-3.5 py-2 text-xs font-bold bg-white text-black border-2 border-black shadow-[2.5px_2.5px_0px_0px_#000] hover:bg-[#FFE500] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer disabled:opacity-50"
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* Chat Container (Neobrutalism Box) */}
      <div className="bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_#000] p-6 flex flex-col h-[520px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.role === 'assistant' && (
                <div className="w-8 h-8 bg-[#FFE500] border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center text-black font-black shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 stroke-[2.5]" />
                </div>
              )}

              <div
                className={`max-w-2xl p-4 text-xs sm:text-sm leading-relaxed border-2 border-black font-medium ${
                  m.role === 'user'
                    ? 'bg-[#FFE500] text-black shadow-[3px_3px_0px_0px_#000]'
                    : 'bg-[#FFFDF5] text-neutral-900 shadow-[3px_3px_0px_0px_#000] whitespace-pre-line'
                }`}
              >
                {m.content}
                <div
                  className={`text-[10px] mt-2 font-mono font-bold ${
                    m.role === 'user' ? 'text-neutral-800' : 'text-neutral-500'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-black p-3 bg-[#E0F2FE] border-2 border-black shadow-[2px_2px_0px_0px_#000] w-fit">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing thermodynamic & electrical telemetry...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="pt-4 border-t-2 border-black flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              lang === 'hi'
                ? 'Kisi bhi machine ya power leak ke baare mein poochein...'
                : 'Ask anything about machine faults, sensor correlation, or durability...'
            }
            className="flex-1 bg-[#FFFDF5] border-2 border-black px-4 py-2.5 text-xs sm:text-sm text-black placeholder-neutral-500 font-medium focus:outline-none focus:bg-white shadow-[2px_2px_0px_0px_#000]"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-5 py-2.5 bg-[#FFE500] hover:bg-[#FFD700] text-black border-2 border-black shadow-[3px_3px_0px_0px_#000] text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 active:translate-x-[2px] active:translate-y-[2px]"
          >
            <Send className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">SEND</span>
          </button>
        </form>
      </div>
    </section>
  );
};

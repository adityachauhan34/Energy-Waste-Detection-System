import React from 'react';
import { Shield, Sparkles, FileText, Globe } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenExport: () => void;
  lang: 'en' | 'hi';
  setLang: (lang: 'en' | 'hi') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenExport,
  lang,
  setLang,
}) => {
  const navItems = [
    { id: 'ideas', label: lang === 'hi' ? '5 Product Ideas' : '5 Product Ideas' },
    { id: 'architecture', label: lang === 'hi' ? 'Architecture Blueprint' : 'Architecture Blueprint' },
    { id: 'simulation', label: lang === 'hi' ? 'Live OODA Simulation' : 'Live OODA Simulation' },
    { id: 'wsjf', label: lang === 'hi' ? 'WSJF Workbench' : 'WSJF & Triage' },
    { id: 'temporal', label: lang === 'hi' ? 'Temporal Swarm' : 'Temporal Swarm' },
    { id: 'ai-advisor', label: lang === 'hi' ? 'AI SRE Architect' : 'AI SRE Architect' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Clean single-element) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Shield className="w-5 h-5" />
          </div>
          <button 
            onClick={() => setActiveTab('ideas')} 
            className="text-left font-bold text-lg text-white tracking-tight hover:text-indigo-400 transition-colors whitespace-nowrap"
          >
            HiveOps <span className="text-xs text-indigo-400 font-mono font-normal ml-1">Studio</span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Language toggle + Primary action) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-md hover:bg-slate-800 transition-colors whitespace-nowrap"
            title="Toggle Hindi/Hinglish & English explanations"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span>{lang === 'hi' ? 'हिन्दी / Hinglish' : 'English'}</span>
          </button>

          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-md transition-all shadow-sm shadow-indigo-500/20 whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Export Spec</span>
          </button>
        </div>
      </div>

      {/* Mobile sub-nav */}
      <div className="lg:hidden flex items-center gap-1 px-4 py-2 border-t border-slate-800/60 overflow-x-auto no-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-2.5 py-1 text-xs whitespace-nowrap rounded font-medium ${
              activeTab === item.id
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};

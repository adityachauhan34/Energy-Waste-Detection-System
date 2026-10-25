import React, { useState } from 'react';
import { PRODUCT_CONCEPTS } from '../data/architectureData';
import { ProductConcept } from '../types/architecture';
import { 
  Cpu, 
  ShieldCheck, 
  Gauge, 
  Workflow, 
  Layers, 
  ArrowRight, 
  CheckCircle, 
  DollarSign, 
  Users, 
  Code2, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface ProductIdeasSectionProps {
  lang: 'en' | 'hi';
  onSelectProductForSim: (product: ProductConcept) => void;
  onExploreLayer: (layerId: string) => void;
}

export const ProductIdeasSection: React.FC<ProductIdeasSectionProps> = ({
  lang,
  onSelectProductForSim,
  onExploreLayer,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductConcept>(PRODUCT_CONCEPTS[0]);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Gauge':
        return <Gauge className="w-5 h-5 text-amber-400" />;
      case 'Workflow':
        return <Workflow className="w-5 h-5 text-sky-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-purple-400" />;
      default:
        return <Cpu className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            {lang === 'hi' ? '5 BUSINESS & STARTUP IDEAS' : '5 COMMERCIAL PRODUCT CONCEPTS'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            {lang === 'hi'
              ? 'Is Architecture Se Aap Kya-Kya Bana Sakte Hain?'
              : 'What Can You Build With This Architecture?'}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            {lang === 'hi'
              ? 'Yahan 5 concrete enterprise SaaS aur developer infrastructure products diye gaye hain jo directly inhi components ko use karte hain.'
              : 'Here are 5 concrete enterprise SaaS and developer infrastructure platforms directly powered by this architecture.'}
          </p>
        </div>

        <div className="text-xs text-slate-400 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>Click any product below to inspect full business model & architecture mapping.</span>
        </div>
      </div>

      {/* Grid of Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-8">
        {PRODUCT_CONCEPTS.map((prod) => {
          const isSelected = selectedProduct.id === prod.id;
          return (
            <button
              key={prod.id}
              onClick={() => setSelectedProduct(prod)}
              className={`p-4 rounded-xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    {getIcon(prod.iconName)}
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      Active
                    </span>
                  )}
                </div>
                <div className="text-xs font-mono text-slate-400">{prod.category}</div>
                <div className="text-sm font-bold text-white mt-1 line-clamp-1">{prod.title}</div>
              </div>

              <div className="text-xs text-slate-400 mt-3 line-clamp-2">
                {prod.tagline}
              </div>
            </button>
          );
        })}
      </div>

      {/* Deep-Dive Inspection Panel for Selected Product */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30">
                {getIcon(selectedProduct.iconName)}
              </div>
              <div>
                <div className="text-xs font-mono text-indigo-400 tracking-wider">
                  {selectedProduct.category}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {selectedProduct.title}
                </h3>
              </div>
            </div>
            <p className="text-base text-slate-300 mt-3 max-w-3xl leading-relaxed">
              {selectedProduct.description}
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-col items-stretch gap-2 shrink-0 w-full lg:w-auto">
            <button
              onClick={() => onSelectProductForSim(selectedProduct)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/30 cursor-pointer"
            >
              <span>Simulate In Sandbox</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-[11px] text-center text-slate-400">
              Uses live OODA engine simulation
            </div>
          </div>
        </div>

        {/* 3-Column Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {/* Column 1: Key Features */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Core Product Capabilities</span>
            </h4>
            <ul className="space-y-2.5">
              {selectedProduct.keyFeatures.map((feat, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-indigo-400 font-mono">0{i + 1}.</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Tech Stack & Architecture Alignment */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-sky-400" />
              <span>Recommended Tech Stack</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedProduct.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-950 border border-slate-800 text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <div className="text-xs font-mono text-slate-400 mb-1">How Architecture Powers It:</div>
              <p className="text-xs text-slate-300 bg-slate-950/70 p-3 rounded-lg border border-slate-800 leading-relaxed">
                {selectedProduct.howThisArchitecturePowersIt}
              </p>
            </div>
          </div>

          {/* Column 3: Business & Monetization */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-amber-400" />
              <span>Business Model & Go-To-Market</span>
            </h4>
            
            <div className="space-y-3">
              <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 mb-1">
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Target Customers</span>
                </div>
                <div className="text-xs text-slate-200">
                  {selectedProduct.targetAudience}
                </div>
              </div>

              <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 mb-1">
                  <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                  <span>Monetization Model</span>
                </div>
                <div className="text-xs text-emerald-300 font-mono">
                  {selectedProduct.monetization}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

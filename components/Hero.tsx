import React from 'react';
import { Mountain, Eye, Zap } from 'lucide-react';

const Hero: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Visual Motif */}
        <div className="relative w-64 h-64 mx-auto mb-8 group cursor-pointer" onClick={onStart}>
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl group-hover:blur-4xl transition-all duration-700"></div>
          <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-b from-slate-900 to-slate-800 rounded-full border border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden animate-float">
            {/* Abstract Eagle/Mountain Composition */}
            <div className="absolute inset-0 opacity-40 bg-[url('https://picsum.photos/800/800?grayscale&blur=2')] bg-cover mix-blend-overlay"></div>
            
            <Mountain className="absolute bottom-12 w-32 h-32 text-cyan-200/80" strokeWidth={1} />
            <div className="absolute top-12 animate-pulse">
                <Eye className="w-16 h-16 text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" strokeWidth={1.5} />
            </div>
            
            {/* Wings hint */}
            <div className="absolute top-[30%] left-4 w-8 h-24 border-l-4 border-cyan-500/30 rounded-full transform -rotate-12" />
            <div className="absolute top-[30%] right-4 w-8 h-24 border-r-4 border-cyan-500/30 rounded-full transform rotate-12" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-400">
          HYPERSCALE <br/>
          <span className="font-bold tracking-widest">AI AGENTIC</span>
        </h1>
        
        <p className="text-lg md:text-xl text-cyan-100/70 max-w-2xl mx-auto font-light">
          Infrastructure Platform SaaS <span className="text-purple-400 mx-2">•</span> Cosmic Architecture
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-8">
          <button 
            onClick={onStart}
            className="px-8 py-4 bg-cyan-950/50 border border-cyan-500/50 rounded-lg text-cyan-300 hover:bg-cyan-900/50 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.15)] flex items-center gap-2 group"
          >
            <Zap className="w-5 h-5 group-hover:text-yellow-300 transition-colors" />
            Initialize Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
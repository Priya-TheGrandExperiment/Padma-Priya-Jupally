import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Prompt allows libraries, but I'll adhere to simple react-state animation if preferable, but sticking to guidelines, I will use Tailwind for simple transitions and standard react. 
// Actually, I will stick to pure Tailwind/React for stability as per guidelines unless strictly necessary. 
import { LayerNode } from '../types';
import { BLUEPRINT_NODES } from '../constants';
import { Network, Brain, Server, Scale, Globe, Lock } from 'lucide-react';

interface BlueprintMapProps {
  onNodeSelect: (node: LayerNode) => void;
}

const BlueprintMap: React.FC<BlueprintMapProps> = ({ onNodeSelect }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const renderIcon = (type: string) => {
    switch (type) {
      case 'agentic': return <Brain className="w-8 h-8 text-purple-300" />;
      case 'conscious': return <Network className="w-6 h-6 text-cyan-300" />;
      case 'digital': return <Server className="w-6 h-6 text-blue-300" />;
      case 'foundation': return <Globe className="w-6 h-6 text-emerald-300" />;
      default: return <Scale className="w-6 h-6" />;
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-4xl w-full relative min-h-[600px]">
        
        {/* Connecting Lines (SVG Overlay) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30">
          <line x1="50%" y1="10%" x2="50%" y2="30%" stroke="#22d3ee" strokeWidth="2" />
          <line x1="50%" y1="30%" x2="25%" y2="50%" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4" />
          <line x1="50%" y1="30%" x2="75%" y2="50%" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4" />
          <line x1="25%" y1="60%" x2="50%" y2="80%" stroke="#a855f7" strokeWidth="1" />
          <line x1="75%" y1="60%" x2="50%" y2="80%" stroke="#a855f7" strokeWidth="1" />
          {/* Pyramid Outline */}
          <path d="M 50% 10% L 90% 90% L 10% 90% Z" fill="none" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="2" />
        </svg>

        {/* Layer 4: Agentic Core (Top) */}
        <div className="absolute top-[5%] left-1/2 transform -translate-x-1/2 z-10">
           <NodeCard node={BLUEPRINT_NODES[0]} renderIcon={renderIcon} onClick={onNodeSelect} />
        </div>

        {/* Layer 3: Conscious & Subconscious (Middle Split) */}
        <div className="absolute top-[35%] w-full flex justify-around z-10 px-8">
          <div className="transform -translate-y-4">
            <NodeCard node={BLUEPRINT_NODES[1]} renderIcon={renderIcon} onClick={onNodeSelect} />
          </div>
          <div className="transform translate-y-4">
             <NodeCard node={BLUEPRINT_NODES[2]} renderIcon={renderIcon} onClick={onNodeSelect} />
          </div>
        </div>

        {/* Layer 2: Digital Transformation (Center Core) */}
        <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 z-20">
          <NodeCard node={BLUEPRINT_NODES[3]} renderIcon={renderIcon} onClick={onNodeSelect} isCenter />
        </div>

        {/* Layer 1: Foundations (Bottom Split) */}
        <div className="absolute bottom-[10%] w-full flex justify-between px-12 z-10">
           <NodeCard node={BLUEPRINT_NODES[4]} renderIcon={renderIcon} onClick={onNodeSelect} />
           <NodeCard node={BLUEPRINT_NODES[5]} renderIcon={renderIcon} onClick={onNodeSelect} />
        </div>

        {/* Labels floating */}
        <div className="absolute top-20 right-10 text-xs text-cyan-500/50 font-mono tracking-widest rotate-90 origin-top-right">
          INFINITE INTELLIGENCE
        </div>
        <div className="absolute bottom-20 left-10 text-xs text-emerald-500/50 font-mono tracking-widest -rotate-90 origin-top-left">
          PHYSICAL REALITY
        </div>

      </div>
    </div>
  );
};

const NodeCard: React.FC<{ 
  node: LayerNode; 
  renderIcon: (t: string) => React.ReactNode; 
  onClick: (n: LayerNode) => void;
  isCenter?: boolean;
}> = ({ node, renderIcon, onClick, isCenter }) => (
  <button 
    onClick={() => onClick(node)}
    className={`
      relative group flex flex-col items-center gap-3 p-4 rounded-xl backdrop-blur-md border transition-all duration-300
      ${isCenter 
        ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.2)] w-64' 
        : 'bg-slate-900/40 border-slate-700 hover:border-purple-400 hover:bg-slate-800/60 w-48'
      }
    `}
  >
    <div className={`
      p-3 rounded-full bg-gradient-to-br 
      ${isCenter ? 'from-cyan-500 to-blue-600' : 'from-slate-700 to-slate-900 group-hover:from-purple-900 group-hover:to-purple-600'}
    `}>
      {renderIcon(node.type)}
    </div>
    <div className="text-center">
      <h3 className="text-sm font-bold text-slate-200 tracking-wide">{node.title}</h3>
      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-tight">{node.description}</p>
    </div>
    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      {node.tags.slice(0, 2).map(tag => (
        <span key={tag} className="px-1.5 py-0.5 bg-slate-950 text-[10px] text-cyan-400 rounded border border-cyan-900">
          {tag}
        </span>
      ))}
    </div>
  </button>
);

export default BlueprintMap;
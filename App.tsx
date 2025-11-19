import React, { useState } from 'react';
import StarBackground from './components/StarBackground';
import Hero from './components/Hero';
import BlueprintMap from './components/BlueprintMap';
import GlobalStats from './components/GlobalStats';
import OracleChat from './components/OracleChat';
import { ViewState, LayerNode } from './types';
import { LayoutGrid, Globe, MessageSquare, X } from 'lucide-react';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.DASHBOARD);
  const [showChat, setShowChat] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [selectedNode, setSelectedNode] = useState<LayerNode | null>(null);

  const handleStart = () => {
    setHeroVisible(false);
    setViewState(ViewState.BLUEPRINT);
  };

  const handleNodeSelect = (node: LayerNode) => {
    setSelectedNode(node);
    setShowChat(true);
  };

  return (
    <div className="relative min-h-screen w-full text-slate-200 overflow-hidden font-sans selection:bg-cyan-500/30 selection:text-cyan-100">
      <StarBackground />

      {/* Main Content Area */}
      <main className={`transition-opacity duration-1000 ${heroVisible ? 'opacity-100' : 'opacity-100'}`}>
        {heroVisible ? (
          <Hero onStart={handleStart} />
        ) : (
          <div className="flex flex-col h-screen">
            {/* Navbar */}
            <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-6 z-50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse"></div>
                <span className="font-bold tracking-widest text-sm md:text-base bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                  COSMIC INFRASTRUCTURE
                </span>
              </div>
              
              <nav className="flex gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
                <button 
                  onClick={() => setViewState(ViewState.BLUEPRINT)}
                  className={`px-4 py-1.5 rounded text-sm flex items-center gap-2 transition-all ${viewState === ViewState.BLUEPRINT ? 'bg-cyan-950 text-cyan-400 shadow-inner' : 'text-slate-400 hover:text-white'}`}
                >
                  <LayoutGrid size={16} />
                  <span className="hidden sm:inline">Blueprint</span>
                </button>
                <button 
                  onClick={() => setViewState(ViewState.GLOBAL_DATA)}
                  className={`px-4 py-1.5 rounded text-sm flex items-center gap-2 transition-all ${viewState === ViewState.GLOBAL_DATA ? 'bg-cyan-950 text-cyan-400 shadow-inner' : 'text-slate-400 hover:text-white'}`}
                >
                  <Globe size={16} />
                  <span className="hidden sm:inline">Global Nodes</span>
                </button>
              </nav>

              <button 
                onClick={() => setShowChat(!showChat)}
                className={`p-2 rounded-full border transition-all ${showChat ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'}`}
              >
                <MessageSquare size={20} />
              </button>
            </header>

            {/* Workspace */}
            <div className="flex-1 relative flex overflow-hidden">
              
              {/* Center Stage */}
              <div className="flex-1 relative overflow-y-auto">
                 {viewState === ViewState.BLUEPRINT && (
                   <div className="h-full animate-in fade-in duration-500">
                     <BlueprintMap onNodeSelect={handleNodeSelect} />
                   </div>
                 )}
                 
                 {viewState === ViewState.GLOBAL_DATA && (
                   <div className="h-full animate-in zoom-in-95 duration-500">
                     <GlobalStats />
                   </div>
                 )}
              </div>

              {/* Chat Panel (Sliding) */}
              <div className={`
                fixed inset-y-0 right-0 w-full md:w-[400px] transform transition-transform duration-300 ease-in-out z-50
                ${showChat ? 'translate-x-0' : 'translate-x-full'}
                md:relative md:transform-none md:w-[400px]
                ${showChat ? 'md:block' : 'md:hidden'}
              `}>
                 {/* Mobile close button for chat */}
                 <button 
                   onClick={() => setShowChat(false)}
                   className="md:hidden absolute top-4 right-4 z-50 p-2 bg-slate-900 text-white rounded-full"
                 >
                   <X size={20} />
                 </button>
                 <OracleChat 
                    contextInfo={selectedNode ? `User is focusing on the ${selectedNode.title} (${selectedNode.type}) node.` : undefined}
                 />
              </div>

            </div>
          </div>
        )}
      </main>
      
      {/* Footer attribution/status */}
      {!heroVisible && (
        <div className="fixed bottom-0 left-0 w-full h-6 bg-slate-950 border-t border-slate-900 flex items-center justify-between px-4 text-[10px] text-slate-600 pointer-events-none z-40">
           <span>SYSTEM: ONLINE</span>
           <span>LATENCY: 12ms</span>
        </div>
      )}
    </div>
  );
};

export default App;
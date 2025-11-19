import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToAgent } from '../services/geminiService';

interface OracleChatProps {
  contextInfo?: string;
}

const OracleChat: React.FC<OracleChatProps> = ({ contextInfo }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Greetings, Architect. I am the Hyperscale Agent. How may I assist in visualizing the infrastructure today?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const context = contextInfo || "Dashboard Overview";
    const responseText = await sendMessageToAgent(input, context);

    const modelMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950/80 backdrop-blur-xl border-l border-slate-800 w-full md:w-[400px] fixed md:relative right-0 top-0 z-40 shadow-2xl">
      <div className="p-4 border-b border-slate-800 bg-slate-900/50">
        <h3 className="text-cyan-400 font-mono text-sm flex items-center gap-2">
          <Bot className="w-4 h-4" />
          ORACLE_INTERFACE_V2.5
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
              ${msg.role === 'user' ? 'bg-slate-700 text-white' : 'bg-cyan-900/50 text-cyan-300 border border-cyan-500/30'}
            `}>
              {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>
            <div className={`
              p-3 rounded-lg max-w-[80%] text-sm leading-relaxed
              ${msg.role === 'user' 
                ? 'bg-slate-800 text-slate-200 border border-slate-700' 
                : 'bg-cyan-950/30 text-cyan-100 border border-cyan-900/50'}
            `}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-cyan-900/50 flex items-center justify-center border border-cyan-500/30">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
            </div>
            <div className="p-3 bg-cyan-950/30 rounded-lg border border-cyan-900/50">
              <span className="animate-pulse text-cyan-500 text-xs">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-900/80">
        <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-lg p-2 focus-within:border-cyan-500/50 transition-colors">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Query the Cosmic Core..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-2 text-cyan-500 hover:text-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OracleChat;
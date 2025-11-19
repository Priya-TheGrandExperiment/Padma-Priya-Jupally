import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { GLOBAL_POPULATION_DATA } from '../constants';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-cyan-500/30 p-4 rounded-lg shadow-xl backdrop-blur-sm">
        <p className="font-bold text-cyan-300 text-lg">{label}</p>
        <p className="text-white text-sm mb-2">
          Population: <span className="font-mono text-cyan-100">{(payload[0].value / 1000000).toFixed(1)}M</span>
        </p>
        <p className="text-xs text-purple-300 italic border-t border-slate-700 pt-2 mt-2">
          Totem: {payload[0].payload.animalTotem}
        </p>
      </div>
    );
  }
  return null;
};

const GlobalStats: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl md:text-3xl font-light text-white">Reality vs. Imagination</h2>
          <p className="text-cyan-400/60 text-sm uppercase tracking-widest mt-1">Demographic Data Nodes</p>
        </div>
        <div className="hidden md:block text-right">
          <div className="text-xs text-slate-500">TOTAL NODES</div>
          <div className="text-xl font-mono text-purple-400">8</div>
        </div>
      </div>

      <div className="flex-grow min-h-[400px] bg-slate-900/30 rounded-2xl border border-slate-800 p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={GLOBAL_POPULATION_DATA}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={80} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
              axisLine={false}
              tickLine={false}
            />
            <Tooltip cursor={{fill: '#334155', opacity: 0.2}} content={<CustomTooltip />} />
            <Bar dataKey="population" radius={[0, 4, 4, 0]}>
              {GLOBAL_POPULATION_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} fillOpacity={0.8} />
              ))}
              <LabelList 
                dataKey="population" 
                position="right" 
                formatter={(val: number) => `${(val/1000000).toFixed(0)}M`} 
                style={{ fill: '#e2e8f0', fontSize: '12px', opacity: 0.7 }} 
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {GLOBAL_POPULATION_DATA.slice(0, 4).map((country) => (
          <div key={country.name} className="bg-slate-800/50 p-3 rounded border border-slate-700/50 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: country.fill }}></div>
            <div>
              <div className="text-xs text-slate-400">{country.name}</div>
              <div className="text-[10px] text-cyan-500 uppercase">{country.animalTotem}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalStats;
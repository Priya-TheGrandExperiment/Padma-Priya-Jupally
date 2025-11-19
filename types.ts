export interface CountryData {
  name: string;
  population: number;
  animalTotem: string;
  fill: string;
}

export interface LayerNode {
  id: string;
  title: string;
  description: string;
  type: 'foundation' | 'digital' | 'conscious' | 'agentic';
  tags: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  BLUEPRINT = 'BLUEPRINT',
  ORACLE = 'ORACLE',
  GLOBAL_DATA = 'GLOBAL_DATA'
}
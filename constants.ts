import { CountryData, LayerNode } from './types';

export const GLOBAL_POPULATION_DATA: CountryData[] = [
  { name: 'India', population: 1427619395, animalTotem: 'Bengal Tiger', fill: '#22d3ee' }, // Cyan
  { name: 'China', population: 1425698583, animalTotem: 'Panda', fill: '#818cf8' }, // Indigo
  { name: 'USA', population: 339996563, animalTotem: 'Bald Eagle', fill: '#c084fc' }, // Purple
  { name: 'Indonesia', population: 277534122, animalTotem: 'Komodo Dragon', fill: '#f472b6' }, // Pink
  { name: 'Pakistan', population: 240485658, animalTotem: 'Markhor', fill: '#fb7185' }, // Rose
  { name: 'Nigeria', population: 223804632, animalTotem: 'African Elephant', fill: '#38bdf8' }, // Sky
  { name: 'Brazil', population: 216422446, animalTotem: 'Toucan', fill: '#a78bfa' }, // Violet
  { name: 'Bangladesh', population: 172954319, animalTotem: 'Royal Bengal Tiger', fill: '#818cf8' },
];

export const BLUEPRINT_NODES: LayerNode[] = [
  {
    id: 'agentic-top',
    title: 'Hyperscale Agentic Core',
    description: 'The central AI consciousness managing the infrastructure. Symbolized by the Blue Cosmic Eagle.',
    type: 'agentic',
    tags: ['AI', 'Orchestration', 'Vision']
  },
  {
    id: 'conscious-layer',
    title: 'The Law of One (Conscious)',
    description: 'Social interaction, gaming, and dating interfaces. The external facing behavior layer.',
    type: 'conscious',
    tags: ['Social', 'Behavior', 'Ethics']
  },
  {
    id: 'subconscious-layer',
    title: 'Sub-Conscious Deep Store',
    description: 'Underlying biases, cultural geography, and hidden emotional drivers. The "Invisible" data lake.',
    type: 'conscious',
    tags: ['Bias', 'Culture', 'Emotion']
  },
  {
    id: 'digital-transform',
    title: 'Digital Transformation STEM',
    description: 'The bridge between physical reality and digital abstraction. Mathematics, Logic, and AI Models.',
    type: 'digital',
    tags: ['STEM', 'Transformation', 'Compute']
  },
  {
    id: 'foundation-shiva',
    title: 'Eastern Pole (Shiva)',
    description: 'Represents destruction/regeneration and energetic potential. Linked to India/China dynamics.',
    type: 'foundation',
    tags: ['Energy', 'East', 'Regeneration']
  },
  {
    id: 'foundation-shakti',
    title: 'Western Pole (Shakti)',
    description: 'Represents power, execution, and manifestation. Linked to USA/Europe dynamics.',
    type: 'foundation',
    tags: ['Power', 'West', 'Execution']
  }
];
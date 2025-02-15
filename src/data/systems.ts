export interface Node {
  id: string;
  name: string;
  group: string;
  description: string;
  color: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface Link {
  source: string;
  target: string;
  value: number;
}

export interface Group {
  id: string;
  name: string;
  color: string;
}

export interface SystemData {
  nodes: Node[];
  links: Link[];
  groups: Group[];
}

export const systems: SystemData = {
  groups: [
    { id: 'core', name: 'Core Systems', color: '#3b82f6' },
    { id: 'attention', name: 'Attention Systems', color: '#10b981' },
    { id: 'reasoning', name: 'Reasoning Systems', color: '#f59e0b' },
    { id: 'memory', name: 'Memory Systems', color: '#8b5cf6' }
  ],
  nodes: [
    // Core Systems
    {
      id: 'atomspace',
      name: 'AtomSpace',
      group: 'core',
      color: '#3b82f6',
      description: 'Core knowledge representation system'
    },
    {
      id: 'truthvalues',
      name: 'TruthValues',
      group: 'core',
      color: '#3b82f6',
      description: 'Probabilistic truth value system'
    },
    {
      id: 'types',
      name: 'Type System',
      group: 'core',
      color: '#3b82f6',
      description: 'Atom type hierarchy and validation'
    },

    // Attention Systems
    {
      id: 'ecan',
      name: 'ECAN',
      group: 'attention',
      color: '#10b981',
      description: 'Economic Attention Network'
    },
    {
      id: 'hebbian',
      name: 'Hebbian',
      group: 'attention',
      color: '#10b981',
      description: 'Hebbian learning system'
    },
    {
      id: 'importance',
      name: 'Importance',
      group: 'attention',
      color: '#10b981',
      description: 'Attention allocation system'
    },

    // Reasoning Systems
    {
      id: 'pln',
      name: 'PLN',
      group: 'reasoning',
      color: '#f59e0b',
      description: 'Probabilistic Logic Networks'
    },
    {
      id: 'rules',
      name: 'Rules',
      group: 'reasoning',
      color: '#f59e0b',
      description: 'Inference rule system'
    },
    {
      id: 'patterns',
      name: 'Patterns',
      group: 'reasoning',
      color: '#f59e0b',
      description: 'Pattern matching and mining'
    },

    // Memory Systems
    {
      id: 'episodic',
      name: 'Episodic',
      group: 'memory',
      color: '#8b5cf6',
      description: 'Episodic memory system'
    },
    {
      id: 'semantic',
      name: 'Semantic',
      group: 'memory',
      color: '#8b5cf6',
      description: 'Semantic memory system'
    },
    {
      id: 'procedural',
      name: 'Procedural',
      group: 'memory',
      color: '#8b5cf6',
      description: 'Procedural memory system'
    }
  ],
  links: [
    // Core System Links
    { source: 'atomspace', target: 'truthvalues', value: 2 },
    { source: 'atomspace', target: 'types', value: 2 },
    { source: 'truthvalues', target: 'types', value: 1 },

    // Attention System Links
    { source: 'ecan', target: 'hebbian', value: 2 },
    { source: 'ecan', target: 'importance', value: 2 },
    { source: 'hebbian', target: 'importance', value: 1 },

    // Reasoning System Links
    { source: 'pln', target: 'rules', value: 2 },
    { source: 'pln', target: 'patterns', value: 2 },
    { source: 'rules', target: 'patterns', value: 1 },

    // Memory System Links
    { source: 'episodic', target: 'semantic', value: 1 },
    { source: 'semantic', target: 'procedural', value: 1 },

    // Cross-System Links
    { source: 'atomspace', target: 'ecan', value: 2 },
    { source: 'atomspace', target: 'pln', value: 2 },
    { source: 'atomspace', target: 'episodic', value: 2 },
    { source: 'ecan', target: 'pln', value: 1 },
    { source: 'pln', target: 'semantic', value: 1 },
    { source: 'patterns', target: 'procedural', value: 1 }
  ]
};
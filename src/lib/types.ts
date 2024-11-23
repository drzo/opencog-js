export type AtomType = 'ConceptNode' | 'PredicateNode' | 'ListLink' | 'EvaluationLink' | 'VariableNode';

export interface TruthValue {
  strength: number;
  confidence: number;
}

export interface AttentionValue {
  sti: number;  // Short-term importance
  lti: number;  // Long-term importance
  vlti: boolean; // Very long-term importance
}

export interface Atom {
  id: string;
  type: AtomType;
  name: string;
  value?: any;
  outgoing?: string[];
  truthValue?: TruthValue;
  attention?: AttentionValue;
}

export type LogicalOperator = 'AND' | 'OR' | 'NOT';
export type TruthValueOperator = 'REVISION' | 'DEDUCTION' | 'INTERSECTION' | 'UNION';

export interface RecursiveOptions {
  maxDepth?: number;
  followLinks?: boolean;
  detectCycles?: boolean;
}

export interface Pattern {
  type?: AtomType;
  name?: string;
  outgoing?: (string | Pattern)[];
  isVariable?: boolean;
  variableName?: string;
  operator?: LogicalOperator;
  patterns?: Pattern[];
  tvOperator?: TruthValueOperator;
  recursive?: RecursiveOptions;
}

export interface BindingMap {
  [variableName: string]: Atom;
}

export interface QueryResult {
  atoms: Atom[];
  bindings: BindingMap;
  computedTruthValue?: TruthValue;
  depth?: number;
}

export interface AtomSpaceState {
  atoms: Map<string, Atom>;
  addAtom: (atom: Atom) => void;
  removeAtom: (id: string) => void;
  getAtom: (id: string) => Atom | undefined;
  getAtomsByType: (type: AtomType) => Atom[];
  findPatterns: (pattern: Pattern) => QueryResult[];
}
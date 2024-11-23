import { Atom, TruthValue } from '../../types';
import { PLNRule } from './pln-rule';
import { calculateAbduction } from '../truth-values/operations';

export class AbductionRule implements PLNRule {
  name = 'Abduction';
  description = 'Infer possible explanations through backward reasoning';

  apply(atoms: Atom[]): Atom[] {
    if (!this.validate(atoms)) return [];
    
    const [A, B, C] = atoms;
    if (!A.truthValue || !B.truthValue || !C.truthValue) return [];

    const tv = calculateAbduction(A.truthValue, C.truthValue);
    
    return [{
      id: `${A.id}⊢${C.id}`,
      type: 'ImplicationLink',
      name: `Abduction(${A.name},${C.name})`,
      outgoing: [A.id, C.id],
      truthValue: tv,
      metadata: {
        confidence: tv.confidence * 0.7, // Reduced confidence for abductive reasoning
        source: 'AbductionRule'
      }
    }];
  }

  validate(atoms: Atom[]): boolean {
    return atoms.length === 3 && 
           atoms.every(atom => atom.truthValue !== undefined);
  }
}
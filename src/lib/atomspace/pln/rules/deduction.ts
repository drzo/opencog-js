import { Atom, TruthValue } from '../../types';
import { PLNRule } from './pln-rule';
import { calculateDeduction } from '../truth-values/operations';

export class DeductionRule implements PLNRule {
  name = 'Deduction';
  description = 'If A implies B and B implies C, then A implies C';

  apply(atoms: Atom[]): Atom[] {
    if (atoms.length < 3) return [];
    
    const [A, B, C] = atoms;
    if (!A.truthValue || !B.truthValue || !C.truthValue) return [];

    const tv = calculateDeduction(A.truthValue, B.truthValue);
    
    return [{
      id: `${A.id}->${C.id}`,
      type: 'ImplicationLink',
      name: `Deduction(${A.name},${C.name})`,
      outgoing: [A.id, C.id],
      truthValue: tv
    }];
  }

  validate(atoms: Atom[]): boolean {
    if (atoms.length !== 3) return false;
    return atoms.every(atom => 
      atom.truthValue && 
      atom.truthValue.strength >= 0 && 
      atom.truthValue.strength <= 1 &&
      atom.truthValue.confidence >= 0 &&
      atom.truthValue.confidence <= 1
    );
  }
}
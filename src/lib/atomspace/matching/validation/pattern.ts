import { Pattern } from '../../../types';

export function validatePattern(pattern: Pattern): boolean {
  // Basic pattern validation
  if (!pattern) return false;

  // Variable pattern validation
  if (pattern.isVariable) {
    if (!pattern.variableName) return false;
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(pattern.variableName)) return false;
  }

  // Operator pattern validation
  if (pattern.operator) {
    if (!pattern.patterns || !Array.isArray(pattern.patterns)) return false;
    if (pattern.patterns.length === 0) return false;
    if (pattern.operator === 'NOT' && pattern.patterns.length !== 1) return false;
    return pattern.patterns.every(validatePattern);
  }

  // Outgoing links validation
  if (pattern.outgoing) {
    if (!Array.isArray(pattern.outgoing)) return false;
    return pattern.outgoing.every(link => 
      typeof link === 'string' || validatePattern(link)
    );
  }

  // Type validation
  if (pattern.type) {
    const validTypes = ['ConceptNode', 'PredicateNode', 'ListLink', 'EvaluationLink', 'VariableNode'];
    if (!validTypes.includes(pattern.type)) return false;
  }

  // Recursive options validation
  if (pattern.recursive) {
    if (typeof pattern.recursive.maxDepth === 'number') {
      if (pattern.recursive.maxDepth < 0) return false;
    }
    if (typeof pattern.recursive.followLinks !== 'boolean' &&
        pattern.recursive.followLinks !== undefined) return false;
    if (typeof pattern.recursive.detectCycles !== 'boolean' &&
        pattern.recursive.detectCycles !== undefined) return false;
  }

  return true;
}
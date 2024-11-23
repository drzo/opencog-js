import { Atom, Pattern, BindingMap, MatchContext, MatchResult } from '../../types';
import { PatternValidator } from './validation/pattern-validator';
import { MatchContextValidator } from './validation/match-context-validator';
import { handleVariableBinding } from './variables/binding';
import { handleLogicalOperator } from './operators/logical';
import { handleOutgoingLinks } from './links/outgoing';
import { handleRecursion } from './recursion';

export class PatternMatcher {
  static match(
    atom: Atom,
    pattern: Pattern,
    bindings: BindingMap,
    context: MatchContext
  ): MatchResult | null {
    // Validate inputs
    if (!PatternValidator.validate(pattern)) return null;
    if (!MatchContextValidator.validate(context)) return null;

    // Handle recursion
    if (pattern.recursive) {
      return handleRecursion(atom, pattern, bindings, context);
    }

    // Handle variable patterns
    if (pattern.isVariable) {
      return handleVariableBinding(atom, pattern, bindings, context.depth);
    }

    // Match type and name if specified
    if (pattern.type && pattern.type !== atom.type) return null;
    if (pattern.name && pattern.name !== atom.name) return null;

    // Handle logical operators
    if (pattern.operator && pattern.patterns) {
      return handleLogicalOperator(atom, pattern, bindings, context);
    }

    // Handle outgoing links
    if (pattern.outgoing && atom.outgoing) {
      return handleOutgoingLinks(atom, pattern, bindings, context);
    }

    // Simple match
    return {
      matched: true,
      matchedAtoms: [atom],
      bindings,
      depth: context.depth
    };
  }
}
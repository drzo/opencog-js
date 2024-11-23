import { CoreRules } from './core';
import { TemporalRules } from './temporal';
import { MetaRules } from './meta';
import { FuzzyRules } from './fuzzy';
import { ContextualRules } from './contextual';
import { IntensionalRules } from './intensional';

// Combine all rule sets
export const PLNRules = {
  ...CoreRules,
  ...TemporalRules,
  ...MetaRules,
  ...FuzzyRules,
  ...ContextualRules,
  ...IntensionalRules
};

// Register default rules
export const defaultRules = [
  // Core Rules
  new CoreRules.HigherOrderRule(),
  new CoreRules.ProbabilisticRule(),
  new CoreRules.ExtensionalRule(),
  
  // Temporal Rules
  new TemporalRules.TemporalProjectionRule(),
  
  // Meta Rules
  new MetaRules.MetaLearningRule(),
  
  // Additional rules...
  new FuzzyRules.FuzzyConjunctionRule(),
  new ContextualRules.ContextualCompositionRule(),
  new IntensionalRules.IntensionalInheritanceRule()
];

export * from './core';
export * from './temporal';
export * from './meta';
export * from './fuzzy';
export * from './contextual';
export * from './intensional';
import React from 'react';
import { QueryResult } from '../../lib/types';
import { TruthValueDisplay } from '../truth-value/TruthValueDisplay';

interface QueryResultsProps {
  results: QueryResult[];
}

export const QueryResults: React.FC<QueryResultsProps> = ({ results }) => {
  if (results.length === 0) {
    return <div className="text-gray-500">No results found</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Results ({results.length})</h4>
      </div>

      {results.map((result, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium">Result {index + 1}</h4>
            {result.depth !== undefined && (
              <span className="text-sm text-gray-500">
                Depth: {result.depth}
              </span>
            )}
          </div>
          
          {result.computedTruthValue && (
            <div className="mb-3">
              <TruthValueDisplay 
                truthValue={result.computedTruthValue}
                label="Computed Truth Value"
              />
            </div>
          )}

          <div className="space-y-2">
            <h5 className="text-sm font-medium">Matched Atoms:</h5>
            <div className="bg-gray-50 p-3 rounded-md">
              <ul className="list-disc list-inside text-sm space-y-1">
                {result.atoms.map(atom => (
                  <li key={atom.id} className="text-gray-700">
                    <span className="font-medium">{atom.type}</span> - {atom.name}
                    {atom.truthValue && (
                      <span className="text-gray-500">
                        {' '}(s: {atom.truthValue.strength.toFixed(2)}, c: {atom.truthValue.confidence.toFixed(2)})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {Object.keys(result.bindings).length > 0 && (
            <div className="mt-3 space-y-2">
              <h5 className="text-sm font-medium">Variable Bindings:</h5>
              <div className="bg-gray-50 p-3 rounded-md">
                <ul className="list-disc list-inside text-sm space-y-1">
                  {Object.entries(result.bindings).map(([variable, atom]) => (
                    <li key={variable} className="text-gray-700">
                      <span className="font-medium">{variable}</span> → {atom.type} - {atom.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
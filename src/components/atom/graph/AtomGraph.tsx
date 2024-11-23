import React, { useState } from 'react';
import { useAtomSpace } from '../../../lib/atomspace';
import { AtomGraphRenderer } from './renderer/AtomGraphRenderer';
import { AtomGraphControls } from './controls/AtomGraphControls';
import { GraphLayout } from './renderer/types';

export const AtomGraph: React.FC = () => {
  const atomSpace = useAtomSpace();
  const [layout, setLayout] = useState<GraphLayout>('force');
  const [showLabels, setShowLabels] = useState(true);

  const handleResetView = () => {
    // Reset zoom and pan
  };

  return (
    <div className="space-y-4">
      <AtomGraphControls
        onLayoutChange={setLayout}
        onLabelsToggle={() => setShowLabels(!showLabels)}
        onResetView={handleResetView}
        showLabels={showLabels}
        currentLayout={layout}
      />
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <AtomGraphRenderer
          atoms={Array.from(atomSpace.atoms.values())}
          layout={layout}
          showLabels={showLabels}
        />
      </div>
    </div>
  );
};
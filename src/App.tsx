import React, { useState } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { AtomSpaceVisualization } from './components/AtomSpaceVisualization';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Set dark mode as default

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">OpenCog JS Simulation</h1>
          <ThemeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
        </div>
        
        <div className={`bg-opacity-50 rounded-lg shadow-lg p-6 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <AtomSpaceVisualization isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
}

export default App;
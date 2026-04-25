import React from 'react';
import MarketWatch from '@/components/MarketWatch';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans antialiased text-gray-900 dark:text-gray-100">
      <header className="border-b bg-white dark:bg-gray-950 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-inner">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400">
            CongressTrade Sentinel
          </h1>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#" className="text-blue-600 dark:text-blue-400">Market Watch</a>
          <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Politicians</a>
          <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Analysis</a>
        </nav>
      </header>
      <main className="max-w-7xl mx-auto py-8">
        <MarketWatch />
      </main>
    </div>
  );
}

export default App;

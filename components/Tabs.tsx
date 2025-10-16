
import React from 'react';
import type { TabType } from '../types';
import { BookOpen, Layers3, Sparkles, Film, List } from './Icons';

interface TabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const TABS: { name: TabType; icon: React.ReactNode }[] = [
  { name: 'Overview', icon: <BookOpen /> },
  { name: 'Carousels', icon: <Layers3 /> },
  { name: 'Flashcards', icon: <Sparkles /> },
  { name: 'Scenarios', icon: <Film /> },
  { name: 'Glossary', icon: <List /> },
];

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-700">
      <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
        {TABS.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
              ${
                activeTab === tab.name
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
              }
              transition-colors duration-200 focus:outline-none
            `}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;

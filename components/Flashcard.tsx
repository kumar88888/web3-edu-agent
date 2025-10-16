import React, { useState, ReactNode } from 'react';
import type { FlashcardData } from '../types';
import { Lock, Link, GitBranch, Cube, FileText, Info } from './Icons';

interface FlashcardProps {
  flashcard: FlashcardData;
}

const getTermIcon = (iconName: string): ReactNode => {
    const lowerCaseName = iconName.toLowerCase().split(' ')[0]; // Use first word
    switch (lowerCaseName) {
        case 'lock':
        case 'security':
        case 'private':
        case 'key':
            return <Lock className="w-12 h-12 text-gray-400 mb-4" />;
        case 'bridge':
        case 'link':
        case 'connection':
        case 'interoperability':
            return <Link className="w-12 h-12 text-gray-400 mb-4" />;
        case 'tree':
        case 'branch':
        case 'fork':
            return <GitBranch className="w-12 h-12 text-gray-400 mb-4" />;
        case 'block':
        case 'cube':
        case 'package':
        case 'node':
            return <Cube className="w-12 h-12 text-gray-400 mb-4" />;
        case 'contract':
        case 'document':
        case 'file':
        case 'script':
            return <FileText className="w-12 h-12 text-gray-400 mb-4" />;
        default:
            return <Info className="w-12 h-12 text-gray-400 mb-4" />;
    }
};


const Flashcard: React.FC<FlashcardProps> = ({ flashcard }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [visibleLevel, setVisibleLevel] = useState(0);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setVisibleLevel(0); // Reset explanation level on flip
  };
  
  const TermIcon = getTermIcon(flashcard.icon);

  return (
    <div className="perspective-1000 h-96 group" onClick={handleFlip}>
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:scale-[1.03] ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-gray-800 rounded-xl shadow-lg flex flex-col justify-center items-center p-6 cursor-pointer border border-gray-700">
          {TermIcon}
          <h3 className="text-2xl font-bold text-center text-blue-400">{flashcard.term}</h3>
          <p className="text-gray-400 mt-2 text-sm">Click to reveal explanation</p>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden bg-gray-700 rounded-xl shadow-lg flex flex-col p-6 cursor-pointer rotate-y-180 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <h4 className="text-lg font-bold text-white mb-2" onClick={handleFlip}>{flashcard.term}</h4>
          <div className="space-y-3 flex-grow">
            {flashcard.explanations.map((exp, index) => (
              <div key={exp.level} className={`${index <= visibleLevel ? 'block' : 'hidden'}`}>
                <p className={`font-semibold text-sm ${
                    exp.level === 'Beginner' ? 'text-green-400' : exp.level === 'Intermediate' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {exp.level}
                </p>
                <p className="text-gray-300 text-sm">{exp.text}</p>
              </div>
            ))}
          </div>
          {visibleLevel < flashcard.explanations.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setVisibleLevel(prev => prev + 1);
              }}
              className="mt-4 w-full text-center bg-blue-600/50 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600/80 transition text-sm"
            >
              Show More Detail
            </button>
          )}
        </div>
      </div>
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default Flashcard;
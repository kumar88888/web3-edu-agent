import React, { useState, useEffect, useRef } from 'react';
import type { ScenarioData } from '../types';
import { ChevronLeft, ChevronRight } from './Icons';

declare const hljs: any;

interface ScenarioViewerProps {
  scenario: ScenarioData;
}

const ScenarioViewer: React.FC<ScenarioViewerProps> = ({ scenario }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const codeRef = useRef<HTMLElement>(null);
  const { title, steps } = scenario;
  // FIX: This is the single, correct declaration for 'step'.
  const step = steps[currentStep];

  useEffect(() => {
    if (step.code && codeRef.current && typeof hljs !== 'undefined') {
      hljs.highlightElement(codeRef.current);
    }
  }, [currentStep, step.code]);


  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const goToPrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-gray-400 mt-1">Step {currentStep + 1} of {steps.length}: {step.title}</p>
      </div>
      <div className="p-6 min-h-[20rem] flex flex-col justify-center">
        <p className="text-gray-300 leading-relaxed">{step.content}</p>
        {step.code && (
          <div className="mt-4">
            <pre className="bg-gray-900 p-4 rounded-md text-left w-full overflow-x-auto text-sm">
              <code ref={codeRef} className="language-javascript">{step.code}</code>
            </pre>
          </div>
        )}
      </div>
      <div className="bg-gray-700/50 p-4 flex justify-between items-center">
        <button
          onClick={goToPrevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2 bg-gray-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-500 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>
        <div className="text-sm text-gray-400">
            {currentStep + 1} / {steps.length}
        </div>
        <button
          onClick={goToNextStep}
          disabled={currentStep === steps.length - 1}
          className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ScenarioViewer;
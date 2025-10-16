
import React, { useState, useCallback } from 'react';
import { generateEducationalContent } from './services/geminiService';
import type { ProjectData, TabType } from './types';
import LoadingScreen from './components/LoadingScreen';
import Tabs from './components/Tabs';
import Carousel from './components/Carousel';
import Flashcard from './components/Flashcard';
import ScenarioViewer from './components/ScenarioViewer';
import { Logo, BookOpen, Layers3, Film, List, Sparkles } from './components/Icons';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('Ethereum Proof-of-Stake');
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabType>('Overview');

  const handleAnalyze = useCallback(async () => {
    const trimmedInput = inputValue.trim();

    if (trimmedInput.length === 0) {
      setError('Please enter a Web3 project or concept.');
      return;
    }
    if (trimmedInput.length < 3) {
      setError('Input is too short. Please provide at least 3 characters.');
      return;
    }
    if (trimmedInput.length > 100) {
      setError('Input is too long. Please keep it under 100 characters.');
      return;
    }

    setIsLoading(true);
    setError('');
    setProjectData(null);
    setActiveTab('Overview');

    const loadingMessages = [
      "Analyzing project scope...",
      "Simulating documentation crawl...",
      "Extracting core concepts...",
      "Synthesizing knowledge graph...",
      "Generating ELI5 explanations...",
      "Constructing learning modules...",
      "Finalizing educational materials..."
    ];

    let messageIndex = 0;
    const intervalId = setInterval(() => {
      setLoadingMessage(loadingMessages[messageIndex % loadingMessages.length]);
      messageIndex++;
    }, 1500);

    try {
      const data = await generateEducationalContent(trimmedInput);
      setProjectData(data);
    } catch (err) {
      console.error(err);
      setError('Failed to generate content. The model may be unavailable or the request was blocked. Please try again later.');
    } finally {
      clearInterval(intervalId);
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [inputValue]);

  const renderContent = () => {
    if (!projectData) return null;

    switch (activeTab) {
      case 'Overview':
        return (
          <div className="bg-gray-800 p-6 rounded-lg prose prose-invert max-w-none prose-p:text-gray-400 prose-headings:text-gray-200">
            <h2 className="flex items-center gap-2 text-2xl font-bold"><BookOpen /> Overview</h2>
            <p>{projectData.overview.summary}</p>
            <h3 className="text-xl font-semibold mt-4">Key Concepts</h3>
            <ul className="list-disc pl-5 space-y-2">
              {projectData.overview.keyConcepts.map((concept, index) => (
                <li key={index}>{concept}</li>
              ))}
            </ul>
          </div>
        );
      case 'Carousels':
        return (
          <div className="space-y-8">
             <h2 className="flex items-center gap-2 text-2xl font-bold"><Layers3 /> Interactive Carousels</h2>
            {projectData.carousels.map((carousel, index) => (
              <Carousel key={index} title={carousel.title} slides={carousel.slides} />
            ))}
          </div>
        );
      case 'Flashcards':
        return (
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold"><Sparkles /> Flashcards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {projectData.flashcards.map((flashcard, index) => (
                <Flashcard key={index} flashcard={flashcard} />
              ))}
            </div>
          </div>
        );
      case 'Scenarios':
        return (
          <div className="space-y-8">
             <h2 className="flex items-center gap-2 text-2xl font-bold"><Film /> Learning Scenarios</h2>
            {projectData.scenarios.map((scenario, index) => (
              <ScenarioViewer key={index} scenario={scenario} />
            ))}
          </div>
        );
      case 'Glossary':
        return (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="flex items-center gap-2 text-2xl font-bold"><List /> Glossary</h2>
            <div className="mt-4 space-y-4">
              {projectData.glossary.map((item, index) => (
                <div key={index} className="border-b border-gray-700 pb-2">
                  <h3 className="font-semibold text-lg text-blue-400">{item.term}</h3>
                  <p className="text-gray-400">{item.definition}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-4">
            <Logo className="w-12 h-12 text-blue-500" />
            <h1 className="text-4xl font-bold tracking-tight">Web3 Technical Education AI Agent</h1>
          </div>
          <p className="mt-2 text-lg text-gray-400">Simplifying complex blockchain concepts with AI-powered learning tools.</p>
        </header>

        {isLoading ? (
          <LoadingScreen message={loadingMessage} />
        ) : !projectData ? (
          <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-center">Enter a Web3 Project or Concept</h2>
            <p className="text-center text-gray-400 mb-6">e.g., "Solana", "Zero-Knowledge Proofs", "Uniswap v3"</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter a topic..."
                className="flex-grow bg-gray-700 border border-gray-600 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Analyze
              </button>
            </div>
            {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold">Learning Module: <span className="text-blue-400">{projectData.projectName}</span></h2>
                <button
                    onClick={() => setProjectData(null)}
                    className="bg-gray-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition duration-200"
                >
                    Analyze New Topic
                </button>
            </div>
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="mt-6">
              {renderContent()}
            </div>
          </div>
        )}
      </div>

       <footer className="text-center mt-8">
        <p className="text-gray-500">
          Built with ❤️ by{' '}
          <a
            href="https://x.com/kuswanth_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            kuswanth
          </a>
        </p>
       </footer>
    </div>
  );
};

export default App;

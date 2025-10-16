
import React from 'react';
import { Logo } from './Icons';

interface LoadingScreenProps {
  message: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-800/50 rounded-lg">
      <Logo className="w-16 h-16 text-blue-500 animate-pulse-slow" />
      <h2 className="text-2xl font-semibold mt-4">Generating Learning Module...</h2>
      <p className="text-gray-400 mt-2 text-lg min-h-[28px]">{message}</p>
      <div className="w-full max-w-md bg-gray-700 rounded-full h-2.5 mt-6 overflow-hidden">
        <div className="bg-blue-600 h-2.5 rounded-full animate-pulse" style={{ width: '100%', animation: 'indeterminate 1.5s infinite' }}></div>
      </div>
      <style>{`
        @keyframes indeterminate {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;

import React, { useState, useEffect, useRef } from 'react';
import type { CarouselData } from '../types';
import { ChevronLeft, ChevronRight } from './Icons';

declare const hljs: any;

const Carousel: React.FC<CarouselData> = ({ title, slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const codeRef = useRef<HTMLElement>(null);
  const currentSlide = slides[currentIndex];

  useEffect(() => {
    if (currentSlide.type === 'code' && codeRef.current && typeof hljs !== 'undefined') {
      hljs.highlightElement(codeRef.current);
    }
  }, [currentIndex, currentSlide]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <div className="relative h-96">
        <div className="absolute top-4 right-4 bg-gray-900/50 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {currentIndex + 1} / {slides.length}
        </div>
        
        <button onClick={goToPrevious} className="absolute top-1/2 left-4 -translate-y-1/2 z-10 p-2 bg-black/30 rounded-full hover:bg-black/50 transition focus:outline-none focus:ring-2 focus:ring-white">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button onClick={goToNext} className="absolute top-1/2 right-4 -translate-y-1/2 z-10 p-2 bg-black/30 rounded-full hover:bg-black/50 transition focus:outline-none focus:ring-2 focus:ring-white">
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
        
        <div className="w-full h-full p-6 flex flex-col justify-center items-center text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-2">{currentSlide.type}</span>
            <h4 className="text-2xl font-bold text-white mb-4">{currentSlide.title}</h4>
            {currentSlide.type === 'code' ? (
                <pre className="bg-gray-900 p-4 rounded-md text-left w-full overflow-x-auto text-sm">
                    <code ref={codeRef} className={`language-${currentSlide.codeLanguage || 'javascript'}`}>{currentSlide.content}</code>
                </pre>
            ) : (
                <p className="text-gray-300 max-w-prose">{currentSlide.content}</p>
            )}
        </div>
      </div>
       <div className="flex justify-center p-4 bg-gray-800/50">
          {slides.map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => setCurrentIndex(slideIndex)}
              className={`h-2 w-2 rounded-full mx-1 transition-colors duration-200 focus:outline-none ${currentIndex === slideIndex ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'}`}
              aria-label={`Go to slide ${slideIndex + 1}`}
            ></button>
          ))}
        </div>
    </div>
  );
};

export default Carousel;
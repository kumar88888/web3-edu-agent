
export interface ProjectData {
  projectName: string;
  overview: {
    summary: string;
    keyConcepts: string[];
  };
  carousels: CarouselData[];
  flashcards: FlashcardData[];
  scenarios: ScenarioData[];
  glossary: GlossaryItem[];
}

export interface CarouselData {
  title: string;
  slides: CarouselSlide[];
}

export interface CarouselSlide {
  type: 'definition' | 'analogy' | 'technical' | 'code' | 'usecase';
  title: string;
  content: string;
  diagram?: string;
  codeLanguage?: string;
}

export interface FlashcardData {
  term: string;
  icon: string;
  explanations: {
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    text: string;
  }[];
  codeExample?: string;
}

export interface ScenarioData {
  title: string;
  steps: {
    title: string;
    content: string;
    code?: string;
  }[];
}

export interface GlossaryItem {
  term: string;
  definition: string;
}

export type TabType = 'Overview' | 'Carousels' | 'Flashcards' | 'Scenarios' | 'Glossary';

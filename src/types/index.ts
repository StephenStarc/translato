export interface TranslationSegment {
  id: string;
  originalText: string;
  translatedText: string;
  position?: {
    x: number;
    y: number;
    width: number;
    height: number;
    pageNumber: number;
  };
  status: 'pending' | 'completed' | 'failed';
  service: 'google' | 'openai';
}

export interface TranslationState {
  segments: TranslationSegment[];
  currentFile: File | null;
  isTranslating: boolean;
  setSegments: (segments: TranslationSegment[]) => void;
  addSegment: (segment: TranslationSegment) => void;
  updateSegment: (id: string, updates: Partial<TranslationSegment>) => void;
  setCurrentFile: (file: File | null) => void;
  setIsTranslating: (status: boolean) => void;
}
import { create } from 'zustand';
import { TranslationState, TranslationSegment } from '../types';

export const useTranslationStore = create<TranslationState>((set) => ({
  segments: [],
  currentFile: null,
  isTranslating: false,
  
  setSegments: (segments) => set({ segments }),
  
  addSegment: (segment) => 
    set((state) => ({ segments: [...state.segments, segment] })),
    
  updateSegment: (id, updates) =>
    set((state) => ({
      segments: state.segments.map((segment) =>
        segment.id === id ? { ...segment, ...updates } : segment
      ),
    })),
    
  setCurrentFile: (file) => set({ currentFile: file }),
  
  setIsTranslating: (status) => set({ isTranslating: status }),
}));
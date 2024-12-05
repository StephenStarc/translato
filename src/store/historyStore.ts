import { create } from 'zustand';
import { TranslationSegment } from '../types';

interface HistoryState {
  past: TranslationSegment[][];
  future: TranslationSegment[][];
  canUndo: boolean;
  canRedo: boolean;
  pushState: (segments: TranslationSegment[]) => void;
  undo: () => TranslationSegment[] | undefined;
  redo: () => TranslationSegment[] | undefined;
  clear: () => void;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  past: [],
  future: [],
  canUndo: false,
  canRedo: false,

  pushState: (segments) => {
    set((state) => ({
      past: [...state.past, segments],
      future: [],
      canUndo: true,
      canRedo: false,
    }));
  },

  undo: () => {
    const { past, future } = get();
    if (past.length === 0) return;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    set((state) => ({
      past: newPast,
      future: [previous, ...state.future],
      canUndo: newPast.length > 0,
      canRedo: true,
    }));

    return newPast[newPast.length - 1];
  },

  redo: () => {
    const { future } = get();
    if (future.length === 0) return;

    const next = future[0];
    const newFuture = future.slice(1);

    set((state) => ({
      past: [...state.past, next],
      future: newFuture,
      canUndo: true,
      canRedo: newFuture.length > 0,
    }));

    return next;
  },

  clear: () => {
    set({
      past: [],
      future: [],
      canUndo: false,
      canRedo: false,
    });
  },
}));
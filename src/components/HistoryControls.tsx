import React from 'react';
import { Undo2, Redo2 } from 'lucide-react';
import { useHistoryStore } from '../store/historyStore';
import { useTranslationStore } from '../store/translationStore';
import toast from 'react-hot-toast';

export const HistoryControls: React.FC = () => {
  const { canUndo, canRedo, undo, redo } = useHistoryStore();
  const { setSegments } = useTranslationStore();

  const handleUndo = () => {
    const previousState = undo();
    if (previousState) {
      setSegments(previousState);
      toast.success('Undo successful');
    }
  };

  const handleRedo = () => {
    const nextState = redo();
    if (nextState) {
      setSegments(nextState);
      toast.success('Redo successful');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleUndo}
        disabled={!canUndo}
        className={`p-2 rounded-md ${
          canUndo
            ? 'text-gray-700 hover:bg-gray-100'
            : 'text-gray-400 cursor-not-allowed'
        }`}
        title="Undo (Ctrl+Z)"
      >
        <Undo2 className="h-5 w-5" />
      </button>
      <button
        onClick={handleRedo}
        disabled={!canRedo}
        className={`p-2 rounded-md ${
          canRedo
            ? 'text-gray-700 hover:bg-gray-100'
            : 'text-gray-400 cursor-not-allowed'
        }`}
        title="Redo (Ctrl+Y)"
      >
        <Redo2 className="h-5 w-5" />
      </button>
    </div>
  );
};
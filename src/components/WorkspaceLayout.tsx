import React from 'react';
import { PDFPreview } from './PDFPreview';
import { TranslationPanel } from './TranslationPanel';
import { useTranslationStore } from '../store/translationStore';

export const WorkspaceLayout: React.FC = () => {
  const currentFile = useTranslationStore((state) => state.currentFile);

  if (!currentFile) return null;

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="overflow-auto max-h-[calc(100vh-12rem)]">
        <PDFPreview />
      </div>
      <div className="overflow-auto max-h-[calc(100vh-12rem)] bg-white rounded-lg shadow">
        <TranslationPanel />
      </div>
    </div>
  );
};
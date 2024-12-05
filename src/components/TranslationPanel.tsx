import React from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { useTranslationStore } from '../store/translationStore';
import { useTranslation } from '../hooks/useTranslation';
import { LanguageSelector } from './LanguageSelector';
import { ServiceSelector } from './ServiceSelector';
import { HistoryControls } from './HistoryControls';
import { Toaster } from 'react-hot-toast';

export const TranslationPanel: React.FC = () => {
  const { segments, isTranslating } = useTranslationStore();
  const {
    targetLanguage,
    setTargetLanguage,
    translationService,
    setTranslationService,
    translateSegment,
    translateAll
  } = useTranslation();

  if (isTranslating) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="ml-3 text-gray-600">Translating document...</p>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold">Translations</h2>
            <HistoryControls />
          </div>
          <div className="flex items-center space-x-4">
            <ServiceSelector
              value={translationService}
              onChange={setTranslationService}
            />
            <LanguageSelector
              value={targetLanguage}
              onChange={setTargetLanguage}
            />
            <button
              onClick={() => translateAll()}
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Translate All
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {segments.map((segment) => (
            <div key={segment.id} className="border rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-2">Original Text:</div>
              <p className="mb-4">{segment.originalText}</p>
              
              <div className="text-sm text-gray-500 mb-2">Translation:</div>
              <div className="relative">
                <textarea
                  value={segment.translatedText}
                  onChange={(e) => {
                    useTranslationStore.getState().updateSegment(segment.id, {
                      translatedText: e.target.value
                    });
                  }}
                  className="w-full p-2 border rounded-md pr-10"
                  rows={3}
                />
                <button
                  onClick={() => translateSegment(segment.id)}
                  className="absolute right-2 top-2 p-1 text-gray-400 hover:text-blue-500"
                  title="Retranslate"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
              
              <div className="mt-2 flex justify-between items-center">
                <span className={`text-sm ${
                  segment.status === 'completed' ? 'text-green-500' :
                  segment.status === 'failed' ? 'text-red-500' :
                  'text-yellow-500'
                }`}>
                  Status: {segment.status}
                </span>
                <span className="text-sm text-gray-500">
                  Service: {segment.service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
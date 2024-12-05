import { useState, useCallback, useEffect } from 'react';
import { useTranslationStore } from '../store/translationStore';
import { useHistoryStore } from '../store/historyStore';
import { translateText } from '../services/translationService';
import { extractTextFromPDF } from '../services/pdfService';
import toast from 'react-hot-toast';

const AUTO_SAVE_INTERVAL = 20000; // 20 seconds

export function useTranslation() {
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [translationService, setTranslationService] = useState<'google' | 'openai'>('google');
  const { 
    segments,
    addSegment,
    updateSegment,
    setCurrentFile,
    setIsTranslating,
    setSegments
  } = useTranslationStore();
  const { pushState } = useHistoryStore();

  // Save to history when segments change
  useEffect(() => {
    if (segments.length > 0) {
      pushState([...segments]);
    }
  }, [segments, pushState]);

  // Auto-save functionality
  useEffect(() => {
    const saveTranslations = async () => {
      try {
        const response = await fetch('/api/save-translations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ segments }),
        });

        if (!response.ok) throw new Error('Failed to save translations');
        
        toast.success('Translations saved automatically');
      } catch (error) {
        console.error('Auto-save error:', error);
        toast.error('Failed to auto-save translations');
      }
    };

    const intervalId = setInterval(saveTranslations, AUTO_SAVE_INTERVAL);
    return () => clearInterval(intervalId);
  }, [segments]);

  const handleFileUpload = useCallback(async (file: File) => {
    try {
      setCurrentFile(file);
      setIsTranslating(true);
      
      const extractedSegments = await extractTextFromPDF(file);
      setSegments(extractedSegments);
      pushState(extractedSegments);
      
      toast.success('PDF text extracted successfully');
      setIsTranslating(false);
    } catch (error) {
      console.error('File upload error:', error);
      toast.error('Failed to extract text from PDF');
      setIsTranslating(false);
    }
  }, [setCurrentFile, setIsTranslating, setSegments, pushState]);

  const translateSegment = useCallback(async (
    segmentId: string,
    service: 'google' | 'openai' = translationService
  ) => {
    const segment = segments.find(s => s.id === segmentId);
    if (!segment) return;

    const toastId = toast.loading('Translating...');

    try {
      updateSegment(segmentId, { status: 'pending' });
      
      const result = await translateText({
        text: segment.originalText,
        targetLanguage,
        service,
      });

      updateSegment(segmentId, {
        translatedText: result.translatedText,
        status: result.status,
        service,
      });

      toast.success('Translation completed', { id: toastId });
    } catch (error) {
      console.error('Translation error:', error);
      updateSegment(segmentId, { status: 'failed' });
      toast.error('Translation failed', { id: toastId });
    }
  }, [segments, updateSegment, targetLanguage, translationService]);

  const translateAll = useCallback(async (service: 'google' | 'openai' = translationService) => {
    setIsTranslating(true);
    const toastId = toast.loading('Translating all segments...');
    
    try {
      await Promise.all(
        segments.map(segment => translateSegment(segment.id, service))
      );
      toast.success('All translations completed', { id: toastId });
    } catch (error) {
      toast.error('Some translations failed', { id: toastId });
    } finally {
      setIsTranslating(false);
    }
  }, [segments, translateSegment, setIsTranslating, translationService]);

  return {
    targetLanguage,
    setTargetLanguage,
    translationService,
    setTranslationService,
    handleFileUpload,
    translateSegment,
    translateAll,
  };
}
import { TranslationSegment } from '../types';

interface TranslationRequest {
  text: string;
  sourceLanguage?: string;
  targetLanguage: string;
  service: 'google' | 'openai';
}

interface TranslationResponse {
  translatedText: string;
  service: 'google' | 'openai';
  status: 'completed' | 'failed';
}

export async function translateText({
  text,
  sourceLanguage = 'auto',
  targetLanguage,
  service
}: TranslationRequest): Promise<TranslationResponse> {
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        sourceLanguage,
        targetLanguage,
        service,
      }),
    });

    if (!response.ok) {
      throw new Error('Translation failed');
    }

    const data = await response.json();
    return {
      translatedText: data.translatedText,
      service,
      status: 'completed',
    };
  } catch (error) {
    console.error('Translation error:', error);
    return {
      translatedText: '',
      service,
      status: 'failed',
    };
  }
}
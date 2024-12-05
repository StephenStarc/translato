import { TranslationSegment } from '../types';

export async function extractTextFromPDF(file: File): Promise<TranslationSegment[]> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/extract-text', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to extract text from PDF');
    }

    const data = await response.json();
    return data.segments.map((segment: any, index: number) => ({
      id: `segment-${index}`,
      originalText: segment.text,
      translatedText: '',
      position: segment.position,
      status: 'pending',
      service: 'google',
    }));
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw error;
  }
}
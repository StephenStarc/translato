import React from 'react';
import { TranslationSegment } from '../types';

interface TranslationOverlayProps {
  segments: TranslationSegment[];
  scale: number;
}

export const TranslationOverlay: React.FC<TranslationOverlayProps> = ({ segments, scale }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {segments.map((segment) => {
        if (!segment.position) return null;

        const style = {
          position: 'absolute' as const,
          left: `${segment.position.x * scale}px`,
          top: `${segment.position.y * scale}px`,
          width: `${segment.position.width * scale}px`,
          minHeight: `${segment.position.height * scale}px`,
        };

        return (
          <div
            key={segment.id}
            style={style}
            className={`
              pointer-events-auto
              group
              hover:bg-blue-50/80
              transition-colors
              duration-200
              rounded
              p-1
              ${segment.status === 'completed' ? 'border border-green-200' : ''}
            `}
          >
            <div className="opacity-0 group-hover:opacity-100 bg-white shadow-lg rounded-lg p-2 mt-1 text-sm">
              {segment.translatedText || 'Translation pending...'}
            </div>
          </div>
        );
      })}
    </div>
  );
};
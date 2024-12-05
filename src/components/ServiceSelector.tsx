import React from 'react';
import { Sparkles, Globe2 } from 'lucide-react';

interface ServiceSelectorProps {
  value: 'google' | 'openai';
  onChange: (service: 'google' | 'openai') => void;
}

export const ServiceSelector: React.FC<ServiceSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onChange('google')}
        className={`inline-flex items-center px-3 py-1.5 rounded-md ${
          value === 'google'
            ? 'bg-blue-100 text-blue-700'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Globe2 className="h-4 w-4 mr-1" />
        Google
      </button>
      <button
        onClick={() => onChange('openai')}
        className={`inline-flex items-center px-3 py-1.5 rounded-md ${
          value === 'openai'
            ? 'bg-purple-100 text-purple-700'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Sparkles className="h-4 w-4 mr-1" />
        OpenAI
      </button>
    </div>
  );
};
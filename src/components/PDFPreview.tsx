import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { TranslationOverlay } from './TranslationOverlay';
import { useTranslationStore } from '../store/translationStore';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const PDFPreview: React.FC = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [showTranslations, setShowTranslations] = useState<boolean>(true);
  const { currentFile, segments } = useTranslationStore();

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => Math.min(Math.max(1, prevPageNumber + offset), numPages));
  };

  const adjustZoom = (delta: number) => {
    setScale(prevScale => Math.min(Math.max(0.5, prevScale + delta), 2.0));
  };

  if (!currentFile) return null;

  return (
    <div className="relative">
      <div className="sticky top-0 z-10 bg-white border-b flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => changePage(-1)}
            disabled={pageNumber <= 1}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm">
            Page {pageNumber} of {numPages}
          </span>
          <button
            onClick={() => changePage(1)}
            disabled={pageNumber >= numPages}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => adjustZoom(-0.1)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <span className="text-sm">{Math.round(scale * 100)}%</span>
          <button
            onClick={() => adjustZoom(0.1)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          <button
            onClick={() => setShowTranslations(!showTranslations)}
            className={`px-3 py-1.5 rounded-md ${
              showTranslations ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {showTranslations ? 'Hide Translations' : 'Show Translations'}
          </button>
        </div>
      </div>

      <div className="relative">
        <Document
          file={currentFile}
          onLoadSuccess={onDocumentLoadSuccess}
          className="max-w-full"
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            className="shadow-lg rounded-lg"
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
          {showTranslations && (
            <TranslationOverlay
              segments={segments.filter(s => s.position?.pageNumber === pageNumber)}
              scale={scale}
            />
          )}
        </Document>
      </div>
    </div>
  );
};
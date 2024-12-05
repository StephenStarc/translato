import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslationStore } from '../store/translationStore';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const PDFViewer: React.FC = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const currentFile = useTranslationStore((state) => state.currentFile);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => Math.min(Math.max(1, prevPageNumber + offset), numPages));
  };

  if (!currentFile) return null;

  return (
    <div className="flex flex-col items-center">
      <Document
        file={currentFile}
        onLoadSuccess={onDocumentLoadSuccess}
        className="max-w-full"
      >
        <Page 
          pageNumber={pageNumber}
          className="shadow-lg rounded-lg"
          renderTextLayer={true}
          renderAnnotationLayer={true}
        />
      </Document>
      
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={() => changePage(-1)}
          disabled={pageNumber <= 1}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <p className="text-sm">
          Page {pageNumber} of {numPages}
        </p>
        
        <button
          onClick={() => changePage(1)}
          disabled={pageNumber >= numPages}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};
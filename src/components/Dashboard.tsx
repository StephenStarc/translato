import React from 'react';
import { Link } from 'react-router-dom';
import { FileUpload } from './FileUpload';
import { useUser } from '@clerk/clerk-react';

export const Dashboard: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome back, {user?.firstName || 'User'}!
        </h2>
        <p className="text-gray-600 mb-6">
          Start translating your documents by uploading a PDF file.
        </p>
        <FileUpload />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Translations</h3>
        <div className="text-gray-600">
          Your recent translations will appear here.
        </div>
      </div>
    </div>
  );
};
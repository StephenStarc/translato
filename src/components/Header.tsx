import React from 'react';
import { Link } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Languages } from 'lucide-react';

export const Header: React.FC = () => {
  const { isSignedIn } = useUser();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Languages className="h-8 w-8 text-blue-500" />
          <h1 className="ml-3 text-2xl font-bold text-gray-900">Translato</h1>
        </Link>
        
        {isSignedIn && (
          <div className="flex items-center space-x-4">
            <Link
              to="/workspace"
              className="text-gray-600 hover:text-gray-900"
            >
              Workspace
            </Link>
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        )}
      </div>
    </header>
  );
};
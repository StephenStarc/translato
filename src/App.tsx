import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { Languages } from 'lucide-react';
import { WorkspaceLayout } from './components/WorkspaceLayout';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <Routes>
            <Route
              path="/sign-in/*"
              element={<SignIn routing="path" path="/sign-in" />}
            />
            <Route
              path="/sign-up/*"
              element={<SignUp routing="path" path="/sign-up" />}
            />
            <Route
              path="/workspace"
              element={
                isSignedIn ? (
                  <WorkspaceLayout />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
            <Route
              path="/"
              element={
                isSignedIn ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
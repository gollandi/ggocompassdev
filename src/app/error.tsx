'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">Oops!</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600">
            We apologise for the inconvenience. Please try again.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => reset()}
            className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try again
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className="w-full px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
          >
            Return to home
          </button>
        </div>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <p className="text-sm font-mono text-red-800 break-all">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

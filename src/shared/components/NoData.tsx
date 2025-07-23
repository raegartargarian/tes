// src/components/NoDataAvailable.tsx
import { RefreshCcw } from "lucide-react";
import React from "react";

interface NoDataAvailableProps {
  message?: string;
  onReload?: () => void;
}

const NoDataAvailable: React.FC<NoDataAvailableProps> = ({
  message = "No data is available yet",
  onReload = () => window.location.reload(),
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-primary-dark bg-opacity-30 p-8 rounded-lg text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h2 className="text-2xl font-medium text-white">{message}</h2>
          <p className="text-gray-400 max-w-md">
            The requested property data is not available or is getting
            populated. Please try again later or reload the page.
          </p>
          <button
            onClick={onReload}
            className="mt-4 flex items-center bg-primary-green text-primary-dark px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoDataAvailable;

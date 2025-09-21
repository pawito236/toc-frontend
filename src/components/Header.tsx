import React from 'react';
import { Film, Home, ArrowLeft } from 'lucide-react';
import { SearchBar } from './SearchBar';

interface HeaderProps {
  onHomeClick: () => void;
  onSearchResultClick: (animeId: number) => void;
  onBackClick?: () => void;
  showBackButton?: boolean;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  onHomeClick, 
  onSearchResultClick, 
  onBackClick,
  showBackButton = false,
  title = "Anime Explorer"
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {showBackButton && onBackClick ? (
              <button
                onClick={onBackClick}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            ) : (
              <button
                onClick={onHomeClick}
                className="flex items-center gap-3 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Film className="w-8 h-8" />
                <span className="text-xl font-bold">{title}</span>
              </button>
            )}
          </div>

          <div className="flex-1 max-w-md mx-8">
            <SearchBar 
              onResultClick={onSearchResultClick}
              className="w-full"
            />
          </div>

          <button
            onClick={onHomeClick}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="hidden sm:inline">Home</span>
          </button>
        </div>
      </div>
    </header>
  );
};
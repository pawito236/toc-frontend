import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { animeService } from '../services/animeService';
import { SearchResult } from '../types/anime';

interface SearchBarProps {
  onResultClick: (animeId: number) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onResultClick, className = '' }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const searchAnime = async () => {
      if (query.length < 2) {
        setResults([]);
        setShowResults(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await animeService.searchAnime(query);
        const searchResults = response.categories[0]?.items || [];
        setResults(searchResults);
        setShowResults(true);
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(searchAnime, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleResultClick = (animeId: number) => {
    setQuery('');
    setShowResults(false);
    onResultClick(animeId);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search anime..."
          className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              Searching...
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No results found for "{query}"
            </div>
          ) : (
            <div className="py-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result.id)}
                  className="w-full p-3 hover:bg-gray-50 transition-colors text-left flex items-center gap-3"
                >
                  <img
                    src={result.image_url}
                    alt={result.name}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">
                      {result.name}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <span>{result.payload.media_type}</span>
                      {result.payload.start_year && <span>• {result.payload.start_year}</span>}
                      {result.payload.score && result.payload.score !== 'N/A' && (
                        <span className="flex items-center gap-1">
                          • <span className="text-yellow-500">★</span> {result.payload.score}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {result.payload.status}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
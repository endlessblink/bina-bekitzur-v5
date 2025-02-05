import { useState, useCallback, useEffect } from 'react';
import { searchModels } from '@/lib/utils/models';
import { AIModel } from '@/lib/types/models';
import { useDebounce } from '@/lib/hooks/useDebounce';

interface ModelSearchProps {
  onResultsChange: (models: AIModel[]) => void;
}

export function ModelSearch({ onResultsChange }: ModelSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleSearch = useCallback(() => {
    const results = searchModels(debouncedSearchTerm);
    onResultsChange(results);
  }, [debouncedSearchTerm, onResultsChange]);

  useEffect(() => {
    handleSearch();
  }, [debouncedSearchTerm, handleSearch]);

  return (
    <div className="relative">
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="חיפוש מודלים..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
} 
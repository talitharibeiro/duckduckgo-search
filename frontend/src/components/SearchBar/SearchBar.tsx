import React from "react";

interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
  onSearch: () => void;
  clearResults: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  setQuery,
  onSearch,
  clearResults,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim()) {
        onSearch();
      }
    }
  };

  const clearQuery = () => {
    setQuery("");
    clearResults();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter search term..."
            className="border rounded-md p-2 w-full pr-10"
            aria-label="Search input"
          />
          {query && (
            <button
              type="button"
              onClick={clearQuery}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 transition duration-200"
              aria-label="Clear search input"
            >
              ✖
            </button>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          aria-label="Submit search"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

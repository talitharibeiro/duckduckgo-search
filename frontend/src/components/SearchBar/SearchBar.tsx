import React from "react";

interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
  onSearch: () => void;
  clearResults: () => void; // Nova função para limpar resultados
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
      onSearch();
    }
  };

  const clearQuery = () => {
    setQuery(""); // Limpa o campo de busca
    clearResults(); // Limpa os resultados
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-4">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter search term..."
          className="border rounded-md p-2 w-full pr-10"
        />
        {query && (
          <button
            type="button"
            onClick={clearQuery}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        )}
      </div>
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;

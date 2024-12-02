import React from "react";
import SearchResults from "../../components/SearchResults/SearchResults";
import { useHome } from "./hooks/useHome";
import SearchBar from "../../components/SearchBar/SearchInput";

const Home: React.FC = () => {
  const {
    query,
    setQuery,
    handleSearch,
    history,
    results,
    totalPages,
    currentPage,
    handleHistoryClick,
  } = useHome();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">DuckDuckGo Search</h1>

      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={() => handleSearch(1)}
      />

      <SearchResults
        results={results}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handleSearch}
        searchTerm={query}
      />

      {/* Search History */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Search History:</h2>
        <ul>
          {history.map((item, index) => (
            <li
              key={index}
              className="my-2 cursor-pointer text-blue-500 underline"
              onClick={() => handleHistoryClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;

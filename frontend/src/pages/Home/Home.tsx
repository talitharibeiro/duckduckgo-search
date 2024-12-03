import React from "react";
import { useHome } from "./hooks/useHome";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchResults from "../../components/SearchResults/SearchResults";
import HistorySidebar from "../../components/HistorySideBar/HistorySideBar";

const Home: React.FC = () => {
  const {
    query,
    setQuery,
    handleSearch,
    history,
    results,
    totalPages,
    currentPage,
    setHistory,
    setResults,
    handleHistoryClick,
    clearHistory,
  } = useHome();

  return (
    <div className="container mx-auto p-4 gap-4">
      <h1 className="mt-12 text-3xl font-bold mb-8 text-center">
        DuckDuckGo Search
      </h1>

      <div className="flex items-start gap-6">
        {/* History Sidebar */}
        <div className="col-span-1">
          <HistorySidebar
            onClearHistory={clearHistory}
            history={history}
            onItemClick={handleHistoryClick}
          />
        </div>

        <div className="flex flex-col flex-1">
          {/* Search Bar */}
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={() => handleSearch(1)}
            clearResults={() => setResults([])}
          />

          {/* Search Results */}
          <SearchResults
            results={results}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handleSearch}
            searchTerm={query}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

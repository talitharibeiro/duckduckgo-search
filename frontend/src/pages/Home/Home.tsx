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
    setResults,
    handleHistoryClick,
  } = useHome();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">DuckDuckGo Search</h1>

      {/* Search Bar */}
      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={() => handleSearch(1)}
        clearResults={() => setResults([])} // Limpa os resultados
      />

      {/* Search Results */}
      <SearchResults
        results={results}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handleSearch}
        searchTerm={query}
      />

      {/* Search History Sidebar */}
      <HistorySidebar history={history} onItemClick={handleHistoryClick} />
    </div>
  );
};

export default Home;

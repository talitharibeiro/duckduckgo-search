import { useEffect, useState } from "react";
import { ISearchResults } from "../../../interfaces/ISearchResults";
import { clearHistoryApi, getHistory, searchApi } from "../../../services/api";

interface IUseHome {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  results: ISearchResults[];
  setResults: React.Dispatch<React.SetStateAction<ISearchResults[]>>;
  history: Array<string>;
  setHistory: React.Dispatch<React.SetStateAction<Array<string>>>;
  handleSearch: (page?: number) => Promise<void>;
  currentPage: number;
  totalPages: number;
  handleHistoryClick: (item: string) => Promise<void>;
  resultsPerPage: number;
  clearHistory: () => Promise<void>;
}

const RESULTS_PER_PAGE = 5;

export const useHome = (): IUseHome => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<ISearchResults[]>([]);
  const [history, setHistory] = useState<Array<string>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = async (
    page: number = 1,
    searchQuery: string = query
  ) => {
    try {
      const offset = (page - 1) * RESULTS_PER_PAGE;
      const data = await searchApi(searchQuery, offset, RESULTS_PER_PAGE);

      setResults(data.results);
      setTotalPages(Math.ceil(data.totalResults / RESULTS_PER_PAGE));
      setCurrentPage(page);

      // Update history
      const updatedHistory = await getHistory();
      setHistory(updatedHistory);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const handleHistoryClick = async (item: string) => {
    setQuery(item);
    await handleSearch(1, item);
  };

  const clearHistory = async () => {
    try {
      await clearHistoryApi();
      setHistory([]);
    } catch (error) {
      console.error("Error clearing history:", error);
    }
  };

  const fetchHistory = async () => {
    try {
      const historyData = await getHistory();
      setHistory(historyData);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return {
    query,
    setQuery,
    history,
    setHistory,
    results,
    setResults,
    handleSearch,
    currentPage,
    totalPages,
    handleHistoryClick,
    resultsPerPage: RESULTS_PER_PAGE,
    clearHistory,
  };
};

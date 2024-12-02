import { useEffect, useState } from "react";
import { getHistory, searchApi } from "../../../services/api";
import { ISearchResults } from "../../../interfaces/ISearchResults";

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
}
export const useHome = (): IUseHome => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<ISearchResults[]>([]);
  const [history, setHistory] = useState<Array<string>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const resultsPerPage = 5;

  const handleSearch = async (
    page: number = 1,
    searchQuery: string = query
  ) => {
    if (!searchQuery.trim()) {
      alert("Please enter a search term!");
      return;
    }

    const offset = (page - 1) * resultsPerPage;
    const data = await searchApi(searchQuery, offset, resultsPerPage);

    setResults(data.results);
    setTotalPages(Math.ceil(data.totalResults / resultsPerPage));
    setCurrentPage(page);
  };

  const handleHistoryClick = async (item: string) => {
    setQuery(item);
    await handleSearch(1, item); // Reset to first page when clicking history
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const historyData = await getHistory();
      setHistory(historyData);
    };
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
    resultsPerPage,
  };
};

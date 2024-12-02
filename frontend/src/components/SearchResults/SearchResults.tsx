import React from "react";
import { ISearchResults } from "../../interfaces/ISearchResults";

interface SearchResultsProps {
  results: ISearchResults[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  searchTerm: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  currentPage,
  totalPages,
  onPageChange,
  searchTerm,
}) => {
  // Filter valid results
  const validResults = results.filter((result) => result.url);

  // Highlight search term in text
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;

    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Search Results:</h2>
      {validResults.length === 0 ? (
        <p className="text-gray-600">No results found.</p>
      ) : (
        <ul className="mt-2">
          {validResults.map((result, index) => (
            <li key={result.url || index} className="my-2">
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-700"
                aria-label={`Link to ${result.title || "untitled"}`}
              >
                {highlightText(result.title || "Untitled", searchTerm)}
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination Controls */}
      {validResults.length > 0 && (
        <div className="mt-4 flex justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={`page-${index + 1}`}
              onClick={() => onPageChange(index + 1)}
              className={`mx-1 px-3 py-1 border rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              } transition duration-200`}
              aria-label={`Go to page ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;

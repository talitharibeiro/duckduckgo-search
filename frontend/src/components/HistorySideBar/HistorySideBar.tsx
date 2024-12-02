import React from "react";

interface HistorySidebarProps {
  history: Array<string>;
  onItemClick: (item: string) => void;
  onClearHistory: () => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({
  history,
  onItemClick,
  onClearHistory,
}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Search History</h2>
      </div>
      <ul className="space-y-2">
        {history.length > 0 ? (
          history.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="cursor-pointer text-blue-500 underline hover:text-blue-700"
              onClick={() => onItemClick(item)}
              aria-label={`Search history item: ${item}`}
            >
              {item}
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No search history yet.</p>
        )}
      </ul>
      {history.length > 0 && (
        <button
          onClick={onClearHistory}
          className="mt-4 text-sm border border-blue-500 text-blue-500 px-3 py-1 rounded-md hover:bg-blue-500 hover:text-white transition duration-200"
          aria-label="Clear search history"
        >
          Clear history
        </button>
      )}
    </div>
  );
};

export default HistorySidebar;

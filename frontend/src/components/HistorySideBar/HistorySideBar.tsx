import React from "react";

interface HistorySidebarProps {
  history: Array<string>;
  onItemClick: (item: string) => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({
  history,
  onItemClick,
}) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold">Search History:</h2>
      <ul>
        {history.map((item, index) => (
          <li
            key={index}
            className="my-2 cursor-pointer text-blue-500 underline"
            onClick={() => onItemClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistorySidebar;

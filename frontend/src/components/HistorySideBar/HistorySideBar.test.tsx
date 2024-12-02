import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HistorySidebar from "./HistorySideBar";

describe("HistorySidebar", () => {
  const mockOnItemClick = jest.fn();
  const mockOnClearHistory = jest.fn();

  it("should display the empty history message when history is empty", () => {
    render(
      <HistorySidebar
        history={[]}
        onItemClick={mockOnItemClick}
        onClearHistory={mockOnClearHistory}
      />
    );

    expect(screen.getByText("No search history yet.")).toBeInTheDocument();
    expect(screen.queryByText("Clear history")).not.toBeInTheDocument();
  });

  it("should display the history items", () => {
    const history = ["Search 1", "Search 2"];
    render(
      <HistorySidebar
        history={history}
        onItemClick={mockOnItemClick}
        onClearHistory={mockOnClearHistory}
      />
    );

    history.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("should call onItemClick when a history item is clicked", () => {
    const history = ["Search 1"];
    render(
      <HistorySidebar
        history={history}
        onItemClick={mockOnItemClick}
        onClearHistory={mockOnClearHistory}
      />
    );

    fireEvent.click(screen.getByText("Search 1"));
    expect(mockOnItemClick).toHaveBeenCalledWith("Search 1");
  });

  it("should call onClearHistory when the clear button is clicked", () => {
    const history = ["Search 1"];
    render(
      <HistorySidebar
        history={history}
        onItemClick={mockOnItemClick}
        onClearHistory={mockOnClearHistory}
      />
    );

    fireEvent.click(screen.getByText("Clear history"));
    expect(mockOnClearHistory).toHaveBeenCalled();
  });
});

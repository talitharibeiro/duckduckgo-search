import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchResults from "./SearchResults";

describe("SearchResults", () => {
  const mockOnPageChange = jest.fn();

  const mockResults = [
    { title: "Result 1", url: "http://example.com/1" },
    { title: "Result 2", url: "http://example.com/2" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render a message when there are no results", () => {
    render(
      <SearchResults
        results={[]}
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
        searchTerm=""
      />
    );

    expect(screen.getByText("No results found.")).toBeInTheDocument();
  });

  it("should render the list of results", () => {
    render(
      <SearchResults
        results={mockResults}
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
        searchTerm=""
      />
    );

    mockResults.forEach((result) => {
      expect(screen.getByText(result.title)).toBeInTheDocument();
      expect(screen.getByText(result.title).closest("a")).toHaveAttribute(
        "href",
        result.url
      );
    });
  });

  it("should call onPageChange when a pagination button is clicked", () => {
    render(
      <SearchResults
        results={mockResults}
        currentPage={1}
        totalPages={2}
        onPageChange={mockOnPageChange}
        searchTerm=""
      />
    );

    fireEvent.click(screen.getByText("2"));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });
});

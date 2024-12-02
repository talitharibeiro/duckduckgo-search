import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  const mockSetQuery = jest.fn();
  const mockOnSearch = jest.fn();
  const mockClearResults = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the input and buttons", () => {
    render(
      <SearchBar
        query=""
        setQuery={mockSetQuery}
        onSearch={mockOnSearch}
        clearResults={mockClearResults}
      />
    );

    expect(
      screen.getByPlaceholderText("Enter search term...")
    ).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("should call setQuery when typing in the input", () => {
    render(
      <SearchBar
        query=""
        setQuery={mockSetQuery}
        onSearch={mockOnSearch}
        clearResults={mockClearResults}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Enter search term..."), {
      target: { value: "test" },
    });

    expect(mockSetQuery).toHaveBeenCalledWith("test");
  });

  it("should call onSearch when pressing Enter", () => {
    render(
      <SearchBar
        query="test"
        setQuery={mockSetQuery}
        onSearch={mockOnSearch}
        clearResults={mockClearResults}
      />
    );

    fireEvent.keyDown(screen.getByPlaceholderText("Enter search term..."), {
      key: "Enter",
    });

    expect(mockOnSearch).toHaveBeenCalled();
  });

  it("should clear the query and results when clicking the clear button", () => {
    render(
      <SearchBar
        query="test"
        setQuery={mockSetQuery}
        onSearch={mockOnSearch}
        clearResults={mockClearResults}
      />
    );

    fireEvent.click(screen.getByLabelText("Clear search input"));

    expect(mockSetQuery).toHaveBeenCalledWith("");
    expect(mockClearResults).toHaveBeenCalled();
  });

  it("should prevent empty search on Enter", () => {
    render(
      <SearchBar
        query="  "
        setQuery={mockSetQuery}
        onSearch={mockOnSearch}
        clearResults={mockClearResults}
      />
    );

    fireEvent.keyDown(screen.getByPlaceholderText("Enter search term..."), {
      key: "Enter",
    });

    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});

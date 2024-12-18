import React, { useState } from "react";
import { SearchInput } from "../SearchInput/SearchInput";
import { SearchResults } from "../SearchResults/SearchResults";
import { Pagination } from "../Pagination/Pagination";
import { fakeDB } from "../../utils/fakeDB";

import "./SearchContainer.css";

const RESULTS_PER_PAGE = 10;
const MIN_DISPLAYABLE_TIME = 0.01;

export const SearchContainer = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    { title: string; description: string; id: number }[]
  >([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTime, setSearchTime] = useState(0); // For tracking search timing

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);

    const startTime = performance.now();
    const filteredResults = fakeDB.filter((item) =>
      item.title.toLowerCase().includes(newQuery.toLowerCase())
    );
    const endTime = performance.now();

    const timeTaken = endTime - startTime;
    setSearchTime(timeTaken);
    setResults(filteredResults);
    setTotalResults(filteredResults.length);
    setTotalPages(Math.ceil(filteredResults.length / RESULTS_PER_PAGE));
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedResults = results.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  return (
    <div className="search-container">
      <h1>Search X</h1>
      <SearchInput onSearch={handleSearch} />
      {query && (
        <div>
          {totalResults > 0 ? (
            <>
              <p>
                Found {totalResults} results for "<strong>{query}</strong>" in{" "}
                <strong>
                  {searchTime < MIN_DISPLAYABLE_TIME
                    ? "<0.01"
                    : searchTime.toFixed(2)}{" "}
                  ms
                </strong>
                .
              </p>
              <SearchResults results={paginatedResults} />
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                />
              )}
            </>
          ) : (
            <p>
              No results found for "<strong>{query}</strong>".
            </p>
          )}
        </div>
      )}
    </div>
  );
};

import { useState, useEffect } from "react";
import { fakeDB } from "../utils/fakeDB";

const ITEMS_PER_PAGE = 5;

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    Array<{ title: string; description: string; id: number }>
  >([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (query.trim()) {
      const filtered = fakeDB.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setCurrentPage(1);
    } else {
      setResults([]);
    }
  }, [query]);

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const paginatedResults = results.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = (newQuery: string) => setQuery(newQuery);
  const goToPage = (page: number) => setCurrentPage(page);

  return {
    query,
    results: paginatedResults,
    totalResults: results.length,
    currentPage,
    totalPages,
    handleSearch,
    goToPage,
  };
};

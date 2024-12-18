import React from "react";

import "./SearchResults.css";

interface SearchResultsProps {
  results: { title: string; description: string; id: number }[];
}
export const SearchResults = ({ results }: SearchResultsProps) => {
  return (
    <ul className="search-results">
      {results.map((item) => (
        <li key={item.id}>
          <a href={`#${item.title}`} aria-label={`Result: ${item.title}`}>
            {item.title}
          </a>
          <p>{item.description}</p>
        </li>
      ))}
    </ul>
  );
};

import React, { useEffect, useState } from "react";
import { fakeDB } from "../../utils/fakeDB";
import { useSearchContext } from "../../context/SearchContext";
import { AutoCompleteList } from "../AutoCompleteList/AutoCompleteList";

import "./SearchInput.css";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const MAX_SUGGESTIONS = 10;

export const SearchInput = ({ onSearch }: SearchInputProps) => {
  const { addToHistory } = useSearchContext();
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (input.trim()) {
      const filtered = fakeDB
        .filter((item) =>
          item.title.toLowerCase().startsWith(input.toLowerCase())
        )
        .slice(0, MAX_SUGGESTIONS)
        .map((item) => item.title);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [input]);

  const handleSelect = (item: string) => {
    setInput(item);
    addToHistory(item);
    onSearch(item);
    setShowSuggestions(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setShowSuggestions(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      addToHistory(input);
      onSearch(input);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="search-input-wrapper">
      <input
        className="search-input"
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setShowSuggestions(false)}
        placeholder="Search..."
        autoFocus
        aria-label="Search input"
        aria-controls="autocomplete-list"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="autocomplete-container">
          <AutoCompleteList suggestions={suggestions} onSelect={handleSelect} />
        </div>
      )}
    </div>
  );
};

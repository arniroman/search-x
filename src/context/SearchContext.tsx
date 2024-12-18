import React, { createContext, useContext, useState } from "react";

interface SearchContextType {
  searchHistory: string[];
  addToHistory: (item: string) => void;
  removeFromHistory: (item: string) => void;
}

const defaultValue: SearchContextType = {
  searchHistory: [],
  addToHistory: () => {},
  removeFromHistory: () => {},
};

const SearchContext = createContext<SearchContextType>(defaultValue);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const addToHistory = (item: string) => {
    setSearchHistory((prev) => Array.from(new Set([item, ...prev])));
  };

  const removeFromHistory = (item: string) => {
    setSearchHistory((prev) => prev.filter((entry) => entry !== item));
  };

  return (
    <SearchContext.Provider
      value={{ searchHistory, addToHistory, removeFromHistory }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);

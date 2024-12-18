import React from "react";
import { SearchProvider } from "./context/SearchContext";
import { SearchContainer } from "./components/SearchContainer/SearchContainer";

export const App: React.FC = () => {
  return (
    <SearchProvider>
      <SearchContainer />
    </SearchProvider>
  );
};

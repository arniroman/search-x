import { SearchProvider } from "./context/SearchContext";
import { SearchContainer } from "./components/SearchContainer/SearchContainer";

export const App = () => {
  return (
    <SearchProvider>
      <SearchContainer />
    </SearchProvider>
  );
};

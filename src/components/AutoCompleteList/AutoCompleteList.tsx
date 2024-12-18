import { useSearchContext } from "../../context/SearchContext";

import "./AutoCompleteList.css";

interface AutoCompleteListProps {
  suggestions: string[];
  onSelect: (item: string) => void;
}

export const AutoCompleteList = ({
  suggestions,
  onSelect,
}: AutoCompleteListProps) => {
  const { searchHistory, removeFromHistory } = useSearchContext();

  return (
    <ul className="autocomplete-list">
      {suggestions.map((item) => {
        const isInHistory = searchHistory.includes(item);

        return (
          <li
            role="option"
            aria-selected={false}
            key={item}
            onMouseDown={() => onSelect(item)}
            className={isInHistory ? "history-item" : "default-item"}
          >
            <span>{item}</span>
            {isInHistory && (
              <button
                onMouseDown={(e) => {
                  e.stopPropagation();
                  removeFromHistory(item);
                }}
                className="remove-btn"
              >
                Remove
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

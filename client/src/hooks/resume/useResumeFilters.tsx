import {
  createContext,
  useContext,
  useState,
  useEffect,
  type PropsWithChildren,
} from "react";
import { useDebounce } from "use-debounce";

export type ResumeSortOption = "name" | "comfort_level" | "last_updated_at";
type SortDirection = "asc" | "desc";

export interface ResumeFilterState {
  search: string;
  sort: {
    field: ResumeSortOption;
    direction: SortDirection;
  };
  categories: string[];
  subcategories: string[];
  employers: string[];
}

export interface ResumeAppliedFilterState extends ResumeFilterState {}

export interface ResumeFilterActions {
  applyFilters: () => void;
  clearFilters: () => void;
  resetToDefaults: () => void;
}

export interface ResumeCollapsedState {
  categories: boolean;
  subcategories: boolean;
  employers: boolean;
}

const defaultFilters: ResumeFilterState = {
  search: "",
  sort: {
    field: "name",
    direction: "asc",
  },
  categories: [],
  subcategories: [],
  employers: [],
};

function useResumeFiltersState() {
  // Selected filters (not yet applied)
  const [selectedFilters, setSelectedFilters] = useState<ResumeFilterState>(defaultFilters);
  
  // Applied filters (used for the query)
  const [appliedFilters, setAppliedFilters] = useState<ResumeAppliedFilterState>(defaultFilters);

  // Debounced search term that applies immediately
  const [debouncedSearch] = useDebounce(selectedFilters.search, 300);

  const [collapsed, setCollapsed] = useState<ResumeCollapsedState>({
    categories: true,
    subcategories: true,
    employers: true,
  });

  // Auto-apply search changes with debouncing
  useEffect(() => {
    setAppliedFilters(prev => ({
      ...prev,
      search: debouncedSearch,
    }));
  }, [debouncedSearch]);

  const applyFilters = () => {
    setAppliedFilters(selectedFilters);
  };

  const clearFilters = () => {
    setSelectedFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  };

  const resetToDefaults = () => {
    setSelectedFilters(defaultFilters);
  };

  const state = {
    selectedFilters,
    appliedFilters,
    collapsed,
  };

  const methods = {
    setSelectedFilters,
    setAppliedFilters,
    setCollapsed,
    applyFilters,
    clearFilters,
    resetToDefaults,
  };

  return [state, methods] as const;
}

type UseResumeFiltersState = ReturnType<typeof useResumeFiltersState>;

const ResumeFiltersContext = createContext<UseResumeFiltersState | null>(null);

export const ResumeFiltersProvider = ({ children }: PropsWithChildren) => {
  const state = useResumeFiltersState();

  return (
    <ResumeFiltersContext.Provider value={state}>
      {children}
    </ResumeFiltersContext.Provider>
  );
};

export const useResumeFilters = () => {
  if (ResumeFiltersContext === null) {
    throw new Error(
      `useResumeFilters must be used within a ResumeFiltersProvider`
    );
  }

  return useContext(ResumeFiltersContext!)!;
};

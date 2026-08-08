import { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

interface FilterContextType {
  isFilterOpen: boolean;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function PageStateContext({ children }: { children: ReactNode }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <FilterContext.Provider value={{ isFilterOpen, setIsFilterOpen }}>
      {children}
    </FilterContext.Provider>
  );
}

export function usePageState() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}
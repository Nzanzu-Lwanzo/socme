import { createContext, ReactNode, useContext, useState } from "react";

export type ByType = "my_posts" | "name" | "textContent" | "all";

interface FilterAndSearchStateType {
  by: ByType;
  setBy: React.Dispatch<React.SetStateAction<ByType>>;
}

const FilterAndSearchContext = createContext<FilterAndSearchStateType | null>(
  null
);

export const useFilterAndSearchContext = () => {
  return useContext(FilterAndSearchContext)!;
};

export const FilterAndSearchContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [by, setBy] = useState<FilterAndSearchStateType["by"]>("all");

  const value = {
    by,
    setBy,
  };

  return (
    <FilterAndSearchContext.Provider value={value}>
      {children}
    </FilterAndSearchContext.Provider>
  );
};

import { Search } from "lucide-react";

const FilterAndSearch = () => {
  return (
    <div className="filter__and__search">
      <div className="contain__input">
        <input type="text" placeholder="Find specific posts in the feed" />
        <button type="button">
          <Search />
        </button>
      </div>
    </div>
  );
};

export default FilterAndSearch;

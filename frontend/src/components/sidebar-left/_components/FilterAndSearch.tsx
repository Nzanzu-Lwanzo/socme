import { Search } from "lucide-react";
import { useFilterAndSearchContext } from "../../../contexts/FilterAndSearchContext";
import { useFilterAndSearch } from "../../../hooks/postHooks";
import { useState } from "react";
import Loader from "../../cross-app/Loader";

const FilterAndSearch = () => {
  const { by, setBy } = useFilterAndSearchContext();
  const { search, getAll, pending } = useFilterAndSearch();
  const [hint, setHint] = useState<string | undefined>(undefined);

  return (
    <div className="filter__and__search">
      {by !== "all" && (
        <div className="contain__input">
          <input
            type="text"
            placeholder="Find specific posts in the feed"
            onChange={(e) => setHint(e.target.value)}
          />
          <button type="button" onClick={() => search(hint)}>
            {pending ? <Loader height={18} width={18} /> : <Search size={18} />}
          </button>
        </div>
      )}
      <div className="actions">
        <button
          type="button"
          className={`action ${by === "all" ? "active" : null}`}
          onClick={() => {
            setBy("all");

            // Fetch all the posts again
            getAll()
          }}
        >
          All
        </button>
        <button
          type="button"
          className={`action ${by === "my_posts" ? "active" : null}`}
          onClick={() => {
            setBy("my_posts");
          }}
        >
          My posts
        </button>
        <button
          type="button"
          className={`action ${by === "name" ? "active" : null}`}
          onClick={() => setBy("name")}
        >
          By name
        </button>
        <button
          type="button"
          className={`action ${by === "textContent" ? "active" : null}`}
          onClick={() => setBy("textContent")}
        >
          By post
        </button>
      </div>
    </div>
  );
};

export default FilterAndSearch;

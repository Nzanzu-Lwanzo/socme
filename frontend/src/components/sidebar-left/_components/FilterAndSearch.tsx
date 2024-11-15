import { Search } from "lucide-react";
import { useFilterAndSearchContext } from "../../../contexts/FilterAndSearchContext";
import { useFilterAndSearch } from "../../../hooks/postHooks";

const FilterAndSearch = () => {
  const { by, setBy } = useFilterAndSearchContext();

  const { showAll, showMyPosts } = useFilterAndSearch();

  return (
    <div className="filter__and__search">
      {by !== "all" && (
        <div className="contain__input">
          <input type="text" placeholder="Find specific posts in the feed" />
          <button type="button">
            <Search />
          </button>
        </div>
      )}
      <div className="actions">
        <button
          type="button"
          className={`action ${by === "all" ? "active" : null}`}
          onClick={() => {
            setBy("all");
            showAll();
          }}
        >
          All
        </button>
        <button
          type="button"
          className={`action ${by === "my_posts" ? "active" : null}`}
          onClick={() => {
            setBy("my_posts");
            showMyPosts();
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

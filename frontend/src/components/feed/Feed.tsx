import FeedCard from "./_components/FeedCard";
import useAppStore from "../../stores/AppStore";
import { useGetPosts } from "../../hooks/postHooks";
import Loader from "../cross-app/Loader";

const Feed = () => {
  const posts = useAppStore((state) => state.posts);
  const { isFetching, on_fetch_posts_transition } = useGetPosts();
  return (
    <div id="feed">
      {isFetching || on_fetch_posts_transition ? (
        <Loader height={100} width={100} />
      ) : (
        posts.map((post) => {
          return <FeedCard key={post._id} post={post} />;
        })
      )}
    </div>
  );
};

export default Feed;

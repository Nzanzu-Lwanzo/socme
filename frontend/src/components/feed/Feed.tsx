import FeedCard from "./_components/FeedCard";
import useAppStore from "../../stores/AppStore";
import { useGetPosts } from "../../hooks/postHooks";
import { InfinitySpin } from "react-loader-spinner";
import { COLOR_SCHEMA } from "../../utils/constants";

const Feed = () => {
  const posts = useAppStore((state) => state.posts);
  const { isFetching, on_fetch_posts_transition } = useGetPosts();
  return (
    <div id="feed">
      {isFetching || on_fetch_posts_transition ? (
        <div className="loading__posts">
          <InfinitySpin color={COLOR_SCHEMA.black} />
        </div>
      ) : (
        posts.map((post) => {
          return <FeedCard key={post._id} post={post} />;
        })
      )}
    </div>
  );
};

export default Feed;

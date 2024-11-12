import FeedCard from "./_components/FeedCard";
import Loader from "../cross-app/Loader";
import useAppStore from "../../stores/AppStore";
import { useGetAllPosts } from "../../hooks/postHooks";

const Feed = () => {
  const posts = useAppStore((state) => state.posts);
  const {} = useGetAllPosts();
  return (
    <div id="feed">
      {posts.map((post) => {
        return <FeedCard key={post._id} post={post} />;
      })}
      <Loader />
    </div>
  );
};

export default Feed;

import FeedCard from "./_components/FeedCard";
import Loader from "../cross-app/Loader";

const Feed = () => {
  return (
    <div id="feed">
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <Loader />
    </div>
  );
};

export default Feed;

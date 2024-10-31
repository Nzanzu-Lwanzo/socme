import UserActionsOnFeed from "./UserActionsOnFeed";
import FeedCardTop from "./FeedCardTop";
import Comments from "./Comments";
import { useState } from "react";
import FeedImages from "../../cross-app/FeedImages";

const FeedCard = () => {
  const [expandCommentsTab, setExpandCommentsTab] = useState(false);

  const expandTab = () => {
    setExpandCommentsTab((prev) => !prev);
  };

  return (
    <div className="feed">
      <FeedCardTop />
      <FeedImages />
      <div className="bottom">
        <UserActionsOnFeed onReplyIconClick={expandTab} />
        <Comments expand={expandCommentsTab} />
      </div>
    </div>
  );
};

export default FeedCard;

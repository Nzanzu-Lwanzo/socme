import UserActionsOnFeed from "./UserActionsOnFeed";
import FeedCardTop from "./FeedCardTop";
import Comments from "./Comments";
import { useState } from "react";
import FeedImages from "../../cross-app/FeedImages";
import { PopulateUserType, type Post } from "../../../types/interfaces";

const FeedCard = ({ post }: { post: Post }) => {
  const [expandCommentsTab, setExpandCommentsTab] = useState(false);
  const author = post.author;

  const expandTab = () => {
    setExpandCommentsTab((prev) => !prev);
  };

  return (
    <div className="feed">
      <FeedCardTop
        author={author as PopulateUserType}
        _id={post._id}
        textContent={post.textContent}
      />
      <FeedImages images={post.mediaFiles as string[]} />
      <div className="bottom">
        <UserActionsOnFeed
          postId={post._id}
          dislikes={post.dislikes.length}
          likes={post.likes.length}
          seen={post.seen.length}
          comments={post.comments.length}
          onReplyIconClick={expandTab}
        />
        <Comments comments={post.comments || []} expand={expandCommentsTab} />
      </div>
    </div>
  );
};

export default FeedCard;

import UserActionsOnFeed from "./UserActionsOnFeed";
import FeedCardTop from "./FeedCardTop";
import Comments from "./Comments";
import { useState } from "react";
import FeedImages from "../../cross-app/FeedImages";
import {
  PopulateUserType,
  PostMediaFileType,
  type Post,
} from "../../../types/interfaces";
import useAppStore from "../../../stores/AppStore";

const FeedCard = ({ post }: { post: Post }) => {
  const [expandCommentsTab, setExpandCommentsTab] = useState(false);
  const author = post.author as PopulateUserType;
  const auth = useAppStore((state) => state.auth);

  const expandTab = () => {
    setExpandCommentsTab((prev) => !prev);
  };

  return (
    <div className="feed">
      <FeedCardTop post={post} />
      {post.mediaFiles.length >= 1 && (
        <FeedImages
          images={(post.mediaFiles as PostMediaFileType[]).map(
            (mediaFile) => mediaFile.url
          )}
        />
      )}
      <div className="bottom">
        <UserActionsOnFeed
          isAuthor={author._id === auth?._id}
          postId={post._id}
          dislikes={post.dislikes.length}
          likes={post.likes.length}
          seen={post.seen.length}
          comments={post.comments.length}
          onReplyIconClick={expandTab}
          countMediaFiles={post.mediaFiles.length}
        />
        <Comments comments={post.comments || []} expand={expandCommentsTab} />
      </div>
    </div>
  );
};

export default FeedCard;

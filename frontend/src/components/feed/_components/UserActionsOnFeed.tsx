import { ThumbsUp, ThumbsDown, Reply, Eye, Image } from "lucide-react";
import { useCountUpdators } from "../../../hooks/postHooks";
import Loader from "../../cross-app/Loader";

const UserActionsOnFeed = ({
  onReplyIconClick,
  likes,
  dislikes,
  seen,
  comments,
  postId,
}: {
  onReplyIconClick: () => void;
  likes: number;
  dislikes: number;
  seen: number;
  comments: number;
  postId: string;
}) => {
  const { dislikePost, likePost, likeState, dislikeState } =
    useCountUpdators(postId);

  return (
    <div className="user__actions__on__feed">
      <button className="like action" onClick={likePost}>
        {likeState !== "pending" ? (
          <ThumbsUp size={20} />
        ) : (
          <Loader height={20} width={20} />
        )}
        <span>{likes}</span>
      </button>
      <button className="dislike action" onClick={dislikePost}>
        {dislikeState !== "pending" ? (
          <ThumbsDown size={20} />
        ) : (
          <Loader height={20} width={20} />
        )}
        <span>{dislikes}</span>
      </button>
      <button className="comment action" onClick={onReplyIconClick}>
        <Reply size={20} />
        <span>{comments}</span>
      </button>
      <button className="seen action">
        <Eye size={20} />
        <span>{seen}</span>
      </button>
      <button className="count__images action">
        <Image size={20} />
        <span>10</span>
      </button>
    </div>
  );
};

export default UserActionsOnFeed;

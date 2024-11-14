import { ThumbsUp, ThumbsDown, Reply, Eye, Image } from "lucide-react";
import { useCountUpdators } from "../../../hooks/postHooks";
import Loader from "../../cross-app/Loader";
import { memo } from "react";

const UserActionsOnFeed = memo(
  ({
    onReplyIconClick,
    likes,
    dislikes,
    seen,
    comments,
    postId,
    isAuthor,
    countMediaFiles,
  }: {
    onReplyIconClick: () => void;
    likes: number;
    dislikes: number;
    seen: number;
    comments: number;
    postId: string;
    isAuthor: boolean;
    countMediaFiles: number;
  }) => {
    const {
      dislikePost,
      likePost,
      likeState,
      dislikeState,
      on_dislike_updating_state,
      on_like_updating_state,
    } = useCountUpdators(postId);

    return (
      <div className="user__actions__on__feed">
        <button className="like action" onClick={likePost}>
          {likeState !== "pending" || on_like_updating_state ? (
            <ThumbsUp size={20} />
          ) : (
            <Loader height={20} width={20} />
          )}
          <span>{likes}</span>
        </button>
        <button className="dislike action" onClick={dislikePost}>
          {dislikeState !== "pending" || on_dislike_updating_state ? (
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
        {isAuthor && (
          <button className="seen action">
            <Eye size={20} />
            <span>{seen}</span>
          </button>
        )}

        {countMediaFiles > 2 && (
          <button className="count__images action">
            <Image size={20} />
            <span>{countMediaFiles}</span>
          </button>
        )}
      </div>
    );
  }
);
export default UserActionsOnFeed;

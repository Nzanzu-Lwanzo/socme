import { Delete, ThumbsUp, ThumbsDown } from "lucide-react";
import UserProfile from "../../cross-app/UserProfile";
import { Comment } from "../../../types/interfaces";
import { formatDate } from "../../../utils/handlersAndFormatters";
import { useDeletePostComment } from "../../../hooks/postHooks";
import Loader from "../../cross-app/Loader";

const CommentElt = ({
  comment,
  postId,
}: {
  comment: Comment;
  postId: string;
}) => {
  const { requestDeletion, status } = useDeletePostComment();

  return (
    <div className="card">
      <div className="top">
        <UserProfile user={comment.author} />
        <div className="actions">
          <button
            type="button"
            className="action"
            onClick={() => requestDeletion(comment._id, postId)}
          >
            {status !== "error" ? (
              <Delete size={18} />
            ) : (
              <Loader height={18} width={18} />
            )}
          </button>
        </div>
      </div>
      <p className="comment__text">{comment.content}</p>
      <div className="card__bottom">
        <div className="actions">
          <button type="button" className="like action">
            <span className="icon">
              <ThumbsUp size={16} />
            </span>
            <span className="icon__text">{comment.likes} likes</span>
          </button>
          <button type="button" className="dislike action">
            <span className="icon">
              <ThumbsDown size={16} />
            </span>
            <span className="icon__text">{comment.dislikes} pouah</span>
          </button>
        </div>
        <div className="infos">
          <span className="comment__date">{formatDate(comment.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentElt;

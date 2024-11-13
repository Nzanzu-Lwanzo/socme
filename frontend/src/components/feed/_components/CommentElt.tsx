import { Delete, ThumbsUp, ThumbsDown } from "lucide-react";
import UserProfile from "../../cross-app/UserProfile";
import { Comment } from "../../../types/interfaces";

const CommentElt = ({ comment }: { comment: Comment }) => {
  return (
    <div className="card">
      <div className="top">
        <UserProfile user={comment.author} />
        <div className="actions">
          <button type="button" className="action">
            <Delete size={18} />
          </button>
        </div>
      </div>
      <p>{comment.content}</p>
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
          <span>Hier à 12:00</span>
        </div>
      </div>
    </div>
  );
};

export default CommentElt;

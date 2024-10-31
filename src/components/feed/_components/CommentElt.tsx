import { Delete, ThumbsUp, ThumbsDown } from "lucide-react";
import UserProfile from "../../cross-app/UserProfile";

const CommentElt = () => {
  return (
    <div className="card">
      <div className="top">
        <UserProfile />
        <div className="actions">
          <button type="button" className="action">
            <Delete size={18} />
          </button>
        </div>
      </div>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
        sapiente cupiditate quod aliquam, sunt laboriosam in a, vitae ea
        recusandae fugiat totam fuga unde culpa eveniet voluptate. Quibusdam,
        vel quos?
      </p>
      <div className="card__bottom">
        <div className="actions">
          <button type="button" className="like action">
            <span className="icon">
              <ThumbsUp size={16} />
            </span>
            <span>10 likes</span>
          </button>
          <button type="button" className="dislike action">
            <span className="icon">
              <ThumbsDown size={16} />
            </span>
            <span>10 pouah</span>
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

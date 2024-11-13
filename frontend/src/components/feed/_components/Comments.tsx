import { Comment } from "../../../types/interfaces";
import CommentElt from "./CommentElt";

const Comments = ({
  expand,
  comments,
}: {
  expand: boolean;
  comments: Comment[];
}) => {
  // Display comments and manage mutations
  return (
    <div className={`comments ${expand ? "expand" : null}`}>
      <div className="timeline">
        {comments.map((comment) => {
          return (
            <div className="container">
              <CommentElt comment={comment} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;

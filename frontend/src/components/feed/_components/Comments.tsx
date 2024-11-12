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
  console.log(comments);
  return (
    <div className={`comments ${expand ? "expand" : null}`}>
      <div className="timeline">
        <div className="container">
          <CommentElt />
        </div>
        <div className="container">
          <CommentElt />
        </div>
        <div className="container">
          <CommentElt />
        </div>
      </div>
    </div>
  );
};

export default Comments;

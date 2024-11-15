import { Comment } from "../../../types/interfaces";
import CommentElt from "./CommentElt";
import CommentForm from "../_feedForm/CommentForm";

const Comments = ({
  postId,
  expand,
  comments,
}: {
  postId: string;
  expand: boolean;
  comments: Comment[];
}) => {
  return (
    <div className={`comments ${expand ? "expand" : null}`}>
      <div className="timeline">
        {comments.length !== 0 ? (
          comments.map((comment) => {
            return (
              <div className="container">
                <CommentElt
                  key={comment._id}
                  postId={postId}
                  comment={comment}
                />
              </div>
            );
          })
        ) : (
          <div className="no__comments">
            <span>No comment yet !</span>
          </div>
        )}
      </div>
      <CommentForm postId={postId} />
    </div>
  );
};

export default Comments;

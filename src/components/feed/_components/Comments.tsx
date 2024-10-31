import CommentElt from "./CommentElt";

const Comments = ({ expand }: { expand: boolean }) => {
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

import { Send } from "lucide-react";
import { usePostComment } from "../../../hooks/postHooks";
import Loader from "../../cross-app/Loader";
import { useState } from "react";

const CommentForm = ({ postId }: { postId: string }) => {
  const [comment, setComment] = useState("");

  const { isPending, mutate } = usePostComment(() => {
    setComment("");
  });
  return (
    <div className="comment__box">
      <input
        type="text"
        className="comment__input"
        placeholder="Write a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={() => {
          mutate({ comment, postId });
        }}
      >
        {isPending ? (
          <Loader height={18} width={18} />
        ) : (
          <Send size={20} stroke="#FFF" />
        )}
      </button>
    </div>
  );
};

export default CommentForm;

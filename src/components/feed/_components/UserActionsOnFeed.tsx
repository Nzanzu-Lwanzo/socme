import { ThumbsUp, ThumbsDown, Reply, Eye } from "lucide-react";

const UserActionsOnFeed = ({
  onReplyIconClick,
}: {
  onReplyIconClick: () => void;
}) => {
  return (
    <div className="user__actions__on__feed">
      <button className="like action">
        <ThumbsUp size={20} />
        <span>10</span>
      </button>
      <button className="dislike action">
        <ThumbsDown size={20} />
        <span>10</span>
      </button>
      <button className="comment action" onClick={onReplyIconClick}>
        <Reply size={20} />
        <span>10</span>
      </button>
      <button className="seen action">
        <Eye size={20} />
        <span>10</span>
      </button>
    </div>
  );
};

export default UserActionsOnFeed;

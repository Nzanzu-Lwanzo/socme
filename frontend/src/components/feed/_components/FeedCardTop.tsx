import { COLOR_SCHEMA } from "../../../utils/constants";
import { Ellipsis, X, Edit } from "lucide-react";
import UserProfile from "../../cross-app/UserProfile";
import { PopulateUserType, Post } from "../../../types/interfaces";
import useAppStore from "../../../stores/AppStore";
import { useDeletePost } from "../../../hooks/postHooks";
import Loader from "../../cross-app/Loader";
import { useState } from "react";
import useFeedFormStore from "../../../stores/FeedFormStore";

const FeedCardTop = ({ post }: { post: Post }) => {
  // Use the ID for further mutations
  const { isPending, mutate, on_delete_updating_state } = useDeletePost();
  const { auth, setModal } = useAppStore();
  const [clampTextContent, setClampTextContent] = useState(true);
  const addPostToUpdate = useFeedFormStore((state) => state.addPostToUpdate);

  return (
    <div className="feed__card__top">
      <div className="user__and__actions">
        <UserProfile
          user={post?.author as PopulateUserType}
          withDate={post.createdAt}
        />
        <div className="actions">
          {(post.author as PopulateUserType)._id === auth?._id && (
            <>
              <button type="button" className="action">
                <Ellipsis size={20} stroke={COLOR_SCHEMA.black} />
              </button>
              <button
                type="button"
                className="action"
                onClick={() => {
                  addPostToUpdate(post);
                  setModal("UPDATE_POST_FORM");
                }}
              >
                <Edit size={20} stroke={COLOR_SCHEMA.black} />
              </button>
              <button
                type="button"
                className="action"
                onClick={() => {
                  let confirmed = confirm(
                    "Are you sure you want to delet this post ?"
                  );

                  if (confirmed) {
                    mutate(post._id);
                  }
                }}
              >
                {isPending || on_delete_updating_state ? (
                  <Loader height={18} width={18} />
                ) : (
                  <X size={20} stroke={COLOR_SCHEMA.black} />
                )}
              </button>
            </>
          )}
        </div>
      </div>
      <div className="feed__description">
        <p
          className={`${clampTextContent ? "clamp" : null}`}
          onClick={() => setClampTextContent((prev) => !prev)}
        >
          {post.textContent}
        </p>
      </div>
    </div>
  );
};

export default FeedCardTop;

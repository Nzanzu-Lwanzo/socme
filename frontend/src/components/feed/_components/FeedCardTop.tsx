import { COLOR_SCHEMA } from "../../../utils/constants";
import { Ellipsis, X, Bell } from "lucide-react";
import UserProfile from "../../cross-app/UserProfile";
import { PopulateUserType } from "../../../types/interfaces";
import useAppStore from "../../../stores/AppStore";
import { useDeletePost } from "../../../hooks/postHooks";
import Loader from "../../cross-app/Loader";

const FeedCardTop = ({
  _id,
  textContent,
  author,
  postDate,
}: {
  _id: string;
  textContent: string;
  author: PopulateUserType;
  postDate: string;
}) => {
  // Use the ID for further mutations
  const { isPending, mutate, on_delete_updating_state } = useDeletePost();
  const auth = useAppStore((state) => state.auth);

  return (
    <div className="feed__card__top">
      <div className="user__and__actions">
        <UserProfile user={author} withDate={postDate} />
        <div className="actions">
          <button type="button" className="action">
            <Bell size={20} stroke={COLOR_SCHEMA.black} />
          </button>
          {author._id === auth?._id && (
            <>
              <button type="button" className="action">
                <Ellipsis size={20} stroke={COLOR_SCHEMA.black} />
              </button>
              <button
                type="button"
                className="action"
                onClick={() => {
                  let confirmed = confirm(
                    "Are you sure you want to delet this post ?"
                  );

                  if (confirmed) {
                    mutate(_id);
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
        <p>{textContent}</p>
      </div>
    </div>
  );
};

export default FeedCardTop;

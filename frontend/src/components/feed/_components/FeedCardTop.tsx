import { COLOR_SCHEMA } from "../../../utils/constants";
import { Ellipsis, X, Bell } from "lucide-react";
import UserProfile from "../../cross-app/UserProfile";
import { PopulateUserType } from "../../../types/interfaces";

const FeedCardTop = ({
  _id,
  textContent,
  author,
}: {
  _id: string;
  textContent: string;
  author: PopulateUserType;
}) => {
  // Use the ID for further mutations
  console.log(_id);

  return (
    <div className="feed__card__top">
      <div className="user__and__actions">
        <UserProfile user={author} />
        <div className="actions">
          <button type="button" className="action">
            <Bell size={20} stroke={COLOR_SCHEMA.black} />
          </button>
          <button type="button" className="action">
            <Ellipsis size={20} stroke={COLOR_SCHEMA.black} />
          </button>
          <button type="button" className="action">
            <X size={20} stroke={COLOR_SCHEMA.black} />
          </button>
        </div>
      </div>
      <div className="feed__description">
        <p>{textContent}</p>
      </div>
    </div>
  );
};

export default FeedCardTop;

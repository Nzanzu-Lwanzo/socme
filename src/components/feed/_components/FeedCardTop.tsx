import { COLOR_SCHEMA } from "../../../utils/constants";
import { Ellipsis, X, Bell } from "lucide-react";
import UserProfile from "../../cross-app/UserProfile";

const FeedCardTop = () => {
  return (
    <div className="feed__card__top">
      <div className="user__and__actions">
        <UserProfile />
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
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum
          laborum saepe dolores cumque quos ad modi corrupti animi iste. Labore
          maxime laborum ullam, obcaecati sit accusamus dolore pariatur
          distinctio dignissimos?
        </p>
      </div>
    </div>
  );
};

export default FeedCardTop;

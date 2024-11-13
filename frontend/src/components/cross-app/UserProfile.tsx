import useAppStore from "../../stores/AppStore";
import Avatar from "boring-avatars";
import { PopulateUserType, UserPictureType } from "../../types/interfaces";
import { formatDate } from "../../utils/handlersAndFormatters";

const UserProfile = ({
  user,
  withDate,
}: {
  user?: PopulateUserType;
  withDate?: string;
}) => {
  const auth = user || useAppStore((state) => state.auth);

  return (
    <div className="profile">
      {auth?.picture ? (
        <img
          src={((auth as PopulateUserType).picture as UserPictureType).url}
          alt={auth.name}
          className="user__image"
        />
      ) : (
        <Avatar size={30} name={auth?.name} />
      )}

      <div className="about__feed">
        <span className="user__name">{auth?.name}</span>
        {withDate && <span className="date"> {formatDate(withDate)} </span>}
      </div>
    </div>
  );
};

export default UserProfile;

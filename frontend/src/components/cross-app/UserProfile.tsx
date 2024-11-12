import useAppStore from "../../stores/AppStore";
import Avatar from "boring-avatars";
import { PopulateUserType } from "../../types/interfaces";

const UserProfile = ({ user }: { user: PopulateUserType }) => {
  const auth = user || useAppStore((state) => state.auth);

  return (
    <div className="profile">
      {auth?.picture ? (
        <img
          src={auth?.picture as string}
          alt={auth.name}
          className="user__image"
        />
      ) : (
        <Avatar size={30} name={auth?.name} />
      )}

      <div className="about__feed">
        <span className="user__name">{auth?.name}</span>
      </div>
    </div>
  );
};

export default UserProfile;

import SimpleNotif from "./SimpleNotif";
import NewFeedNotif from "./NewFeedNotif";

const ListNotifications = () => {
  return (
    <div className="contained">
      <ul className="list__notifications">
        <SimpleNotif verb="liked" />
        <SimpleNotif verb="disliked" />
        <NewFeedNotif />
        <NewFeedNotif />
      </ul>
    </div>
  );
};

export default ListNotifications;

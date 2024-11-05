import ListNotifications from "../components/sidebar-right/Notifications/ListNotifications";
import MobilePagesSubTopBar from "../components/cross-app/MobilePagesSubTopBar";
import "../assets/style/perPage/notifications.scss";

const Notifications = () => {
  return (
    <main className="notifications__page">
      <MobilePagesSubTopBar title="Notifications" />
      <div className="container">
        <ListNotifications />
      </div>
    </main>
  );
};

export default Notifications;

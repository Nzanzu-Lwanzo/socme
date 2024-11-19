import { useSetPushNotifications } from "../../../hooks/notificationsHooks";
import useAppStore from "../../../stores/AppStore";

const Settings = () => {
  const { subscribeToPush, unsubscribeFromPush } = useSetPushNotifications();
  const auth = useAppStore((state) => state.auth);

  console.log(auth);

  return (
    <div className="list__settings">
      <div className="setting">
        <label htmlFor="notify">
          You'll be notified for each of the following cases : a new feed has
          been posted, a new comment has been posted in a feed post you
          activated notifications for, reminding you to post a feed you planned
          to post, ...
        </label>
        <input
          type="checkbox"
          name="notify"
          id="notify"
          defaultChecked={!!auth?.pushSubscription}
          onChange={(e) => {
            if (e.target.checked) {
              subscribeToPush();
            } else {
              unsubscribeFromPush();
            }
          }}
        />
      </div>

      <div className="setting">
        <label htmlFor="sound">
          A sound will be played in each of the following situations : a new
          post of yours has successfully been uploaded, a new comment of yours
          has successfully been posted, you have received a new notification,
          ...
        </label>
        <input type="checkbox" name="sound" id="sound" />
      </div>
    </div>
  );
};

export default Settings;

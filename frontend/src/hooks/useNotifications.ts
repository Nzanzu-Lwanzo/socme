import { PUSH_PUBLIC_KEY } from "../utils/constants";
import Axios from "axios";
import { BASE_URL } from "../utils/constants";

export const useSetPushNotifications = () => {
  return {
    subscribeToPush: async () => {
      try {
        if (
          "Notification" in window &&
          "serviceWorker" in navigator &&
          "PushManager" in window
        ) {
          const registration = await navigator.serviceWorker.register(
            "/sw.js",
            {
              scope: "/",
            }
          );
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: PUSH_PUBLIC_KEY,
          });

          // Send to the backend and save it into the database
          const response = await Axios.post(
            BASE_URL.concat("/api/user/subscribe-to-push"),
            {
              subscription,
            },
            {
              withCredentials: true,
            }
          );

          if (!(response.status === 200)) {
            // Something went wrong
          }

          return true;
        } else {
          // Ain't no way you can set push notifications for this device

          return false;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    requestPermission: () => {
      if (!("Notification" in window)) {
        // Notifications are not supported on this device
        alert("Notifications are not supported on this device");
      }
    },
  };
};

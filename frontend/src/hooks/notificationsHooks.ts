import { PUSH_PUBLIC_KEY } from "../utils/constants";
import Axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/constants";
import { lsWrite } from "../db/ls.io";
import { enqueueSnackbar } from "notistack";
import useAppStore from "../stores/AppStore";
import { handleErrors } from "../utils/handlersAndFormatters";

export const useSetPushNotifications = () => {
  const setAuth = useAppStore((state) => state.setAuth);

  return {
    subscribeToPush: async () => {
      try {
        if (
          "Notification" in window &&
          "serviceWorker" in navigator &&
          "PushManager" in window
        ) {
          let registration;

          if (!navigator.serviceWorker.controller) {
            registration = await navigator.serviceWorker.register("/sw.js", {
              scope: "/",
              type: "module",
            });
          } else {
            registration = await navigator.serviceWorker.ready;
          }

          if (!registration) {
            throw new Error("SW_NOT_REGISTERED");
          }

          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: PUSH_PUBLIC_KEY,
          });

          // Send to the backend and save it into the database
          const response = await Axios.post(
            BASE_URL.concat("/user/subscribe-to-push"),
            {
              subscription,
            },
            {
              withCredentials: true,
            }
          );

          if (!(response.status === 200)) {
            // Something went wrong
            enqueueSnackbar("Oups, you couldn't be subscribed !");
          }

          setAuth(response.data);
          lsWrite("socme-auth", response.data);

          return true;
        } else {
          // Ain't no way you can set push notifications for this device
          enqueueSnackbar(
            "Oups, push notifications not supported on this device !"
          );
          return false;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    unsubscribeFromPush: async () => {
      try {
        const response = await Axios.get(
          BASE_URL.concat("/user/unsubscribe-from-push"),
          { withCredentials: true }
        );

        if (response.status === 200) {
          setAuth(response.data);
          lsWrite("socme-auth", response.data);
        }
      } catch (e) {
        handleErrors(e as AxiosError);
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

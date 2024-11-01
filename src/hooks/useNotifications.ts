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
            applicationServerKey: "application-server-key",
          });

          // Send to the backend and save it into the database
          console.log(subscription);
        } else {
          // Ain't no way you can set push notifications for this device
        }
      } catch (e) {
        console.log(e);
      }
    },
  };
};

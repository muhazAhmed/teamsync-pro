import { messaging } from "../../firebase";
import { getToken, onMessage } from "firebase/messaging";

export const fetchWebSocketNotification = () => {
  // Request permission to send notifications
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      // Get FCM token
      getToken(messaging, { vapidKey: "YOUR_PUBLIC_VAPID_KEY" })
        .then((currentToken) => {
          if (currentToken) {
            console.log("FCM Token:", currentToken);
            // Send the token to your backend to store and use later
            // sendTokenToBackend(currentToken);
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        })
        .catch((err) => {
          console.error("An error occurred while retrieving token. ", err);
        });
    } else {
      console.error("Unable to get permission to notify.");
    }
  });

  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
  });
};

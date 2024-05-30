import { FC, useEffect } from "react";
import { messaging } from "../../firebase"; // Adjust the path if needed
import { getToken, onMessage } from "firebase/messaging";
import Card from "../../UI-Components/Card/Card";
import "./style.css";

interface NotificationProps {
  setOpenNotification: any;
}

const Notifications: FC<NotificationProps> = ({ setOpenNotification }) => {
  // useEffect(() => {
  //   // Request permission to send notifications
  //   Notification.requestPermission().then((permission) => {
  //     if (permission === "granted") {
  //       console.log("Notification permission granted.");
  //       // Get FCM token
  //       getToken(messaging, { vapidKey: "YOUR_PUBLIC_VAPID_KEY" })
  //         .then((currentToken) => {
  //           if (currentToken) {
  //             console.log("FCM Token:", currentToken);
  //             // Send the token to your backend to store and use later
  //             // sendTokenToBackend(currentToken);
  //           } else {
  //             console.log(
  //               "No registration token available. Request permission to generate one."
  //             );
  //           }
  //         })
  //         .catch((err) => {
  //           console.error("An error occurred while retrieving token. ", err);
  //         });
  //     } else {
  //       console.error("Unable to get permission to notify.");
  //     }
  //   });

  //   onMessage(messaging, (payload) => {
  //     console.log("Message received. ", payload);
  //   });
  // }, []);

  const handleClosePopup = () => {
    setTimeout(() => {
      setOpenNotification(false);
    }, 4000);
  };

  return (
    <div className="notification slideDown" onMouseLeave={handleClosePopup}>
      <Card content={<CardContent />} />
    </div>
  );
};

const CardContent = () => {
  return (
    <div>
      <h1>Notifications</h1>
    </div>
  );
};

export default Notifications;

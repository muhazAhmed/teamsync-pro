import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyByFt75FCvTBCYTfFw4QxTZUCE1Y34H6y8",
  authDomain: "teamsync-pro.firebaseapp.com",
  projectId: "teamsync-pro",
  storageBucket: "teamsync-pro.appspot.com",
  messagingSenderId: "889752240460",
  appId: "1:889752240460:web:44383254799ef641ef4fe9",
  measurementId: "G-CGESD8265D"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const analytics = getAnalytics(app);

export { messaging, analytics };
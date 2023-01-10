import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBalX_xDXBlVeSeiB5NOywaFyo-hEYBTNc",
  authDomain: "event-management-system-94d52.firebaseapp.com",
  databaseURL:
    "https://event-management-system-94d52-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "event-management-system-94d52",
  storageBucket: "event-management-system-94d52.appspot.com",
  messagingSenderId: "310234993862",
  appId: "1:310234993862:web:d0627c9c4fda61f82773c7",
  measurementId: "G-65BW91EEC0"
};

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const app = initializeApp(firebaseConfig);

      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          "BJVJNQauTv9kLGqbAv7IL-T0unAW_a-Am0ZPj5Qlv3pSkT9YLAcU6jgcuKYYyKi6DyQpdI8TzsjOjLKccLztvio"
      }).then((currentToken) => {
        if (currentToken) {
          console.log("currentToken: ", currentToken);
        } else {
          console.log("Can not get token");
        }
      });
    } else {
      console.log("Do not have permission!");
    }
  });
}

requestPermission();

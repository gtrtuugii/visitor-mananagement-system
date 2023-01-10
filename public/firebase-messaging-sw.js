// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
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

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png"
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

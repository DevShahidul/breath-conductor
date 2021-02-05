// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 var firebaseConfig = {
    apiKey: "AIzaSyBJpzH70J_sqxJvnMW5ZWUszSYxzv0aVGg",
    authDomain: "breath-conductor-297306.firebaseapp.com",
    projectId: "breath-conductor-297306",
    storageBucket: "breath-conductor-297306.appspot.com",
    messagingSenderId: "156485572267",
    appId: "1:156485572267:web:95d29a09ec15a1dbd609ee"
  };

firebase.initializeApp(firebaseConfig);
//firebase.analytics();

// Retrieve firebase messaging
const messaging = firebase.messaging();


// messaging.onBackgroundMessage(function(payload) {
//   console.log('Received background message ', payload);

//   const notificationTitle = payload.notification.title;
//   const notificationBody = payload.notification.body;

//   self.registration.showNotification(notificationTitle, notificationBody);
// });


messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', event => {
  console.log(event)
  return event;
});
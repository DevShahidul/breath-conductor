/* // Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCpKgLeqb9aZlwLRFX0J_sTHqwWWvpaMmI",
  authDomain: "breath-conductor.firebaseapp.com",
  databaseURL: "https://breath-conductor.firebaseio.com",
  projectId: "breath-conductor",
  storageBucket: "breath-conductor.appspot.com",
  messagingSenderId: "734812129749",
  appId: "1:734812129749:web:7e4ea3741e8977c02e155c",
  measurementId: "G-50ZJC44HMM"
};

firebase.initializeApp(firebaseConfig);
//firebase.analytics();

// Retrieve firebase messaging
const messaging = firebase.messaging();


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
}); */
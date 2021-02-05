import firebase from 'firebase/app';
import 'firebase/messaging';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 var firebaseConfig = {
    apiKey: "AIzaSyBJpzH70J_sqxJvnMW5ZWUszSYxzv0aVGg",
    authDomain: "breath-conductor-297306.firebaseapp.com",
    projectId: "breath-conductor-297306",
    storageBucket: "breath-conductor-297306.appspot.com",
    messagingSenderId: "156485572267",
    appId: "1:156485572267:web:95d29a09ec15a1dbd609ee"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

const messaging = firebase.messaging();

// Get token file exported
export const getToken = (setTokenFound) => {
  return messaging.getToken({vapidKey: 'BNGAYl3KjUwV3UuADNI6NPGUM5w76o67jKHE4CbZa9HiPq5KlSJZVSpP6fisVIF_TlCmszoWLruB7-RQ9R91KQI'}).then((currentToken) => {
    if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
    } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });
}

// onMessageListener function exported
export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
      console.log("payload from firebase: ", payload);
    });
});
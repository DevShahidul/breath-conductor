import firebase from 'firebase/app';
import 'firebase/messaging';

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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

const messaging = firebase.messaging();

// Get token file exported
export const getToken = (setTokenFound) => {
  return messaging.getToken({vapidKey: 'BNoVCZo3FVm3SuwRAqouApnjCkTQ3pImOv_0JPfZfTVtHa3Qd-L8sUlzkIbsmSpL8HOO8U08kkVwJE5Sb3hhk-k'}).then((currentToken) => {
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
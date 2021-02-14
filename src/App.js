import React, {useState, useEffect} from 'react';
import './App.css';
import './Assets/CSS/style.css';
import './Assets/CSS/responsive.css';
import AppRoute from "./Route/AppRoute";
import {BrowserRouter as Router} from "react-router-dom";
import { BreathProvider } from './context';
import { getToken, onMessageListener } from './firebase';
import {Toast} from 'react-bootstrap';

function App() {

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: 'Default title', body: 'Default body text for notification body'});
  const [isTokenFound, setTokenFound] = useState(false);

  useEffect(() => {

    getToken(setTokenFound);

    onMessageListener().then(payload => {
      setShow(true);
      setNotification({title: payload.notification.title, body: payload.notification.body})
      console.log("Payload: ", payload);
    }).catch(err => console.log('failed: ', err));
    
  }, [])

  return (
      <Router>
        <BreathProvider>
        {isTokenFound ? 
          <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
            position: 'absolute',
            top: 20,
            right: 20,
            minWidth: 200
          }}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">{notification.title}</strong>
              <small>just now</small>
            </Toast.Header>
            <Toast.Body>{notification.body}</Toast.Body>
          </Toast> : null
        }
          <AppRoute/>
        </BreathProvider>
      </Router>
  );
}

export default App;

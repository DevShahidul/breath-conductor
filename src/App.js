import React from 'react';
import './App.css';
import './Assets/CSS/style.css';
import './Assets/CSS/responsive.css';
import AppRoute from "./Route/AppRoute";
import {BrowserRouter as Router} from "react-router-dom";
import { BreathProvider } from './context';


function App() {
  return (
      <Router>
        <BreathProvider>
          <AppRoute/>
        </BreathProvider>
      </Router>
  );
}

export default App;

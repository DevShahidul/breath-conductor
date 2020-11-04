import React from 'react';
import './App.css';
import './Assets/CSS/style.css';
import './Assets/CSS/responsive.css';
import AppRoute from "./Route/AppRoute";
import {BrowserRouter} from "react-router-dom";
import { BreathProvider } from './context';


function App() {
  return (
      <BrowserRouter>
        <BreathProvider>
          <AppRoute/>
        </BreathProvider>
      </BrowserRouter>
  );
}

export default App;

import React from 'react';
import './App.css';
import './Assets/CSS/style.css';
import AppRoute from "./Route/AppRoute";
import {BrowserRouter} from "react-router-dom";


function App() {
  return (
      <BrowserRouter>
          <AppRoute/>
      </BrowserRouter>
  );
}

export default App;

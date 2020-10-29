import React from 'react';
import logo from './logo.svg';
import './App.css';
import Assets from "./Component/Assets";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import Welcome from "./Component/Welcome";
import Home from "./Component/Home";
import FeelControl from "./Component/FeelControl";
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

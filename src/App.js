import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Login from './components/login';
import Desktop from './components/desktop';
import React from 'react';
import Register from './components/register';

//socket to backend
// import { socket } from './socket/socket';
// import { useEffect, useState } from 'react';

function App() {

  return(
    <React.StrictMode>
      <Router className="main">
        <Routes>
          <Route exact path="/" element={<Desktop/>}></Route>
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/register" element={<Register/>}></Route>
        </Routes>
      </Router>
    </React.StrictMode>
  );

}

export default App;

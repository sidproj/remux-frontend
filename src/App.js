import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Login from './components/login';
import Desktop from './components/desktop';

//socket to backend
// import { socket } from './socket/socket';
// import { useEffect, useState } from 'react';

function App() {

  // const [isConnected,setIsConnected] = useState(socket.connected);

  // useEffect(()=>{

  //   const onConnect = ()=>{

  //   }

  // },[]);

  return(
    <Router className="main">
      <Routes>
        <Route exact path="/" element={<Desktop/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/register" element={<Desktop/>}></Route>
      </Routes>
    </Router>
  );

}

export default App;

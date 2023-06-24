
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Test = ()=>{
    
  const [message,setMessage] = useState(null);
  const [id,setId] = useState(null);

  const [socket,setSocket] = useState(null);

  const handleInputChange = (event)=>{
    setMessage(event.target.value);
  }

  const handleIdChange = (event)=>{
    setId(event.target.value);
  }


  const connect = ()=>{
    socket.connect();
  }

  const disconnect = ()=>{
    socket.disconnect();
  }

  
  useEffect(()=>{
    const soc = io.connect("http://localhost:5000/user", {'reconnectionAttempts' : 5,autoConnect: false});

    soc.on('connect', ()=>{
      console.log("Connected");
    });

    soc.on("testing",(data)=>{
      console.log(data)
    });

    
    soc.on("disconnect_self",(data)=>{
      console.log(data);
      // soc.disconnect();
    });

    soc.on('disconnect', ()=>{
      console.log("Disconnected");
    });

    setSocket(soc);
  },[]);

  
  const sendMessage = ()=>{
    const data = {message:message,to:id};
    socket.emit("send_target_msg",data);
    
    console.log(data);
  }

  const sendDeleteReq= ()=>{
    const data={filename:"test.txt",to:id};
    socket.emit("delete_file",data);
    console.log(data);
  }

  const sendCreateReq = ()=>{
    const data = {filename:"test.txt",to:id};
    socket.emit("create_file",data);
    console.log(data);
  }

  return (
    <div className="App">
      
      <div>
        ID: <input id="message" onChange={handleIdChange}/><br/>
        Message: <input id="message" onChange={handleInputChange}/><br/>
        <button onClick={sendMessage}>Send message</button><br/>
        <button onClick={sendDeleteReq}>Send delete request</button><br/>
        <button onClick={sendCreateReq}>Send create request</button><br/>

      </div><br/>
      <button onClick={connect}>Connect</button><br/><br/>
      <button onClick={disconnect}>Disconnect</button>
    
    </div>
  );
}

export default Test;
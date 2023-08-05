import './login.css';
import { socket } from '../socket/socket';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

const Login = ()=>{

    const navigate = useNavigate();

    const [username,setUsername] = useState("sidhraj@gmail.com");
    const [password,setPassword] = useState("test@1234");

    const credentailRef = useRef();
    credentailRef.username = username;
    credentailRef.password = password;

    useEffect(()=>{

        socket.on("loginResponse",(value)=>{
            if(!value.success){
                socket.disconnect();
            }else{
                navigate("/");
            }
        });

        return ()=>{
            socket.off("askcredentials");
            socket.off("loginResponse");
        }

    },[])

    const handleSubmit = () => {

        socket.disconnect();
        
        socket.connect();
        socket.emit("login_request",
        {
            email:credentailRef.username,
            password:credentailRef.password
        });

    }

    const handleUsernameChange = (e)=>{
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e)=>{
        setPassword(e.target.value)
    }

    return(
        <div className="login-overlay">
                
            <div className="login-container">
                <div className="login-heading">Login</div>
                <div className="login-form">
                    <input 
                        name="username" 
                        id="username" 
                        placeholder="username" 
                        className="login-input" 
                        defaultValue={username}
                        onChange={handleUsernameChange}
                        autoComplete="off"
                    />
                    <input 
                        name="password" 
                        id="password"
                        placeholder="password" 
                        className="login-input"
                        type='password'
                        defaultValue={password}
                        onChange={handlePasswordChange}
                        autoComplete="new-password"
                    />
                    <div className="login-botton" onClick={handleSubmit}>Login</div>
                </div>
            </div>
        </div>
    );
}

export default Login;
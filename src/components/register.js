import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"

const Register = ()=>{
    const navigate = useNavigate();

    const [email,setEmail]= useState();
    const [password,setPassword] = useState();
    const [confirmPassword,setConfirmPassword] = useState();

    const [error,setError] = useState();

    const ref = useRef();
    ref.email = email;
    ref.password = password;
    ref.confirmPassword = confirmPassword;

    const handleEmailChange = (e)=>{
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e)=>{
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e)=>{
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = async()=>{

        setError(null);

        if(password != confirmPassword){
            setError({target:"CONFPASS"});
            return;
        }
        
        const response = await fetch("http://localhost:5000/register",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                
            },
            body:JSON.stringify({
                email,
                password,
            }),
        });
        const data = await response.json();

        if(data.error){
            setError(data);
        }

        console.log(data);
    }

    return (
        <div className="login-overlay">
            <div className="login-container">
                <div className="login-heading">Register</div>
                <div className="login-form">
                    <input
                        name="email"
                        id="email"
                        placeholder="email"
                        className="login-input"
                        defaultValue={email}
                        onChange={handleEmailChange}
                        autoComplete="off"
                    />

                    {
                        error && error.target == "EMAIL" && <div className="login-error">Email already in use</div>
                    }

                    <input
                        name="password"
                        id="password"
                        placeholder="password"
                        className="login-input"
                        defaultValue={password}
                        onChange={handlePasswordChange}
                        autoComplete="off"
                    />
                    <input
                        name="confirm-password"
                        id="confirm-password"
                        placeholder="confirm password"
                        className="login-input"
                        defaultValue={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        autoComplete="off"
                    />

                    {
                        error && error.target == "CONFPASS" && <div className="login-error">Passwords do not match</div>
                    }

                    <div className="login-botton" onClick={handleSubmit}>Register</div>
                </div>
            </div>
        </div>
    );   
}

export default Register;
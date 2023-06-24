import { useEffect, useState } from "react";
import './terminal.css';

const Terminal = (props)=>{
    const [command,setCommand] = useState("sid@ubuntu:~$ "); 

    const handleInputChange  = (e)=>{
        setCommand(e.target.value);
    }

    const isClear = ()=>{
        const afterSplit = command.split("sid@ubuntu:~$ ");
        if(afterSplit.length == 2 && afterSplit[1].toLowerCase() == "clear"){
            return true;
        }
        return false;
    }

    useEffect(()=>{
        document.getElementById("terminal-input").onkeydown=(e)=>{
            if(e.key == "Enter"){
                if(isClear()){
                    document.getElementById("terminal-history").innerHTML='';
                }
                else{
                    const cmd = document.createElement("div");
                    cmd.innerHTML=command;
                    document.getElementById("terminal-history").appendChild(cmd);

                    const terminal = document.getElementById("terminal");
                    terminal.scrollIntoView(false);
                }
                setCommand("sid@ubuntu:~$ ");
            }
        };
    })

    const handleClick = (e)=>{
        e.stopPropagation();
        console.log(0);
        document.getElementById("terminal-input").focus();
    }

    return(
        <div className="terminal-container">
            <div id="terminal" className="terminal" onClick={handleClick}>
                <div id="terminal-history" className="terminal-history">
                    <div>sid@ubuntu:~$ ls</div>
                </div>
                <input 
                    id="terminal-input"
                    value={command} 
                    onChange={handleInputChange}
                    className="terminal-input"
                    autoComplete="off"
                    spellCheck="false"
                />
            </div>
        </div>
    );
}

export default Terminal;
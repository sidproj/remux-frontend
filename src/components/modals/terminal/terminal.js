import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { addCommandToHistory, terminalsDataAtom } from "../../../recoil/atom/data/terminalModal";
import { socket } from "../../../socket/socket";
import './terminal.css';

const Terminal = (props)=>{

    const [terminalsData,setTerminalsData] = useRecoilState(terminalsDataAtom);

    const [command,setCommand] = useState(""); 
    const [prompt,setPrompt] = useState("sid@ubuntu:~$ ");

    const ref = useRef();

    ref.command = command;

    const handleInputChange  = (e)=>{
        setCommand(e.target.value);
    }

    const isClear = ()=>{
        if(ref.command.toLowerCase() == "clear" || ref.command.trim().length==0){
            return true;
        }
        return false;
    }

    const checkExit = ()=>{
        if(ref.command.toLowerCase() == "exit" ){
            props.exit();
        }
    }


    const handleExecuteCommand = ()=>{
        console.log({command:ref.command,id:props.id});
        socket.emit("execute_command_request",{command:ref.command,id:props.id});
    }

    useEffect(()=>{
        socket.on("execute_command_response",(payload)=>{
            if(payload.id != props.id) return;
            const cmd = document.createElement("div");
                    cmd.innerHTML=prompt+" " + payload.result;
                    document.getElementById("terminal-history"+props.id).appendChild(cmd);
            console.log(payload);
        });

        return ()=>{
            socket.off("execute_command_response");
        }
    },[]);

    useEffect(()=>{
        document.getElementById("terminal-input"+props.id).onkeydown=(e)=>{
            if(e.key == "Enter"){
                checkExit();
                if(isClear()){
                    document.getElementById("terminal-history"+props.id).innerHTML='';
                }
                else{
                    const cmd = document.createElement("div");
                    cmd.innerHTML=prompt+" " + ref.command;
                    document.getElementById("terminal-history"+props.id).appendChild(cmd);

                    const terminal = document.getElementById("terminal"+props.id);
                    terminal.scrollIntoView(false);
                    handleExecuteCommand();
                    addCommandToHistory(props.id,ref.command,setTerminalsData);
                }
                setCommand("");
            }
        };
    },[]);

    const handleClick = (e)=>{
        e.stopPropagation();
    }

    return(
        <div className="terminal-container">
            <div id={"terminal"+props.id} className="terminal" onClick={handleClick}>
                <div id={"terminal-history"+props.id} className="terminal-history">
                    <div>sid@ubuntu:~$ ls</div>
                </div>
                <div className="terminal-input-container">
                    <div>{prompt}</div>
                    <input 
                        id={"terminal-input"+props.id}
                        value={command} 
                        onChange={handleInputChange}
                        className="terminal-input"
                        autoComplete="off"
                        spellCheck="false"
                    />
                </div>
            </div>
        </div>
    );
}

export default Terminal;
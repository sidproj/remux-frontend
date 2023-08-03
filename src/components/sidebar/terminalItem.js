import { useRecoilState } from "recoil";

import { addWindow, changeDisplayState } from "../../recoil/atom/windowsAtom";
import { terminalsAtom } from "../../recoil/atom/design/terminalAtom";
import { addTerminal, terminalsDataAtom } from "../../recoil/atom/data/terminalModal";
import { useState } from "react";

const TerminalItem = (props)=>{

    const [terminalsState,setTerminalsState] = useRecoilState(terminalsAtom);
    const [terminalsDataState,setTerminalsDataState] = useRecoilState(terminalsDataAtom);


    const [runningWin,setRunningWin] = useState(false);

    //add a new terminal window
    const handleClick = (e)=>{
        const displayConfig = terminalsState.newConfigs;
        const displayState = "DEFAULT";
        const contentType = "TERMINAL";

        // add terminal data to terminalDataAtom;
        const terminalID = "terminal"+Date.now();
        addTerminal(terminalID,setTerminalsDataState);

        addWindow(terminalID,{displayConfig,displayState,contentType},setTerminalsState);
    }

    const handleRunningWinClick=(e)=>{
        e.stopPropagation();
        console.log(e.target.innerText);
        changeDisplayState(e.target.innerText,"DEFAULT",setTerminalsState);
    }

    const handleRunningWinDisplay = ()=>{
        const running = [];
        running.push(
            <div key="new">Open Terminal</div>
        );
        for(const key in terminalsState.windows){
            running.push(
                <div 
                    key={key}
                    className="running-item"
                    onClick={handleRunningWinClick}
                >{key}</div>
            );
        }
        return running;
    }

    const handleMouseEnter = ()=>{
        setRunningWin(true);
    }

    const handleMouseLeave = ()=>{
        setRunningWin(false);
    }

    return (
        <div 
            className='sidebar-item' 
            title="Terminal" 
            onClick={handleClick}
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
        >

            {
                runningWin && 
                (
                    <div className="sidebar-win-running">
                        { handleRunningWinDisplay()}
                    </div>
                )
            }

            <img className="sidebar-item-icon" src = {require("../../assets/images/terminalIcon.png")}></img>
            {/* <div className="sidebar-item-name">Terminal</div> */}
            {
                (Object.keys(terminalsState.windows).length !== 0) && (<div className="sidebar-item-active-container">
                    <div></div>
                </div>)
            }
            
        </div>
    );
}

export default TerminalItem;
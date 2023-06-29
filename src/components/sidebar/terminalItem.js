import { useRecoilState } from "recoil";

import { addWindow } from "../../recoil/atom/windowsAtom";
import { terminalsAtom } from "../../recoil/atom/design/terminalAtom";
import { addTerminal, terminalsDataAtom } from "../../recoil/atom/data/terminalModal";

const TerminalItem = (props)=>{

    const [terminalsState,setTerminalsState] = useRecoilState(terminalsAtom);
    const [terminalsDataState,setTerminalsDataState] = useRecoilState(terminalsDataAtom);

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

    const handleRunningWinDisplay = ()=>{
        const running = [];
        for(const key in terminalsState.windows){
            running.push(
                <div key={key}>{key}</div>
            );
        }
        return running;
    }

    return (
        <div className='sidebar-item' title="Terminal" onClick={handleClick}>

            <div className="sidebar-win-running">
                {
                    handleRunningWinDisplay()
                }
            </div>            

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
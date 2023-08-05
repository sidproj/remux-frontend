import { useRecoilState } from "recoil";
import { addWindow } from "../../recoil/atom/windowsAtom";
import { filesAtom } from "../../recoil/atom/design/filesAtom";
import { addFile,filesDataAtom } from "../../recoil/atom/data/filesModal";
import { useState } from "react";
import SettingsModal from "../modals/settingsModal/settingsModal";
import { settingsModalAtom } from "../../recoil/atom/modals/settingsModalAtom";

const SetingsItem = (props)=>{

    const [filesState,setFilesState] = useRecoilState(filesAtom);
    const [filesDataState,setFilesDataState] = useRecoilState(filesDataAtom);
    const [settingsModal,setSettingsModal] = useRecoilState(settingsModalAtom);

    const [runningWin,setRunningWin] = useState(false);
    

    const handleClick = (e)=>{
        setSettingsModal(true);
    }

    const handleMouseEnter = ()=>{
        setRunningWin(true);
    }

    const handleMouseLeave = ()=>{
        setRunningWin(false);
    }

    const handleRunningWinDisplay = () => {
        const running = [];
        running.push(
            <div key="new">Open Setting</div>
        );
        for(const key in filesState.windows){
            running.push(
                <div key={key}>{key}</div>
            )
        }
        return running;
    }

    return (
        <>
            <div 
                className='sidebar-item' 
                title="Settings" 
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

                <img className="sidebar-item-icon" src = {require("../../assets/images/settingIcon.png")}></img>
                {/* <div className="sidebar-item-name">Settings</div> */}
                {
                    (Object.keys(filesState.windows).length !== 0) && (<div className="sidebar-item-active-container">
                        <div></div>
                    </div>)
                }
            </div>
        </>
    );
}
export default SetingsItem;
import { useRecoilState } from "recoil";

import { addWindow, changeDisplayState } from "../../recoil/atom/windowsAtom";
import { foldersAtom } from "../../recoil/atom/design/foldersAtom";
import { folderDataAtom,addFolder } from "../../recoil/atom/data/foldersModal";
import { useState } from "react";

const FolderItem = (props)=>{

    const [foldersState,setFoldersState] = useRecoilState(foldersAtom);
    const [foldersDataState,setFolderDataState] = useRecoilState(folderDataAtom);

    const [runningWin,setRunningWin] = useState(false);


    const handleClick = (e)=>{
        const displayConfig = foldersState.newConfigs;
        const displayState = "DEFAULT";
        const contentType = "FOLDER";

        if(!Object.keys(foldersDataState).includes("/home")){
            addFolder( "/home",{ 
                children:[],
                data:{
                    path:"/home",
                    name:"/home",
                    type:"FOLDER"
                },
            },setFolderDataState);
        }
        addWindow("/home",{displayConfig,displayState,contentType},setFoldersState);
    }

    const handleRunningWinClick=(e)=>{
        e.stopPropagation();
        console.log(e.target.innerText);
        changeDisplayState(e.target.innerText,"DEFAULT",setFoldersState);
    }

    const handleRunningWinDisplay = ()=>{
        const running = [];

        running.push(
            <div key="new">Open Folder</div>
        );

        for(const key in foldersState.windows){
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
            title="Files" 
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

            <img className="sidebar-item-icon" src = {require("../../assets/images/folderIcon-light.png")}></img>
            {/* <div className="sidebar-item-name">Folder</div> */}
            {
                (Object.keys(foldersState.windows).length !== 0) && 
                (
                    <div className="sidebar-item-active-container">
                        <div></div>
                    </div>
                )
            }
            
        </div>
    );
}
export default FolderItem;
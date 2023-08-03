import { useRecoilState } from "recoil";
import { addWindow, changeDisplayState } from "../../recoil/atom/windowsAtom";
import { filesAtom } from "../../recoil/atom/design/filesAtom";
import { addFile,filesDataAtom } from "../../recoil/atom/data/filesModal";
import { useState } from "react";

const EditorItem = (props)=>{

    const [filesState,setFilesState] = useRecoilState(filesAtom);
    const [filesDataState,setFilesDataState] = useRecoilState(filesDataAtom);

    const [runningWin,setRunningWin] = useState(false);

    const handleClick = (e)=>{
        const displayConfig = filesState.newConfigs;
        const displayState = "DEFAULT";
        const contentType = "FILE";

        addFile("untitled.txt",{text:`const msg = 'Hello world!';`},setFilesDataState);

        addWindow("untitled.txt",{displayConfig,displayState,contentType},setFilesState);
    }

    const handleRunningWinClick=(e)=>{
        e.stopPropagation();
        console.log(e.target.innerText);
        changeDisplayState(e.target.innerText,"DEFAULT",setFilesState);
    }

    const handleRunningWinDisplay = () => {
        const running = [];
        running.push(
            <div key="new">Open File</div>
        );
        for(const key in filesState.windows){
            running.push(
                <div 
                    key={key} 
                    onClick={handleRunningWinClick}
                    className="running-item"
                >{key}</div>
            )
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
                title="Editor" 
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

            <img className="sidebar-item-icon" src = {require("../../assets/images/textEditorIcon.png")}></img>
            {/* <div className="sidebar-item-name">Edit</div> */}
            {
                (Object.keys(filesState.windows).length !== 0) && (<div className="sidebar-item-active-container">
                    <div></div>
                </div>)
            }
        </div>
    );
}
export default EditorItem;
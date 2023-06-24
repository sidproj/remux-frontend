import { useRecoilState } from "recoil";

import { addWindow } from "../../recoil/atom/windowsAtom";
import { foldersAtom } from "../../recoil/atom/design/foldersAtom";

const FolderItem = (props)=>{

    const [foldersState,setFoldersState] = useRecoilState(foldersAtom);


    const handleClick = (e)=>{
        const displayConfig = foldersState.newConfigs;
        const displayState = "DEFAULT";
        const contentType = "FOLDER";
        addWindow("Home",{displayConfig,displayState,contentType},setFoldersState);
    }

    const handleRunningWinDisplay = ()=>{
        const running = [];
        for(const key in foldersState.windows){
            running.push(
                <div key={key}>{key}</div>
            );
        }
        return running;
    }

    return (
        <div className='sidebar-item' onClick={handleClick}>

            <div className="sidebar-win-running">
                {
                    handleRunningWinDisplay()
                }
            </div>            

            <img className="sidebar-item-icon" src = {require("../../assets/images/folderIcon-light.png")}></img>
            <div className="sidebar-item-name">Folder</div>
            {
                (Object.keys(foldersState.windows).length !== 0) && (<div className="sidebar-item-active-container">
                    <div></div>
                </div>)
            }
            
        </div>
    );
}
export default FolderItem;
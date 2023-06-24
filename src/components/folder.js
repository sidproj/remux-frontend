import { useRecoilState } from "recoil";
import { addWindow } from "../recoil/atom/windowsAtom";
import { foldersAtom } from "../recoil/atom/design/foldersAtom";
import { addFolder, folderDataAtom } from "../recoil/atom/data/foldersModal";

const Folder = (props)=>{

    const [foldersState,setFoldersState] = useRecoilState(foldersAtom);
    const [foldersDataState,setFolderDataState] = useRecoilState(folderDataAtom);

    const handleContextMenu = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        props.setContextMenuConfig({top:e.pageY,left:e.pageX});
        props.setContextMenuType(1);
        props.setShowContextMenu(true);

    }

    const handleDoubleClick = (e)=>{
        const displayConfig = foldersState.newConfigs;
        const displayState = "DEFAULT";
        const contentType = "FOLDER"; //can be "FOLDER" "FILE" or "TERMINAL"

        //add folder data to folderData state
        if(!Object.keys(foldersDataState).includes(props.name)){
            const data = [
                {type:"FOLDER",name:"New Folder"},
                {type:"FILE",name:"data.txt"},
            ]
            addFolder(props.name,{children:data},setFolderDataState);
        }

        addWindow(props.name,{displayConfig,displayState,contentType},setFoldersState);
    }

    const style = {
        width:props.width
    }

    return(
        <div className='folder' onContextMenu={handleContextMenu} onDoubleClick={handleDoubleClick}>
            <img style={style} className='folder-icon' src={require("../assets/images/folderIcon-light.png")}></img>
            <div className="folder-name">{props.name}</div>
        </div>
    );
}

export default Folder;
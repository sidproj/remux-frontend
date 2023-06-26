import { useRecoilState } from "recoil";
import { addWindow } from "../recoil/atom/windowsAtom";
import { foldersAtom } from "../recoil/atom/design/foldersAtom";
import { addFolder, folderDataAtom } from "../recoil/atom/data/foldersModal";
import { useEffect } from "react";
import { contextMenuAtom } from "../recoil/atom/design/contextMenuAtom";

const Folder = (props)=>{

    const [foldersState,setFoldersState] = useRecoilState(foldersAtom);
    const [foldersDataState,setFolderDataState] = useRecoilState(folderDataAtom);

    const [contextMenu,setContextMenu] = useRecoilState(contextMenuAtom);

    const handleContextMenu = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        
        setContextMenu({
            coordinates:{
                top:e.pageY,
                left:e.pageX,
            },
            type: "FILE",
            path: props.data.path,
        });

    }

    const handleDoubleClick = (e)=>{
        
        const displayConfig = foldersState.newConfigs;
        const displayState = "DEFAULT";
        const contentType = "FOLDER"; //can be "FOLDER" "FILE" or "TERMINAL"

        //add folder data to folderData state
        if(!Object.keys(foldersDataState).includes(props.data.path)){
            addFolder( props.data.path,{ 
                children:[],
                data:props.data,
            },setFolderDataState);
        }

        addWindow(props.data.path,{displayConfig,displayState,contentType},setFoldersState);
    }

    const style = {
        width:props.width
    }

    const handleClick = (e)=>{
        e.stopPropagation();
        e.preventDefault();
    }

    return(
        <div className='folder' onClick={handleClick} onContextMenu={handleContextMenu} onDoubleClick={handleDoubleClick}>
            <img style={style} className='folder-icon' src={require("../assets/images/folderIcon-light.png")}></img>
            <div className="folder-name" title={props.name}>{
                props.name.length > 10 ? props.name.substring(0,10)+"..." : props.name
            }</div>
        </div>
    );
}

export default Folder;
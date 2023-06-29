import { useRecoilState, useRecoilStateLoadable } from "recoil";
import { addWindow } from "../recoil/atom/windowsAtom";
import { filesAtom } from "../recoil/atom/design/filesAtom";
import { addFile,filesDataAtom } from "../recoil/atom/data/filesModal";
import { contextMenuAtom } from "../recoil/atom/design/contextMenuAtom";

const File = (props)=>{

    const [filesState,setFilesState] = useRecoilState(filesAtom);
    const [filesDataState,setFilesDataState] = useRecoilState(filesDataAtom);

    const [contextMenu,setContextMenu] = useRecoilState(contextMenuAtom);

    const handleContextMenu = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        
        setContextMenu({
            coordinates:{
                top:e.pageY,
                left:e.pageX,
            },
            type:"FILE",
            isFile:true,
            path: props.data.path,
        });
    }

    const handleDoubleClick = (e)=>{
        const displayConfig = filesState.newConfigs;
        const displayState = "DEFAULT";
        const contentType = "FILE"; //can be "FOLDER" "FILE" or "TERMINAL"

        
        //add file data to filesData state
        if(!Object.keys(filesDataState).includes(props.name)){
            addFile(props.data.path,{},setFilesDataState);
        }

        //add filename and props to windows state for files
        addWindow(props.data.path,{displayConfig,displayState,contentType},setFilesState);

    }

    const style = {
        width:props.width
    }

    return(
        <div className='folder' onContextMenu={handleContextMenu} onDoubleClick={handleDoubleClick}>
            <img style={style} className='folder-icon' src={require("../assets/images/fileIcon.jpg")}></img>
            <div className="folder-name" title={props.name}>
                {
                    props.name.length > 10 ? props.name.substring(0,10)+"..." : props.name
                }
            </div>
        </div>
    );
}

export default File;
import { useRecoilState } from "recoil";
import { addWindow } from "../recoil/atom/windowsAtom";
import { filesAtom } from "../recoil/atom/design/filesAtom";
import { addFile,filesDataAtom } from "../recoil/atom/data/filesModal";

const File = (props)=>{

    const [filesState,setFilesState] = useRecoilState(filesAtom);
    const [filesDataState,setFilesDataState] = useRecoilState(filesDataAtom);

    const handleContextMenu = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        props.setContextMenuConfig({top:e.pageY,left:e.pageX});
        props.setContextMenuType(1);
        props.setShowContextMenu(true);

    }

    const handleDoubleClick = (e)=>{
        const displayConfig = filesState.newConfigs;
        const displayState = "DEFAULT";
        const contentType = "FILE"; //can be "FOLDER" "FILE" or "TERMINAL"

        
        //add file data to filesData state
        if(!Object.keys(filesDataState).includes(props.name)){
            addFile(props.name,{text:`const msg = 'Hello world!';`},setFilesDataState);
        }

        //add filename and props to windows state for files
        addWindow(props.name,{displayConfig,displayState,contentType},setFilesState);

    }

    const style = {
        width:props.width
    }

    return(
        <div className='folder' onContextMenu={handleContextMenu} onDoubleClick={handleDoubleClick}>
            <img style={style} className='folder-icon' src={require("../assets/images/fileIcon.jpg")}></img>
            <div className="folder-name">{props.name}</div>
        </div>
    );
}

export default File;
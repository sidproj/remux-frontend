import Folder from "../../folder";
import File from "../../files";
import "./folderExplorer.css";

import { useRecoilState } from "recoil";
import { updatedChildren,folderDataAtom } from "../../../recoil/atom/data/foldersModal";
import { useEffect } from "react";

import { socket } from "../../../socket/socket";
import { contextMenuAtom } from "../../../recoil/atom/design/contextMenuAtom";

const FolderExplorer = (props)=>{
    
    const [folderDataState,setFolderDataState] = useRecoilState(folderDataAtom);

    const [contextMenu,setContextMenu] = useRecoilState(contextMenuAtom);

    const style={
        width:"3.5em",
    };

    useEffect(()=>{
        socket.on("load_dir_response",(payload)=>{
            updatedChildren(payload.path,
                [
                    ...payload.data.FOLDERS,
                    ...payload.data.FILES,
                ],
                setFolderDataState);
        });
    },[]);

    useEffect(()=>{
        console.log(props.id);
        socket.emit("load_dir_request",{path:folderDataState[props.id].data.path});

    },[]);

    const handleContextMenu = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        
        setContextMenu({
            coordinates:{
                top:e.pageY,
                left:e.pageX,
            },
            type: "EXPLORER",
            path: props.id,
        });
    }

    const handleClick = ()=>{
        if(contextMenu) setContextMenu(null);
    }

    return (
        <div className="folder-explorer" onContextMenu={handleContextMenu} onClick={handleClick}>
            <div className="folder-explorer-navigation">
                <div className="folder-explorer-navigation-item">Home</div>
                <div className="folder-explorer-navigation-item">Desktop</div>
                <div className="folder-explorer-navigation-item">Download</div>
                <div className="folder-explorer-navigation-item">Music</div>
            </div>
            <div className="folder-explorer-content">
                {
                    folderDataState[props.id].children.map( child=>{
                        if(child.type == "FOLDER")
                        return (
                            <Folder 
                                key={child.name} 
                                width={style.width}
                                name={child.name}
                                data={child}
                            />
                            );
                            else return (
                                <File 
                                    key={child.name} 
                                    width={style.width} 
                                    name={child.name}
                                    data={child}
                                />
                                );
                    } )
                }
            </div>
        </div>
    );
}

export default FolderExplorer;
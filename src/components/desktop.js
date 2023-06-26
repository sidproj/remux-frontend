import { useEffect, useState,useRef } from 'react';

// components
import Folder from './folder';
import File from './files';
import DesktopContextMenu from './modals/contextMenus/desktopContextMenu';

// css 
import './desktop.css';
import './modals/contextMenus/contextMenu.css';
import FolderContextMenu from './modals/contextMenus/folderContextMenu';
import { useRecoilState } from 'recoil';
import WindowManager from './modals/windows/windowManager';
import Sidebar from './sidebar/sidebar';

import { filesListAtom } from '../recoil/atom/design/filesAtom';
import { foldersListAtom } from '../recoil/atom/design/foldersAtom';

import { socket } from '../socket/socket';
import { useNavigate } from 'react-router';
import { folderDataAtom,addFolder, updatedChildren } from '../recoil/atom/data/foldersModal';
import { contextMenuAtom } from '../recoil/atom/design/contextMenuAtom';

const Desktop = ()=>{

    const navigate = useNavigate();

    
    // states for contextmenu
    const [contextMenuConfig,setContextMenuConfig] = useState(null);
    // end for contextmenu

    const [contextMenu,setContextMenu] = useRecoilState(contextMenuAtom);


    const [folderDataState,setFolderDataState] = useRecoilState(folderDataAtom);

    const [desktopPath,setDesktopPath] = useState(null);
    const ref = useRef();
    ref.desktopPath = desktopPath;

    useEffect(()=>{
        if(!socket.connected){
            navigate("/login");
        }

        socket.on("disconnect",()=>{
            console.log("disconnected");
            navigate("/login");
        });

        socket.on("load_desktop_response",(payload)=>{
            const data = payload.data;
            setDesktopPath(data.path);
            
            if(!Object.keys(folderDataState).includes(data.path)){
                addFolder(data.path,{children:[],data:{
                    name:"Desktop",
                    path:data.path,
                    type:"FOLDER"
                }},setFolderDataState);
            }

            updatedChildren(data.path,[
                ...data.FOLDERS,
                ...data.FILES,
            ],
            setFolderDataState);
        });

        socket.on("load_dir_response",(payload)=>{
            updatedChildren(payload.path,[
                ...payload.data.FOLDERS,
                ...payload.data.FILES,
            ],setFolderDataState);
        });

        return ()=>{
            socket.off("load_desktop_response");
            socket.off("disconnect");
        }
    },[]);

    useEffect(()=>{
        socket.emit("load_desktop_request",{path:"desktop"});
    },[]);


    const handleContextMenu = (e)=>{
        e.preventDefault();
        // setContextMenuConfig({top:e.pageY,left:e.pageX});
        // setContextMenuType(0);
        setContextMenu({
            coordinates:{
                top:e.pageY,
                left:e.pageX,
            },
            type: "EXPLORER",
            path: ref.desktopPath,
        });
    }

    const handleContextMenuDisplay = ()=>{
        switch(contextMenu.type){
            case "EXPLORER" : return <DesktopContextMenu path={desktopPath} />;
            case "FILE" : return <FolderContextMenu />;
        }
    }

    const handleClick = (e)=>{
        if(contextMenu) setContextMenu(null);
    }

    return(
        <div className="desktop" onContextMenu={handleContextMenu} onClick={handleClick}>

            <div className="folders-container">
            {
                    folderDataState[desktopPath]?.children.map((child,index)=>{

                        if(child.type == "FOLDER")
                        return (
                            <Folder 
                                key={child.name} 
                                name={child.name}
                                data={child}
                               
                            />
                            );
                            else return (
                                <File 
                                    key={child.name}  
                                    name={child.name}
                                    data={child}
                                />
                            );
                    })
                }
                <WindowManager/>
                <Sidebar/>
            </div>
            {
                contextMenu && handleContextMenuDisplay()
            }
        </div>
    );
}

export default Desktop;
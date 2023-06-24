import { useEffect, useState } from 'react';

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

const Desktop = ()=>{

    const navigate = useNavigate();

    
    // states for contextmenu
    const [contextMenuConfig,setContextMenuConfig] = useState(null);
    const [showContextMenu,setShowContextMenu] = useState(false);
    const [contextMenuType,setContextMenuType] = useState(0);
    // end for contextmenu

    //recoil state for folder data
    const [folderList,setFolderList] = useRecoilState(foldersListAtom);
    //recoil state for file data
    const [fileList,setFileList] = useRecoilState(filesListAtom);

    useEffect(()=>{
        if(!socket.connected){
            navigate("/login");
        }

        socket.on("disconnect",()=>{
            console.log("disconnected");
            navigate("/login");
        });

        socket.on("iconListResponse",(data)=>{

            setFolderList(data.folders);
            setFileList(data.files);

        })

        socket.emit("iconListRequest",{path:"desktop"});

        return ()=>{
            socket.off("disconnect");
        }
    },[]);


    const handleContextMenu = (e)=>{
        e.preventDefault();
        setContextMenuConfig({top:e.pageY,left:e.pageX});
        setContextMenuType(0);
        setShowContextMenu(true);
    }

    const handleContextMenuDisplay = ()=>{
        switch(contextMenuType){
            case 0 : return <DesktopContextMenu config={contextMenuConfig} />;
            case 1 : return <FolderContextMenu config={contextMenuConfig} />;
        }
    }

    const handleClick = (e)=>{
        if(!showContextMenu) return;
        setShowContextMenu(false);
    }

    return(
        <div className="desktop" onContextMenu={handleContextMenu} onClick={handleClick}>
            {
                showContextMenu && handleContextMenuDisplay()
            }


            <div className="folders-container">

                {
                    folderList.map((folder,index)=>{
                        return <Folder 
                            key={index}
                            name={folder} 
                            setContextMenuConfig={setContextMenuConfig} 
                            setShowContextMenu={setShowContextMenu} 
                            setContextMenuType={setContextMenuType}
                        />
                    })
                }
                {
                    fileList.map((file,index)=>{
                        return <File 
                            key={index} 
                            name={file}
                            setContextMenuConfig={setContextMenuConfig}
                            setShowContextMenu={setShowContextMenu}
                            setContextMenuType={setContextMenuType}
                        />
                    })
                }
                <WindowManager/>
                <Sidebar/>
            </div>
        </div>
    );
}

export default Desktop;
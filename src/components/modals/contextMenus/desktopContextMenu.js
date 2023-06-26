import { useEffect } from 'react';
import { socket } from '../../../socket/socket';
import { useRecoilState } from 'recoil';
import { contextMenuAtom } from '../../../recoil/atom/design/contextMenuAtom';

const DesktopContextMenu = (props)=>{

    const [contextMenu,setContextMenu] = useRecoilState(contextMenuAtom);

    const handleCreateNewFolder = (isFile)=>{
        socket.emit("add_item_to_path_request",{
            path:props.path,
            isFile:isFile,
            name:isFile?"untitled.txt":"New Folder",
        });
    }

    const style = {
        top:contextMenu.coordinates.top,
        left:contextMenu.coordinates.left,
    };


    return (
        <div className="desktop-contextmodal" style={style}>
            <div className="contextmodal-items" onClick={()=>handleCreateNewFolder(false)}>New Folder</div>
            <hr/>
            <div className="contextmodal-items" onClick={()=>handleCreateNewFolder(true)}>New File</div>
        </div>
    );
}

export default DesktopContextMenu;
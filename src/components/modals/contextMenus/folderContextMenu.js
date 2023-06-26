import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { contextMenuAtom } from '../../../recoil/atom/design/contextMenuAtom';
import { socket } from '../../../socket/socket';

const FolderContextMenu = (props)=>{

    const [contextMenu,setContextMenu] = useRecoilState(contextMenuAtom);

    const style = {
        top:contextMenu.coordinates.top,
        left:contextMenu.coordinates.left,
    };
    
    const handleDelete = ()=>{
        console.log(contextMenu.path);
        socket.emit("remove_item_from_path_request",{
            path:contextMenu.path,
        })
    }

    return (
        <div className="desktop-contextmodal" style={style}>
            <div className="contextmodal-items">Open</div>
            <hr/>
            <div className="contextmodal-items">Rename</div>
            <hr/>
            <div className="contextmodal-items" onClick={handleDelete}>Delete</div>
            <hr/>
            <div className="contextmodal-items">Properties</div>
        </div>
    );
}

export default FolderContextMenu;
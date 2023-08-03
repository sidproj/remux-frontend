import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { addFile, filesDataAtom } from '../../../recoil/atom/data/filesModal';
import { addFolder, folderDataAtom } from '../../../recoil/atom/data/foldersModal';
import { contextMenuAtom } from '../../../recoil/atom/design/contextMenuAtom';
import { filesAtom } from '../../../recoil/atom/design/filesAtom';
import { foldersAtom } from '../../../recoil/atom/design/foldersAtom';
import { propertiesModalAtom } from '../../../recoil/atom/modals/propertiesModalAtom';
import { renameModalAtom } from '../../../recoil/atom/modals/renameModalAtom';
import { addWindow } from '../../../recoil/atom/windowsAtom';
import { socket } from '../../../socket/socket';

const FolderContextMenu = (props)=>{

    const [targetData,setTargetData] = useState(null);

    const [contextMenu,setContextMenu] = useRecoilState(contextMenuAtom);

    const [renameModal,setRenameModal] = useRecoilState(renameModalAtom);
    const [propertiesModal,setPropertiesModal] = useRecoilState(propertiesModalAtom);


    const [filesState,setFilesState] = useRecoilState(filesAtom);
    const [filesDataState,setFilesDataState] = useRecoilState(filesDataAtom);

    const [foldersState,setFoldersState] = useRecoilState(foldersAtom);
    const [folderDataState,setFolderDataState] = useRecoilState(folderDataAtom);

    const style = {
        top:contextMenu.coordinates.top,
        left:contextMenu.coordinates.left,
    };

    const handleOpen = ()=>{
        if(!Object.keys(filesDataState).includes(contextMenu.path)){
            if(contextMenu.isFile) addFile(contextMenu.path,{},setFilesDataState);
            addFolder(contextMenu.path,{
                children:[],
                data:{path:contextMenu.path,type:"FOLDER"}
            },setFolderDataState);
        }
        if(contextMenu.isFile){
            const displayConfig = filesState.newConfigs;
            const displayState = "DEFAULT";
            const contentType = "FILE";
            addWindow(contextMenu.path,{displayConfig,displayState,contentType},setFilesState);
        }
        else{
            const displayConfig = foldersState.newConfigs;
            const displayState = "DEFAULT";
            const contentType = "FOLDER";
            addWindow(contextMenu.path,{displayConfig,displayState,contentType},setFoldersState);
        }
        
    }

    const handleRename = ()=>{
        setRenameModal({targetData});
    }
    
    const handleDelete = ()=>{
        console.log(contextMenu.path);
        socket.emit("remove_item_from_path_request",{
            path:contextMenu.path,
        });
    }

    const handleProperties = ()=>{
        setPropertiesModal({targetData});
    }

    useEffect(()=>{
        const splitPath = contextMenu.path.split("/");
        const name = splitPath.pop()
        const newPath = splitPath.join("/");
        console.log(newPath,name);

        setTargetData({name:name,path:newPath});

    },[]);

    return (
        <div className="desktop-contextmodal" style={style}>
            <div className="contextmodal-items" onClick={handleOpen}>Open</div>
            <hr/>
            <div className="contextmodal-items" onClick={handleRename}>Rename</div>
            <hr/>
            <div className="contextmodal-items" onClick={handleDelete}>Delete</div>
            <hr/>
            <div className="contextmodal-items" onClick={handleProperties}>Properties</div>
        </div>
    );
}

export default FolderContextMenu;
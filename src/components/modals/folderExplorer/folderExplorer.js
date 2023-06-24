import Folder from "../../folder";
import File from "../../files";
import "./folderExplorer.css";

import { useRecoilState } from "recoil";
import { updatedChildren,folderDataAtom } from "../../../recoil/atom/data/foldersModal";
import { useEffect } from "react";

const FolderExplorer = (props)=>{
    
    const [folderDataState,setFolderDataState] = useRecoilState(folderDataAtom);

    const style={
        width:"3.5em",
    };

    useEffect(()=>{
        const newchildren = [...folderDataState[props.id].children,{type:"FOLDER",name:"Test"}];
        updatedChildren(props.id,newchildren,setFolderDataState);
    },[]);

    return (
        <div className="folder-explorer">
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
                            <Folder key={child.name} width={style.width} name={child.name}/>
                            );
                            else return (
                                <File key={child.name} width={style.width} name={child.name}/>
                                );
                    } )
                }
            </div>
        </div>
    );
}

export default FolderExplorer;
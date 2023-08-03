import { useRecoilState, useRecoilStateLoadable } from "recoil";
import { addWindow } from "../recoil/atom/windowsAtom";
import { filesAtom } from "../recoil/atom/design/filesAtom";
import { addFile,filesDataAtom } from "../recoil/atom/data/filesModal";
import { contextMenuAtom } from "../recoil/atom/design/contextMenuAtom";
import { useEffect, useRef, useState } from "react";

import pdfIcon from "../assets/images/pdfIcon.png";
import fileIcon from "../assets/images/fileIcon.jpg";
import imageIcon from "../assets/images/imageIcon.png";
import audioIcon from "../assets/images/audioIcon.png";
import videoIcon from "../assets/images/videoIcon.png";

const File = (props)=>{

    const [filesState,setFilesState] = useRecoilState(filesAtom);
    const [filesDataState,setFilesDataState] = useRecoilState(filesDataAtom);

    const [contextMenu,setContextMenu] = useRecoilState(contextMenuAtom);
    const [fileType,setFileType] = useState("FILE");
    const ref = useRef();
    ref.fileType = fileType;

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
        const contentType = ref.fileType; //can be "FOLDER" "FILE" or "TERMINAL"

        console.log(contentType);
        
        if(ref.fileType == "FILE"){
            //add file data to filesData state
            if(!Object.keys(filesDataState).includes(props.name)){
                addFile(props.data.path,{},setFilesDataState);
            }
        }

        //add filename and props to windows state for files
        addWindow(props.data.path,{displayConfig,displayState,contentType},setFilesState);

    }

    const handleIconSelection = ()=>{
        if(ref.fileType == "PDF") return pdfIcon
        if(ref.fileType == "IMG") return imageIcon;
        if(ref.fileType == 'AUDIO') return audioIcon;
        if(ref.fileType == "VIDEO") return videoIcon;
        else return fileIcon;
    }

    const handleSettingFileType = (ext)=>{
        const imageExts = ["apng","avif","gif","jpg","jpeg","jfif","pjpeg","pjp","png","svg","webp"];
        const audioExts = ["aac","wma","wav","mp3","flac","m4a"];
        const videoExts = ["mp4","3gp","mvk"];


        if( ext.toLowerCase() == "pdf"){
            setFileType("PDF");
        }
        else if( imageExts.includes(ext.toLowerCase()) ){
            setFileType("IMG");
        }
        else if( audioExts.includes(ext.toLowerCase())){
            setFileType("AUDIO");
        }
        else if( videoExts.includes(ext.toLowerCase())){
            setFileType("VIDEO");
        }
    }

    useEffect(()=>{
        const ext = props.data.name.split(".").pop();
        handleSettingFileType(ext);
    },[]);

    const style = {
        width:props.width
    }

    return(
        <div className='folder' onContextMenu={handleContextMenu} onDoubleClick={handleDoubleClick}>
            <img style={style} className='folder-icon' src={handleIconSelection()}></img>
            <div className="folder-name" title={props.name}>
                {
                    props.name.length > 10 ? props.name.substring(0,10)+"..." : props.name
                }
            </div>
        </div>
    );
}

export default File;
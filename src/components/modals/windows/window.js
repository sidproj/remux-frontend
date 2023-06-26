import { useEffect, useState } from "react";

import "./window.css";
import { useRecoilState } from "recoil";

import Editor from "../textEditor/editor";
import Terminal from "../terminal/terminal";
import FolderExplorer from "../folderExplorer/folderExplorer";

//state managment atoms
import { changeDisplayState,removeWindow,windowsAtom } from "../../../recoil/atom/windowsAtom";
import { filesAtom } from "../../../recoil/atom/design/filesAtom";
import { foldersAtom } from "../../../recoil/atom/design/foldersAtom";
import { terminalsAtom } from "../../../recoil/atom/design/terminalAtom";

import { folderDataAtom } from "../../../recoil/atom/data/foldersModal";


const Window = (props)=>{

    const [code,setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);

    const [windowsState,setWindowsState] = useRecoilState(windowsAtom);
    
    const [foldersState,setFoldersState] = useRecoilState(foldersAtom);
    const [filesState,setFilesState] = useRecoilState(filesAtom);
    const [terminalsState,setTerminalsState] = useRecoilState(terminalsAtom);

    const [folderDataState,setFolderDataState] = useRecoilState(folderDataAtom);

    const defaultStyle = {
        top:props.displayConfig.top,
        left:props.displayConfig.left,
        minHeight:props.displayConfig.minHeight,
        minWidth:props.displayConfig.minWidth,
        height:props.displayConfig.height,
        width:props.displayConfig.width,
    };


    const maxStyle = {
        top:0,
        left:0,
        height:"100%",
        width:"100%",
    }

    const minStyle = {
        visibility: "hidden"
    }

    const handleStyle = ()=>{
        
        switch(props.displayState){
            case "DEFAULT": return defaultStyle;
            case "MAX": return maxStyle;
            case "MIN": return minStyle;
        }
    }

    const handleDisplayStateToUP = (e)=>{
        switch(props.contentType){
            case "FILE":changeDisplayStateToUP(setFilesState);break;
            case "FOLDER": changeDisplayStateToUP(setFoldersState);break;
            case "TERMINAL": changeDisplayStateToUP(setTerminalsState);break;
        }
    }

    const changeDisplayStateToUP = (setWindowsState)=>{
        if(props.displayState == "MIN")
        changeDisplayState(props.id,"DEFAULT",setWindowsState);
        else changeDisplayState(props.id,"MAX",setWindowsState);
    }

    const handleDisplayStateToDown = (e)=>{
        switch(props.contentType){
            case "FILE":changeDisplayStateToDown(setFilesState);break;
            case "FOLDER": changeDisplayStateToDown(setFoldersState);break;
            case "TERMINAL": changeDisplayStateToDown(setTerminalsState);break;
        }
    }

    const changeDisplayStateToDown = (setWindowsState)=>{
        if(props.displayState == "MAX")
        changeDisplayState(props.id,"DEFAULT",setWindowsState);
        else changeDisplayState(props.id,"MIN",setWindowsState);
    }

    //close any window
    const handleClose = (e) =>{
        switch(props.contentType){
            case "FILE":removeWindow(props.id,setFilesState);break;
            case "FOLDER": removeWindow(props.id,setFoldersState);break;
            case "TERMINAL": removeWindow(props.id,setTerminalsState);break;
        }
    }

    const handleClick = ()=>{
        const divA = document.getElementById(props.id);

        const parent = divA.parentElement;

        parent.removeChild(divA);
        parent.appendChild(divA);
    }

    const handleEditorClick = (e)=>{
        e.stopPropagation();
    }

    const handleContent = ()=>{
        switch(props.contentType){
            case "FOLDER" :
                return <FolderExplorer id={props.id} displayState={props.displayState}/>;
            case "FILE" : return <Editor id={props.id} />;
            case "TERMINAL" : return <Terminal id={props.id} displayState={props.displayState}/>;
        }
    }

    return (
        <div className="folder-explorer-window" 
            style={handleStyle()}
            onClick={handleClick}
            id={props.id}
            key={props.id}
            onContextMenu={(e)=>{e.stopPropagation();e.preventDefault();}}
        >
            <div className="window-header">
                <div className="window-display-ctrl">
                    <div className="close" onClick={handleClose}></div>
                    <div className="minimize" onClick={handleDisplayStateToDown}></div>
                    <div className="maximize" onClick={handleDisplayStateToUP}></div>
                </div>
                <div style={{color:"white"}}>{folderDataState[props.id].data.name}</div>
            </div>
            {handleContent()}
        </div>

        
    );
}

export default Window;
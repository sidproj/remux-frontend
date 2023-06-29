import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { renameModalAtom } from "../../../recoil/atom/modals/renameModalAtom";
import { socket } from "../../../socket/socket";

import "./modals.css"

const RenameModal = ()=>{    

    const [renameModal,setRenameModal] = useRecoilState(renameModalAtom);
    const [inputClass,setInputClass] = useState("modal-input");
    const [newName,setNewName] = useState("");

    const handleSave = ()=>{
        if( newName.trim().length == 0){
            setInputClass("modal-input modal-input-error");
            return;
        }
        socket.emit("rename_item_request",{
            newName:newName,
            oldName:renameModal.targetData.name,
            path:renameModal.targetData.path
        });
        setRenameModal(false);
    }

    const handleInputChange = (e)=>{
        setInputClass("modal-input");
        setNewName(e.target.value);
    }


    return (
        <div className="screen-overlay" onContextMenu={(e)=>{e.preventDefault();e.stopPropagation();}}>
            <div className="modal-container">
                <div className="modal-header">Rename</div>
                <input 
                    className={inputClass}
                    placeholder="new name"
                    onChange={handleInputChange}
                />
                <div className="modal-actions">
                    <div className="modal-confirm modal-btn" onClick={handleSave}>Save</div>
                    <div 
                        className="modal-close modal-btn" 
                        onClick={()=>setRenameModal(false)}>Close</div>
                </div>
            </div>
        </div>
    );
}

export default RenameModal;
import { useNavigate } from "react-router-dom";
import { socket } from "../../../socket/socket"
import { settingsModalAtom } from "../../../recoil/atom/modals/settingsModalAtom";
import { useRecoilState } from "recoil";

const SettingsModal = () =>{

    const navigate = useNavigate();
    const [settingsModal,setSettingsModal] = useRecoilState(settingsModalAtom);


    const handleLogout = ()=>{
        setSettingsModal(false);
        socket.emit("logout_request",{});
        socket.disconnect();
        navigate("/login");
    }

    const handleClose = ()=>{
        setSettingsModal(false);
    }

    return (
        <div className="screen-overlay" onContextMenu={(e)=>{e.preventDefault();e.stopPropagation();}}>
            <div className="modal-container">
                <div className="modal-header"> Log Out</div>
                <div className="properties-container">
                    Do you want to log out?
                </div>
                <div className="modal-actions">
                    <div className="modal-bton modal-confirm" onClick={handleLogout}>Logout</div>
                    <div className="modal-btn modal-close" onClick={handleClose}>Close</div>
                </div>
            </div>
        </div>
    );
}

export default SettingsModal;
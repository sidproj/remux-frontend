
import { useNavigate } from "react-router-dom";
import { socket } from "../../../socket/socket"

const SettingsModal = () =>{

    const navigate = useNavigate();

    const handleLogout = ()=>{
        socket.emit("logout_request",{});
        socket.disconnect();
        navigate("/login");
    }

    return (
        <div className="screen-overlay" onContextMenu={(e)=>{e.preventDefault();e.stopPropagation();}}>
            <div className="modal-container">
                <div className="modal-header"> Settings</div>
                <div className="properties-container">
                    <div className="property-row">
                        <div onClick={handleLogout}>Logout</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsModal;
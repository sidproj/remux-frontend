import { propertiesModalAtom } from "../../../recoil/atom/modals/propertiesModalAtom";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { socket } from "../../../socket/socket";

const PropertiesModal = ()=>{
    
    const [propertiesModal,setPropertiesModal] = useRecoilState(propertiesModalAtom);
    const [properties,setProperties] = useState(null);

    const handleClose = ()=>{
        setPropertiesModal(false);
    }

    useEffect(()=>{
        const name = propertiesModal.targetData.name;
        const parent = propertiesModal.targetData.path;

        socket.emit("properties_of_path_request",{name,parent});

        console.log({name,parent});
    },[]);

    useEffect(()=>{
        socket.on("properties_of_path_response",(payload)=>{
            console.log(payload);
            setProperties(payload.properties);
        });

        return ()=>{
            socket.off("properties_of_path_response");
        }
    })

    return (
        <div className="screen-overlay" onContextMenu={(e)=>{e.preventDefault();e.stopPropagation();}}>
            <div className="modal-container">
                <div className="modal-header"> Propreties </div>
                <div className="properties-container">
                    
                        {
                            properties && Object.keys(properties).map((key)=>{
                                return( 
                                    <div className="property-row">
                                        <div>{key}</div>
                                        <div>{properties[key]}</div>
                                    </div>
                                )
                            })
                        }
                </div>
                <div className="modal-actions">
                    <div className="modal-btn modal-close only-btn" onClick={handleClose}>Close</div>
                </div>
            </div>
        </div>
    );
}

export default PropertiesModal;
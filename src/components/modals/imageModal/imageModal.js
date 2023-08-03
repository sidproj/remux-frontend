import { useEffect, useState,useRef } from "react";
import { socket } from "../../../socket/socket";
import { Buffer } from "buffer";

const ImageModal = (props)=>{

    const [imgURL,setImgURL] = useState();
    const ref = useRef();
    ref.imgURL = imgURL;
    
    useEffect(()=>{

        socket.on("non_text_file_response",(payload)=>{
            if(payload.path == props.id){
                console.log(payload);
                
                const ext = props.id.split(".").pop();

                const buffer = Buffer.from(payload.buffer);

                const blob = new Blob([buffer],{type:`image/${ext}`});

                const data = URL.createObjectURL(blob);
                console.log(blob,data);
                setImgURL(data);
            }
        });

        return(()=>{
            socket.off("non_text_file_response");
        });
    })

    useEffect(()=>{

        socket.emit("non_text_file_request",{type:"IMG",path:props.id});
        console.log(props);
    },[]);

    return (
        <div className="img-container">
            {
                ref.imgURL && <img src={ref.imgURL}/>
            }
        </div>
    )
}

export default ImageModal;
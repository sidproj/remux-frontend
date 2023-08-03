import { useEffect, useState, useRef } from "react"
import { socket } from "../../../socket/socket";
import {Buffer} from 'buffer';

const VideoModal = (props)=>{
    const [videoURL,setVideoURL] = useState();
    const [ext,setExt] = useState();
    const ref = useRef();
    
    ref.videoURL = videoURL;
    ref.ext = ext;

    useEffect(()=>{
        socket.on("non_text_file_response",(payload)=>{
            if(payload.path == props.id){
                console.log(payload);

                const ext = props.id.split(".").pop();
                const buffer = Buffer.from(payload.buffer);
                const blob = new Blob([buffer],{type:`video/${ext}`});

                const data = URL.createObjectURL(blob);
                console.log(data);
                setVideoURL(data);
                setExt(ext);
            }
        });

        return(()=>{
            socket.off("non_text_file_response");
        });

    },[]);

    useEffect(()=>{
        socket.emit("non_text_file_request",{type:"video",path:props.id});
        console.log(props);
    },[]);

    return(
        <div className="video-container">
            <video controls={true} autoPlay={true}>
                <source src={ref.videoURL} type={`video/${ref.ext}`}/>
            </video>
        </div>
    );

}

export default VideoModal;
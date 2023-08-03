import { useEffect, useRef, useState } from "react";
import { socket } from "../../../socket/socket";
import { Buffer } from 'buffer';

const AudioModal = (props)=>{

    const [audioURL,setAudioURL] = useState();
    const [ext,setExt] = useState();
    const ref = useRef();

    ref.audioURL = audioURL;
    ref.ext = ext;

    useEffect(()=>{
        socket.on("non_text_file_response",(payload)=>{
            if(payload.path == props.id){
                console.log(payload);

                const ext = props.id.split(".").pop();
                const buffer = Buffer.from(payload.buffer);
                const blob = new Blob([buffer],{type:`audio/${ext}`});

                const data = URL.createObjectURL(blob);
                console.log(data);
                setAudioURL(data);
                setExt(ext);
            }
        });

        return(()=>{
            socket.off("non_text_file_response");
        });

    },[]);

    useEffect(()=>{
        socket.emit("non_text_file_request",{type:"audio",path:props.id});
        console.log(props);
    },[]);

    return (
        <div className="audio-container">
            <audio controls={true} autoPlay={true}>
                <source src={ref.audioURL} type={`audio/${ref.ext}`}/>
            </audio>
        </div>
    );

}

export default AudioModal;
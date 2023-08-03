import { useEffect, useRef, useState } from "react";
import { Viewer } from "@react-pdf-viewer/core";
import { socket } from "../../../socket/socket";
import { Document, Page, pdfjs } from 'react-pdf';
import { Buffer } from "buffer";


// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';


const PdfModal = (props)=>{

    useEffect(() => { 
        console.log(props);
        pdfjs.GlobalWorkerOptions.workerSrc =`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    },[]);

    const [numPages,setNumPages] = useState(0);
    const [pdfURL,setPdfURL] = useState(null);

    const ref = useRef();
    ref.numPages = numPages;
    ref.pdfURL = pdfURL;

    useEffect(()=>{
        socket.emit("non_text_file_request",{type:"PDF",path:props.id});
        console.log(ref.numPages);
    },[numPages]);

    useEffect(()=>{
        
        socket.on("non_text_file_response",(payload)=>{
            if(payload.path == props.id){
                console.log(payload);
                const buffer = Buffer.from(payload.buffer);

                const blob = new Blob([buffer],{type:"application/pdf"});

                const data = URL.createObjectURL(blob);
                console.log(blob,data);
                setPdfURL(data);
            }
        })

        return(()=>{
            socket.off("non_text_file_response");
        });

    },[]);

    return (
        <div
        style={{
            border: '1px solid rgba(0, 0, 0, 0.3)',
        }}
    >
        {
            ref.pdfURL && <Viewer fileUrl={ref.pdfURL} />
        }
    </div>
    )
}

export default PdfModal;
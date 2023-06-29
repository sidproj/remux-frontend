//editor
import CodeMirror from '@uiw/react-codemirror';
import { tokyoNight, tokyoNightInit } from '@uiw/codemirror-theme-tokyo-night';
import { javascript } from '@codemirror/lang-javascript';
import { java } from "@codemirror/lang-java"

import { useEffect, useRef, useState } from 'react';

import { filesDataAtom,setText,addFile } from '../../../recoil/atom/data/filesModal';
import { useRecoilState } from 'recoil';
import { socket } from '../../../socket/socket';

const Editor = (props)=>{

    const [code,setCode] = useState();
    const codeRef = useRef();
    codeRef.code = code;
    const [filesDataState,setFilesDataState] = useRecoilState(filesDataAtom);
    const ref = useRef();
    ref.fileData = filesDataState[props.id];

    
    const handleEditorClick = (e)=>{
        e.stopPropagation();
    }

    const onSave = (e)=>{
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();

            //set state in file data state
            console.log(ref.fileData);

            socket.emit("set_data_to_file_request",{path:props.id,data:ref.fileData.text});

          }
    }

    useEffect(()=>{

        document.getElementById("editor").addEventListener('keydown',onSave);

        //when component unmounts
        // return () => {
        //     document.getElementById("editor").removeEventListener('keydown',onSave);
        // }

    },[]);

    useEffect(()=>{
        socket.on("get_data_from_file_response",(payload)=>{
            console.log(payload);
            setText(payload.data.path,payload.data.data,setFilesDataState);
        })

    },[]);

    useEffect(()=>{
        socket.emit("get_data_from_file_request",{path:props.id});
    },[]);

    const handleCodeChange = (code)=>{
        setText(props.id,code,setFilesDataState);
    }

    return(
        <div id="editor" onClick={handleEditorClick} className="editor-space">
                <CodeMirror className='codemirror'
                    
                    value={filesDataState[props.id].text}
                    onChange={handleCodeChange}
                    extensions={[javascript({ jsx: true }),java()]}
                    theme={tokyoNightInit({
                        settings: {
                          caret: '#c6c6c6',
                          fontFamily: 'monospace',
                        },
                      })}
                />
            </div>
    );
}

export default Editor;
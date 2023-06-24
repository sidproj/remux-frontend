//editor
import CodeMirror from '@uiw/react-codemirror';
import { tokyoNight, tokyoNightInit } from '@uiw/codemirror-theme-tokyo-night';
import { javascript } from '@codemirror/lang-javascript';
import { java } from "@codemirror/lang-java"

import { useEffect, useRef, useState } from 'react';

import { filesDataAtom,setText } from '../../../recoil/atom/data/filesModal';
import { useRecoilState } from 'recoil';

const Editor = (props)=>{

    const [code,setCode] = useState();
    const codeRef = useRef();
    codeRef.code = code;
    const [filesDataState,setFilesDataState] = useRecoilState(filesDataAtom);

    
    const handleEditorClick = (e)=>{
        e.stopPropagation();
    }

    const onSave = (e)=>{
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();

            //set state in file data state
            setText(props.id,codeRef.code,setFilesDataState);
          }
    }

    useEffect(()=>{
        
        const text = filesDataState[props.id].text;

        setCode(text);

        document.getElementById("editor").addEventListener('keydown',onSave);

        //when component unmounts
        // return () => {
        //     document.getElementById("editor").removeEventListener('keydown',onSave);
        // }

    },[]);

    const handleCodeChange = (code)=>{
        setCode(code);
    }

    return(
        <div id="editor" onClick={handleEditorClick} className="editor-space">
                <CodeMirror className='codemirror'
                    
                    value={code}
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
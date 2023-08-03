import { useRecoilState } from "recoil";
import Window from "./window";

// state managment atoms
import { filesAtom } from "../../../recoil/atom/design/filesAtom";
import { foldersAtom } from "../../../recoil/atom/design/foldersAtom";
import { terminalsAtom } from "../../../recoil/atom/design/terminalAtom";
import { useEffect } from "react";

const WindowManager = (props)=>{

    const [foldersState,setFoldersState] = useRecoilState(foldersAtom);
    const [filesState,setFilesState] = useRecoilState(filesAtom);
    const [terminalsState,setTerminalsState] = useRecoilState(terminalsAtom);

    // useEffect(()=>{
    //     console.log(foldersState);
    // });

    const handleDisplay = ()=>{
        const windows = [];

        //add folder expolorers in windows
        for(const key in foldersState.windows){    

            // if(foldersState.windows[key].displayState != "MIN"){
                
                const displayConfig = foldersState.windows[key].displayConfig;
                const displayState = foldersState.windows[key].displayState;

                windows.push(
                    <Window 
                        id={key}
                        key={key} 
                        displayConfig={displayConfig} 
                        displayState={displayState} 
                        contentType="FOLDER" 
                    />
                );
            // }
        }

        //add opened files in windows
        for(const key in filesState.windows){

            // if(filesState.windows[key].displayState != "MIN"){
                
                const displayConfig = filesState.windows[key].displayConfig;
                const displayState = filesState.windows[key].displayState;
                const children = filesState.windows[key].children;
                const prev = filesState.windows[key].prev;
                const next = filesState.windows[key].next;

                windows.push(
                    <Window
                        id={key} 
                        key={key} 
                        displayConfig={displayConfig} 
                        displayState={displayState} 
                        children={children}
                        prev={prev}
                        next={next}
                        contentType={filesState.windows[key].contentType}
                    />
                );
            // }
        }

        //add opened terminals in windows
        for(const key in terminalsState.windows){

            // if(terminalsState.windows[key].displayState != "MIN"){

                const displayConfig = terminalsState.windows[key].displayConfig;
                const displayState = terminalsState.windows[key].displayState;
                const history = terminalsState.windows[key].history;
                const currentPath = terminalsState.windows[key].currentPath;
                const currentUser = terminalsState.windows[key].currentUser;

                windows.push(
                    <Window 
                        id={key} 
                        key={key}
                        displayConfig={displayConfig} 
                        displayState={displayState} 
                        history={history}
                        currentPath={currentPath}
                        currentUser={currentUser}
                        contentType="TERMINAL"
                    />
                );
            // }
        }

        return windows;
    }

    return(
        <>
        {
            handleDisplay()
        }
        </>
    );

}

export default WindowManager;
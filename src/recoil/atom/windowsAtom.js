import {atom} from "recoil";

export const windowsAtom = atom({
    key:"windowsState",
    default:{
        newConfigs:{
            top:200,
            left:300,
            minHeight:"18em",
            height:"18em",
            minWidth:"20em",
            width:"20em",
        },
        windows:{},
    },
});

//function to add window
export const addWindow = (newId,newData,setState)=>{
    setState( (oldState)=>{
        //adding new property to windows
        const windows = {...oldState.windows};
        windows[newId] = newData;

        //change newConfigs
        const nConfigs ={...oldState.newConfigs};
        nConfigs.top += 20;
        nConfigs.left +=20;

        return {
            ...oldState,
            windows:{ 
               ...windows,
            },
            newConfigs:nConfigs,
        };
    });
}

export const removeWindow = (id,setState)=>{
    setState((oldState)=>{
        const {windows:{ [id]:value , ...windows} } = oldState;
        return {
            ...oldState,
            windows:{
                ...windows
            }
        };
    })
}

export const changeDisplayState = (id,displayState,setState)=>{
    setState((oldState)=>{

        return {
            ...oldState,
            windows:{
                ...oldState.windows,
                [id]:{
                    ...oldState.windows[id],
                    displayState:displayState,
                }
            }
        }
    });
}
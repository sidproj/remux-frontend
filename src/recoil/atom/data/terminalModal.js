import { atom } from "recoil";

export const terminalsDataAtom = atom({
    key:"terminalsData",
    default:{},
});

export const addCommandToHistory = (id,command,setState)=>{
    setState((oldState)=>{
        return{
            ...oldState,
            [id]:{
                ...oldState[id],
                history:[
                    ...oldState[id].history,
                    command,
                ]
            }
        }
    });
}

export const addTerminal = (id,setState)=>{
    setState((oldState)=>{
        return {
            ...oldState,
            [id]:{
                history:[],
            }
        }
    });
}

export const removeTerminal = (id,setState)=>{
    setState((oldState)=>{
        const filter = Object.assign({},oldState);
        delete filter[id];
        return {
            ...filter,
        }
    });
}
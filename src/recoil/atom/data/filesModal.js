import { atom } from "recoil";

export const filesDataAtom = atom ({
    key:"filesData",
    default:{},
});

export const setText = (id,text,setState)=>{
    setState(oldState=>{
        return {
            ...oldState,
            [id]:{
                ...oldState[id],
                text:text
            }
        }
    });
}

export const addFile = (id,data,setState)=>{
    setState(oldState=>{
        return {
            ...oldState,
            [id]:data,
        }
    })
}
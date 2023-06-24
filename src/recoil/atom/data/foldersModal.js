import { atom } from "recoil";

export const folderDataAtom = atom({
    key:"folderData",
    default:{},
});

export const addFolder = (id,data,setState)=>{
    setState(oldState=>{
        return {
            ...oldState,
            [id]:data,
        }
    });
}

export const updatedChildren = (id,updatedChildren,setState)=>{
    setState(oldState=>{
        return {
            ...oldState,
            [id]:{
                ...oldState[id],
                children:updatedChildren,
            }
        }
    })
}
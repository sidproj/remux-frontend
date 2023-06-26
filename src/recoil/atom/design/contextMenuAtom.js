import {atom} from "recoil";

/*
schema:-
    {
        coordinates:{
            top: number,
            left: number,
        },
        type: "EXPLORER" ||  "FILE" ,
        path: string
    }

 */
export const contextMenuAtom = atom({
    key:"ContextMenu",
    default:{},
});


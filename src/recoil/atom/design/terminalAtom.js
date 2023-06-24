import { atom } from "recoil";

/*
schema: 
{
    newConfigs:{
        top:200,
        left:300,
        minHeight:"18em",
        height:"18em",
        minWidth:"20em",
        width:"20em"
    },
    windows:{
        displayState: "MAX" || "MIN" || "DEFAULT",
        displayConfig: :{
            top:200,
            left:300,
            minHeight:"18em",
            height:"18em",
            minWidth:"20em",
            width:"20em",
        },
        history:[],
        currentPath:"",
        currentUser:"",
    }
}
*/

export const terminalsAtom = atom({
    key:"terminalsState",
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
})
import {atom} from 'recoil';

/*
schema: [ String ]
*/ 

export const filesListAtom = atom({
    key:"filesListState",
    default:[
        "music.txt",
        "script.py",
    ],
});


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
        text:"",
    }
}
*/

export const filesAtom = atom ({
    key:"filesState",
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
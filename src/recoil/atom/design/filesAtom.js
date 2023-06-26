import {atom} from 'recoil';
/*

schema: [ 
    {
        'path':String,
        'name':String,
    }
]

*/ 

export const filesListAtom = atom({
    key:"filesListState",
    default:[
        {
            'path':"Desktop",
            'name':"music.txt",
            'type':"FILE",
        },
        {
            'path':"Desktop",
            'name':"script.py",
            'type':"FILE",
        },
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
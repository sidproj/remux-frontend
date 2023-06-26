import { atom } from "recoil";

/*

schema: [ 
    {
        'path':String,
        'name':String,
    }
]

*/ 

export const foldersListAtom = atom({
    key:"folderListState",
    default:[
        {
            'path':"Desktop",
            'name':"Games",
            'type':"FOLDER",
        },
        {
            'path':"Desktop",
            'name':"Daiict",
            'type':"FOLDER",
        },
        {
            'path':"Desktop",
            'name':"Programes",
            'type':"FOLDER",
        }
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
        children:[],
        prev: ["path"],
        next: ["path"],
    }
}
*/

export const foldersAtom = atom ({
    key:"foldersState",
    default:{ 
        newConfigs:{
            top:100,
            left:200,
            minHeight:"35em",
            height:"35em",
            minWidth:"45em",
            width:"45em",
        },
        windows:{},
    },
})
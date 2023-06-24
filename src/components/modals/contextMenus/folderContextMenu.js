import { useEffect } from 'react';

const FolderContextMenu = (props)=>{
    const style = {
        top:props.config.top,
        left:props.config.left,
    };
    return (
        <div className="desktop-contextmodal" style={style}>
            <div className="contextmodal-items">Open</div>
            <hr/>
            <div className="contextmodal-items">Rename</div>
            <hr/>
            <div className="contextmodal-items">Delete</div>
            <hr/>
            <div className="contextmodal-items">Properties</div>
        </div>
    );
}

export default FolderContextMenu;
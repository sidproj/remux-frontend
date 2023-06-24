import { useEffect } from 'react';

const DesktopContextMenu = (props)=>{
    const style = {
        top:props.config.top,
        left:props.config.left,
    };
    return (
        <div className="desktop-contextmodal" style={style}>
            <div className="contextmodal-items">New Folder</div>
            <hr/>
            <div className="contextmodal-items">New Folder</div>
            <hr/>
            <div className="contextmodal-items">New Folder</div>
            <hr/>
            <div className="contextmodal-items">New Folder</div>
        </div>
    );
}

export default DesktopContextMenu;
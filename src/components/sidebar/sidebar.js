import { useRecoilState } from 'recoil';
import './sidebar.css'
import EditorItem from './editorItem';
import FolderItem from './folderItem';
import TerminalItem from './terminalItem';
import SetingsItem from './settingsItem';

const Sidebar = ()=>{

    return (
        <div className="sidebar">
            <TerminalItem/>
            <FolderItem/>
            <EditorItem/>
            <SetingsItem/>
        </div>
    );
}

export default Sidebar;
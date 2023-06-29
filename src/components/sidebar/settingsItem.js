import { useRecoilState } from "recoil";
import { addWindow } from "../../recoil/atom/windowsAtom";
import { filesAtom } from "../../recoil/atom/design/filesAtom";
import { addFile,filesDataAtom } from "../../recoil/atom/data/filesModal";

const SetingsItem = (props)=>{

    const [filesState,setFilesState] = useRecoilState(filesAtom);
    const [filesDataState,setFilesDataState] = useRecoilState(filesDataAtom);

    const handleClick = (e)=>{
        const displayConfig = filesState.newConfigs;
        const displayState = "DEFAULT";
        const contentType = "FILE";

        addFile("untitled.txt",{text:`const msg = 'Hello world!';`},setFilesDataState);

        addWindow("untitled.txt",{displayConfig,displayState,contentType},setFilesState);
    }

    const handleRunningWinDisplay = () => {
        const running = [];
        for(const key in filesState.windows){
            running.push(
                <div key={key}>{key}</div>
            )
        }
    }

    return (
        <div className='sidebar-item' title="Settings" onClick={handleClick}>

            <div className="sidebar-win-running">
                {
                    handleRunningWinDisplay()
                }
            </div>

            <img className="sidebar-item-icon" src = {require("../../assets/images/settingIcon.png")}></img>
            {/* <div className="sidebar-item-name">Settings</div> */}
            {
                (Object.keys(filesState.windows).length !== 0) && (<div className="sidebar-item-active-container">
                    <div></div>
                </div>)
            }
        </div>
    );
}
export default SetingsItem;
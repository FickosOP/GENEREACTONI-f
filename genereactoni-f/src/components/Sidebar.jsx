import { useState } from "react";
import Picture from "./Picture";

import comp from "../assets/images/component.svg";
import page from "../assets/images/page.svg";
import serv from "../assets/images/service.svg";
import util from "../assets/images/util.svg";

const pictureList = [
    {
        id:1,
        url: comp
    },
    {
        id:2,
        url: page
    },
    {
        id:3,
        url: serv
    },
    {
        id:4,
        url: util
    }
]

function Sidebar(props){

    const [displayGeneral, setDisplayGeneral] = useState(true);

    const [displayAdvanced, setDisplayAdvanced] = useState(true);

    return(
        <div className="sidebarContainer" >
            <button className="expandable" onClick={() => setDisplayGeneral(!displayGeneral)}>General</button>
            <div className="sidebarBlockGeneral" style={{display: displayGeneral ? "" : "none"}}>
                <div className="draggable">
                {
                    pictureList.map((picture) => {
                        return <Picture url={picture.url} id={picture.id} inCanvas={false} key={picture.id}/>;
                    })
                }
                </div>
            </div>
            <button className="expandable" onClick={() => setDisplayAdvanced(!displayAdvanced)}>Advanced</button>
            <div className="sidebarBlockAdvanced" style={{display: displayAdvanced ? "" : "none"}}>
                display
            </div>
            <button className="saveButton" onClick={() => props.generateHandler()} style={{marginTop: '50px'}}>Save</button>
            <button className="modalButton" onClick={() => props.generateHandler()} >Generate React project</button>
        </div>
    )
}

export default Sidebar;
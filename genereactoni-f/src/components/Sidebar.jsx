import { useState } from "react";
import Picture from "./Picture";

import comp from "../assets/images/component.png";
import page from "../assets/images/page.png";
import serv from "../assets/images/service.png";
import util from "../assets/images/util.png";
import { postObject } from "../services/axiosService";

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
            <button className="button" onClick={() => props.generateHandler()}>Generate React project</button>
        </div>
    )
}

export default Sidebar;
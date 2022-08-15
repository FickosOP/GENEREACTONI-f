import { useState } from "react";
import Picture from "./Picture";
import { useSelector, useDispatch } from "react-redux";

import comp from "../assets/images/component.svg";
import page from "../assets/images/page.svg";
import serv from "../assets/images/service.svg";
import util from "../assets/images/util.svg";
import { changeArrowType, hideArrows, newProject, showArrows } from "../actions/actions";

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

    const arrows = useSelector(state => state.arrowReducer);

    const dispatch = useDispatch();

    return(
        <div className="sidebarContainer" >
            <button className="modalButton" onClick={() => dispatch(newProject())}>Create new project</button>
            <hr />
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
                <button className="modalButton" onClick={() => {arrows.show ? dispatch(hideArrows()) : dispatch(showArrows())}}>{arrows.show ? `Hide arrows` : `Show arrows`}</button>
                <br />
                <select className="modalButton" onChange={(e) => dispatch(changeArrowType(e.target.value.toLowerCase()))}>
                    <option>Smooth</option>
                    <option>Grid</option>
                    <option>Straight</option>
                </select>
            </div>
            <button className="sidebarButton" onClick={() => props.generateHandler(false)} style={{marginTop: '50px'}}>Save</button>
            <button className="sidebarButton" onClick={() => props.generateHandler(true)} >Generate React project</button>
        </div>
    )
}

export default Sidebar;
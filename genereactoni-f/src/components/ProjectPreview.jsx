import { useEffect } from "react";
import { getBgColor } from "../utils/helper";

function ProjectPreview({model}){

    useEffect(() => {
        console.log(model);
    })
    return(
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            {/* {
                model.components?.map((comp, i) => {
                    return i < 5 ? <div
                        style={{position: 'absolute', top: `${5 + (Math.random() * 85)}%`, left: `${2 + Math.random() * 65}%`, backgroundColor: getBgColor(1), width: `${7 + (Math.max(comp.name.length, 5) * 1)}%`, height: '8%', color: 'black', display: 'flex', justifyContent: 'center'}}
                    >
                        {comp.name.length > 5 ? comp.name.slice(0, 5): comp.name}
                    </div> : ''
                })
            } */}
            <div>{
            model.components?.map((comp, i) => {
                return i < 10 ? <div style={{color: '#61dafb'}}>{comp.name.slice(0, 10)}</div> : ''
            })
            }</div>
            <div>{
            model.pages?.map((comp, i) => {
                return i < 10 ? <div style={{color: '#61dafb'}}><b>{comp.name.slice(0, 10)}</b></div> : ''
            })
            }</div>
        </div>
    )
}

export default ProjectPreview;
import React from 'react';
import { useDrag } from "react-dnd";

function Picture({id, url, inCanvas, left, top}) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image",
        item: {id: id, url: url, added: !inCanvas},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    return (
        <img src={url} alt={`comp: ${id}`} style={{border: isDragging ? "3px solid white": "", position: inCanvas ? "absolute" : "static", top: `${top}px`, left: `${left}px`}} ref={drag}/>
        // style={{border: isDragging ? "3px solid black": ""}} ref={drag}
    )
}

export default Picture
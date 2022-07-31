import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Picture from "../components/Picture";
import { useState } from "react";
import { useDrop } from "react-dnd";

function HomePage(){

    const [canvas, setCanvas] = useState([]);

    const [, drop] = useDrop(() => ({
        accept: "image",
        drop: (item, monitor) => addImageToCanvas(item, monitor),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }))

    const addImageToCanvas = (item, monitor) => {
        let coordinates = monitor.getClientOffset()
        let newComponent = { id: canvas.length + 1, url: item.url, x: coordinates.x, y: coordinates.y };
        let nc = canvas;
        if(item.added)
            nc.push(newComponent);
        else{
            nc[item.id - 1].x = coordinates.x;
            nc[item.id - 1].y = coordinates.y; 
        }
        setCanvas(nc);
    }
    //useEffect

    return(
    
    <div className="App">
      <Header active="home" />
      <Sidebar />
        <div className="canvas" ref={drop} style={{height:"500px"}}>
            {
                canvas.map((picture) => {
                    // console.log(`W:${picture.x}\nH:${picture.y}`);
                    // return <div style={{position:"absolute", top:`${picture.y}px`, left: `${picture.x}px`}}>dd</div>; //Instead of using picture use
                    return <Picture url={picture.url} id={picture.id} inCanvas={true} left={picture.x} top={picture.y} key={picture.id} />;
                })
            }
        </div>
    </div>
    )
}

export default HomePage;
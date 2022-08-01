import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
// import Picture from "../components/Picture";
import { useState } from "react";
import { useDrop } from "react-dnd";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ModelComponent from "../components/ModelComponent";

function HomePage(){

    const [canvas, setCanvas] = useState([]);

    const [isMoving, setMoving] = useState(false);

    const [, drop] = useDrop(() => ({
        accept: "image",
        drop: (item, monitor) => addImageToCanvas(item, monitor),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }))

    const addImageToCanvas = (item, monitor) => {
        let coordinates = monitor.getClientOffset()
        let newComponent = { id: canvas.length + 1, url: item.url, x: coordinates.x, y: coordinates.y, type: item.id };
        let nc = canvas;
        if(item.added)
            nc.push(newComponent);
        else{
            nc[item.id - 1].x = coordinates.x;
            nc[item.id - 1].y = coordinates.y; 
        }
        setCanvas(nc);
    }

    function onDrag(){
        setMoving(false);
    }

    function onStop(){
        setMoving(true);
    }
    return(
    
    <div className="App">
      <Header active="home" />
      <Sidebar />
      {/* <button style={{position:"relative", zIndex:"1", backgroundColor: "#fff"}} onClick={() => setMoving(!isMoving)}>{isMoving ? "Pan & zoom" : "Drag and drop"}</button> */}
      <TransformWrapper
        initialScale={1}
        disabled={!isMoving}
        minScale={.5}
        maxScale={2}
        pinch={{step: 5}}
        limitToBounds={false}
        doubleClick={{disabled: true}}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <>
            <div className="tools">
                <button onClick={() => zoomIn()}>+</button>
                <button onClick={() => zoomOut()}>-</button>
                <button onClick={() => resetTransform()}>x</button>
            </div>
            <TransformComponent
                contentStyle={{ height: '100%', width: '100%', position:'relative', backgroundColor: '#5e687a'}}
                wrapperStyle={{ height: '100%', width: '100%', position:'absolute', left: '260px', top: '59px', backgroundColor: '#5e687a'}}
            >
                <div className="canvasPan" ref={drop}>
                    {
                        canvas.map((picture) => {
                            // console.log(`W:${picture.x}\nH:${picture.y}`);
                            // return <div style={{position:"absolute", top:`${picture.y}px`, left: `${picture.x}px`}}>dd</div>; //Instead of using picture use
                            return <ModelComponent type={picture.type} top={picture.y - 59} left={picture.x - 260} onDrag={onDrag} onStop={onStop}/>;
                        })
                    }
                </div>
            </TransformComponent>
            </>
        )}
      
      </TransformWrapper>
    
    {/* {isMoving && 
        <div className="canvas" ref={drop}>
            {
                canvas.map((picture) => {
                    // console.log(`W:${picture.x}\nH:${picture.y}`);
                    // return <div style={{position:"absolute", top:`${picture.y}px`, left: `${picture.x}px`}}>dd</div>; //Instead of using picture use
                    return <ModelComponent type='comp' top={picture.y - 59} left={picture.x - 260} />
                    // return <Picture url={picture.url} id={picture.id} inCanvas={true} left={picture.x - 260} top={picture.y - 59} key={picture.id} />;
                })
            }
        </div>
    } */}
    </div>
    
    )
}

export default HomePage;
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ModelComponent from "../components/ModelComponent";
import { useState } from "react";
import { useDrop } from "react-dnd";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { INITIAL_COMPONENT_STATE, INITIAL_MODEL } from "../utils/initialModelState";
import { useSelector, useDispatch } from 'react-redux';
import { addElement } from "../actions/actions";

function HomePage(){

    const [canvas, setCanvas] = useState([]);

    const [isMoving, setMoving] = useState(false);

    const [model, setModel] = useState(INITIAL_MODEL);

    const dispatch = useDispatch(); 

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
        if(item.added){
            nc.push(newComponent);
            // dispatch(addElement({...INITIAL_COMPONENT_STATE}));
        }
            
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

    function generateModel(){
        console.log(model);
    }

    function changeOneComponent(updated){
        console.log(`UPDATE EL WITH ID: ${updated.id}`); //DOBAR ID
        console.log(updated); //LOS ID
        if(updated.type == 2){
            let copy = model.model?.pages;
            console.log('IDS OF PAGES');
            model.model.pages.map(p => console.log(p.id));
            let elIndex = model.model?.pages?.findIndex((p => p.id === updated.id));
            console.log('pages');
            console.log(copy);
            if(elIndex === -1)
                copy.push(updated);
            else
                copy[elIndex] = updated; 
            setModel({...model, model: {...model.model, pages: copy}});
        }
        else if(updated.type == 1){
            let copy = model.model?.components;
            let elIndex = model.model?.components?.findIndex((c => c.id === updated.id));
            if(elIndex === -1)
                copy.push(updated);
            else
                copy[elIndex] = updated;
            setModel({...model, model: {...model.model, components: copy}});
        }
    }

    function getCurrentState(id, type){
        let def = Object.assign({}, INITIAL_COMPONENT_STATE);
        def.type = type;
        def.id = id;

        let retval = undefined;

        if(type === 1){
            let oneComponent = model.model?.components?.filter(c => c.id === id);
            // retval = oneComponent.length ? oneComponent[0] : def;
            return oneComponent.length ? oneComponent[0] : def;
        }
        else if(type === 2){
            let onePage = model.model?.pages?.filter(p => p.id === id);
            // retval = onePage.length ? onePage[0] : def;
            return onePage.length ? onePage[0] : def;
        }
        // console.log(`Current state for ${type == 1 ? 'component' : 'page'}: ${id} is`);
        // console.log(retval);
        // return retval;
    }
    return(
    
    <div className="App">
      <Header active="home" />
      <Sidebar generateHandler={generateModel}/>
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
            {/* <div className="tools">
                <button onClick={() => zoomIn()}>+</button>
                <button onClick={() => zoomOut()}>-</button>
                <button onClick={() => resetTransform()}>x</button>
            </div> */}
            <TransformComponent
                contentStyle={{ height: '100%', width: '100%', position:'relative', backgroundColor: '#5e687a'}}
                wrapperStyle={{ height: '100%', width: '100%', position:'fixed', left: '260px', top: '59px', backgroundColor: '#5e687a', zIndex: -2}}
            >
                <div className="canvasPan" ref={drop}>
                    {
                        canvas.map((picture) => {
                            return <ModelComponent id={picture.id} type={picture.type} top={picture.y - 59} left={picture.x - 260} onDrag={onDrag} onStop={onStop} currentState={getCurrentState(picture.id, picture.type)} updateHandler={changeOneComponent} />;
                        })
                    }
                </div>
            </TransformComponent>
            </>
        )}
      
      </TransformWrapper>
    </div>
    
    )
}

export default HomePage;
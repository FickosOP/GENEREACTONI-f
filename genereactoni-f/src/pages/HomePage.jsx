import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ModelComponent from "../components/ModelComponent";
import { useState } from "react";
import { useDrop } from "react-dnd";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { addPathToModel, INITIAL_COMPONENT_STATE, INITIAL_MODEL } from "../utils/initialModelState";
import { useSelector, useDispatch } from 'react-redux';
import { addElement } from "../actions/actions";
import { postObject } from "../services/axiosService";

function HomePage(){

    const [isMoving, setMoving] = useState(false);

    const model = useSelector(state => state.modelReducer);
    const structure = useSelector(state => state.structureReducer);

    const dispatch = useDispatch(); 

    const [, drop] = useDrop(() => ({
        accept: "image",
        drop: (item, monitor) => addImageToCanvas(item, monitor),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }))

    const addImageToCanvas = (item, monitor) => {
        let coordinates = monitor.getClientOffset();

        let componentState = Object.assign({}, INITIAL_COMPONENT_STATE, {x: coordinates.x, y: coordinates.y, type: item.id});
        console.log(componentState);

        dispatch(addElement(componentState));
    }

    function onDrag(){
        setMoving(false);
    }

    function onStop(){
        setMoving(true);
    }

    function generateModel(){
        let full = Object.assign({}, INITIAL_MODEL);
        full.structure = structure;
        full.model = model;
        // full = addPathToModel('root', full); //probably not neccessary if downloading
        console.log(full);
        full.name = 'nesto_drugacije'; //DIALOG
        // postObject('model/', full, (response) => {
        //     console.log(response.data);
        //     if(response.data.acknowledged){
        //         alert('Saved!');
        //     }
        // }) -> SAVE

        // postObject('model/generate', full, (response) => {
        //     console.log(response.data);
        // }); -> GENERATE
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
                        model.components?.map((comp) => {
                            return <ModelComponent id={comp.id} type={comp.type} top={comp.y - 59} left={comp.x - 260} onDrag={onDrag} onStop={onStop} key={comp.id}/>
                        })
                        // canvas.map((picture) => {
                        //     return <ModelComponent id={picture.id} type={picture.type} top={picture.y - 59} left={picture.x - 260} onDrag={onDrag} onStop={onStop} currentState={getCurrentState(picture.id, picture.type)} updateHandler={changeOneComponent} />;
                        // })
                    }
                    {
                        model.pages?.map((page) => {
                            return <ModelComponent id={page.id} type={page.type} top={page.y - 59} left={page.x - 260} onDrag={onDrag} onStop={onStop} key={page.id}/>
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
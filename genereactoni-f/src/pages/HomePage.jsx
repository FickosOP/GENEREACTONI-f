import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ModelComponent from "../components/ModelComponent";
import { useState } from "react";
import { useDrop } from "react-dnd";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { INITIAL_COMPONENT_STATE, INITIAL_MODEL } from "../utils/initialModelState";
import { useSelector, useDispatch } from 'react-redux';
import { addElement } from "../actions/actions";
import { downloadZip, postObject } from "../services/axiosService";
import { getOffsetForItem } from "../utils/helper";
import Xarrow, {useXarrow} from "react-xarrows";

function HomePage(){

    const [isMoving, setMoving] = useState(false);

    const model = useSelector(state => state.modelReducer);
    const structure = useSelector(state => state.structureReducer);
    const arrows = useSelector(state => state.arrowReducer);

    const updateArrows = useXarrow();

    const dispatch = useDispatch(); 

    const [, drop] = useDrop(() => ({
        accept: "image",
        drop: (item, monitor) => addImageToCanvas(item, monitor),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }))
    
    const addImageToCanvas = (item, monitor) => {
        let initClient = monitor.getInitialClientOffset();
        let itemOffset = getOffsetForItem(item.id);
        let divOffset = {x: initClient.x - itemOffset.x + 260, y: initClient.y - itemOffset.y + 59}
        
        let coordinates = monitor.getClientOffset();

        let componentState = Object.assign({}, INITIAL_COMPONENT_STATE, {x: coordinates.x - divOffset.x, y: coordinates.y - divOffset.y, type: item.id});
        console.log(componentState);

        dispatch(addElement(componentState));
    }

    function onDrag(){
        setMoving(false);
        updateArrows();
    }

    function onStop(){
        updateArrows();
        setMoving(true);
    }

    function generateModel(generate){
        let full = Object.assign({}, INITIAL_MODEL);
        full.structure = structure;
        full.model = model;
        if(generate)
            downloadZip('model/generate', full); 
        else{
            postObject('model/', full, (response) => console.log(response.data)); //save
        }
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
        onZoom={updateArrows}
        onPanning={updateArrows}
        zoomAnimation={{disabled: true}}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <>
            <button onClick={() => { resetTransform(0); updateArrows();}} style={{border:'none', background: 'none', color: 'white', position: 'fixed', top: '60px', left: '260px'}}>Reset</button>
            <TransformComponent
                contentStyle={{ height: '100%', width: '100%', position:'relative', backgroundColor: '#5e687a'}}
                wrapperStyle={{ height: '100%', width: '100%', position:'fixed', left: '260px', top: '59px', backgroundColor: '#5e687a', zIndex: -2}}
            >
                <div className="canvasPan" ref={drop}>
                    {
                        model.components?.map((comp) => {
                            return <ModelComponent id={comp.id} type={comp.type} top={comp.y} left={comp.x} onDrag={onDrag} onStop={onStop} key={comp.id}/>
                        })
                    }
                    {
                        model.pages?.map((page) => {
                            return <ModelComponent id={page.id} type={page.type} top={page.y} left={page.x} onDrag={onDrag} onStop={onStop} key={page.id}/>
                        })
                    }
                </div>
            </TransformComponent>
            </>
        )}
      </TransformWrapper>
      {
        model.pages?.map((page, i) => (
            page.children?.map((child, j) => (
                <Xarrow
                    key={`p${i},${j}`}
                    start={page.name}
                    end={child}
                    showXarrow={arrows.show}
                    path={arrows.type}
                />
            ))
        ))
      }
      {
        model.components?.map((component, i) => (
            component.children?.map((child, j) => (
                <Xarrow
                    key={`c${i},${j}`} 
                    start={component.name}
                    end={child}
                    showXarrow={arrows.show}
                    path={arrows.type}
                />
            ))
        ))
      }
    </div>
    
    )
}

export default HomePage;
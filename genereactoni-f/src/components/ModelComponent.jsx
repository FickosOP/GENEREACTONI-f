import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable';
import ModalBase from './ModalBase';

function ModelComponent(props) {

    const[showModal, setShowModal] = useState(false);

    // useEffect(() => {
    //     // console.log(`Current state of component ${props.id}`);
    //     // console.log(props.currentState);
    // })

    function getBgColor(type){
        if(type === 1 || type === 2){
            return "#61dafb";
        }
        else{
            return "#ffff00";
        }
    }
    function getName(type){
        if(type === 1){
            return "Component";
        }
        else if(type === 2){
            return "Page";
        }
        else if(type === 3){
            return "Service"
        }
        else{
            return "Util";
        }
    }

    function handleClick(e){
        if(e.detail === 2){
            console.log(`Opening modal id: ${props.id}`);
            setShowModal(true);
        }
    }

    function modalHandler(result){
        result.id = props.id;
        console.log(`modalHandler result id: ${result.id}`);
        props.updateHandler(result);
        setShowModal(false);
    }

    return (
        <Draggable onDrag={props.onDrag} onStop={props.onStop}>
            <div
                style={{top: `${props.top}px`, left: `${props.left}px`, backgroundColor: getBgColor(props.type), minHeight: '150px', width: '100px', position: 'fixed', zIndex: -1}}
                onClick={handleClick}
            >
                { getName(props.type) }
                { showModal && <ModalBase type={props.type} handler={modalHandler} active={showModal} currentState={props.currentState} id={props.id}/> }
            </div>
        </Draggable>
    );
}
;
export default ModelComponent;
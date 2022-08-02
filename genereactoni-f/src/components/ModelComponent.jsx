import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable';
import ModalBase from './ModalBase';

function ModelComponent(props) {

    const[component, setComponent] = useState({});

    const[showModal, setShowModal] = useState(false);

    // function save(){
    //     props.saveOne(component);
    // }
    // useEffect(() => {
    //     // console.log(props);
    // });

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
            console.log("double click");
            setShowModal(true);
        }
    }

    function modalHandler(result){
        console.log(result);
        setComponent(result);
        setShowModal(false);
    }

    return (
        <Draggable onDrag={props.onDrag} onStop={props.onStop}>
            <div
                style={{top: `${props.top}px`, left: `${props.left}px`, backgroundColor: getBgColor(props.type), minHeight: '150px', width: '100px', position: 'fixed', zIndex: -1}}
                onClick={handleClick}
            >
                { getName(props.type) }
                { showModal && <ModalBase type={props.type} handler={modalHandler} active={showModal}/> }
            </div>
        </Draggable>
    );
}
;
export default ModelComponent;
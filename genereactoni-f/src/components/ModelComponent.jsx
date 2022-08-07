import React, { useState } from 'react'
import Draggable from 'react-draggable';
import { getBgColor, getName } from '../utils/helper';
import ModalBase from './ModalBase';

function ModelComponent(props) {

    const[showModal, setShowModal] = useState(false);

    function handleClick(e){
        if(e.detail === 2)
            setShowModal(true);
    }

    function modalHandler(){
        setShowModal(false);
    }

    return (
        <Draggable onDrag={props.onDrag} onStop={props.onStop}>
            <div
                style={{top: `${props.top}px`, left: `${props.left}px`, backgroundColor: getBgColor(props.type), minHeight: '150px', width: '100px', position: 'fixed', zIndex: -1}}
                onClick={handleClick}
            >
                { getName(props.type) }
                { showModal && <ModalBase type={props.type} handler={modalHandler} active={showModal} id={props.id}/> }
            </div>
        </Draggable>
    );
}
;
export default ModelComponent;
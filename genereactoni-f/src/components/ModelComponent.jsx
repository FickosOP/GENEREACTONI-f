import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable';
import { getBgColor, getName } from '../utils/helper';
import { useSelector } from 'react-redux';
import ModalBase from './ModalBase';
import { reduxName } from '../utils/pipes';

function ModelComponent(props) {

    const component = useSelector((state) => state.modelReducer[reduxName(props.type)].filter(el => el.id === props.id)[0]);

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
                style={{top: `${props.top}px`, left: `${props.left}px`, backgroundColor: getBgColor(props.type), minHeight: '150px', minWidth: '130px', width: `${component.name.length * 10}px`, position: 'fixed', zIndex: -1, display:'flex'}}
                onClick={handleClick}
            >
                <div
                    style={{position: 'absolute', width: '100%', display: 'flex', justifyContent: 'center'}}
                >
                    { component.name ? component.name : getName(props.type) }
                </div>
                <div
                    style={{position: 'absolute', top: '30px', width: '100%', height: '40px', backgroundColor: '#282C34', color: 'yellow', display: 'flex', fontSize: '13px', fontStyle: 'italic', flexDirection: 'column'}}
                >
                    {
                        component.states.map((state) => { return <div>{state.name} : {state.default}</div>} )
                    }
                </div>
                <div
                    style={{position: 'absolute', top: '70px', width: '100%', height: '40px', backgroundColor: '#464F5F', color: 'yellow', display: 'flex', fontSize: '13px', fontStyle: 'italic', flexDirection: 'column'}}
                >
                    {
                        component.effects?.map((effect) => {return <div>{effect.name}</div>})
                    }
                </div>
                <div
                    style={{position: 'absolute', top: '110px', width: '50%', height: '40px', backgroundColor: '#002727', color: '#0078CE', display: 'flex', fontSize: '13px'}}
                >
                    {
                        component.return ? '<html></html>' : ''
                    }
                </div>
                <div
                    style={{position: 'absolute', top: '110px', left: '50%', width: '50%', height: '40px', backgroundColor: '#19667B', color: '#FF68C3', display: 'flex', fontSize: '13px', fontStyle: 'italic', flexDirection: 'column'}}
                >
                    { component.children.length > 0 ? 'import' : ''}
                </div>
                
                { showModal && <ModalBase type={props.type} handler={modalHandler} active={showModal} id={props.id}/> }
            </div>
        </Draggable>
    );
}
;
export default ModelComponent;
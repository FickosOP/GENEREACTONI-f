import React, { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable';
import { getBgColor, getName } from '../utils/helper';
import { useSelector, useDispatch } from 'react-redux';
import ModalBase from './ModalBase';
import { reduxName } from '../utils/pipes';
import { removeElement, updateElement } from '../actions/actions';

function ModelComponent(props) {

    const component = useSelector((state) => state.modelReducer[reduxName(props.type)].filter(el => el.id === props.id)[0]);

    const[showModal, setShowModal] = useState(false);

    const[showContextMenu, setShowContextMenu] = useState(false);
    const[points, setPoints] = useState({x: 0, y: 0});

    const ref = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const handleWindowClick = () => setShowContextMenu(false);
        window.addEventListener('click', handleWindowClick);
        return () => window.removeEventListener('click', handleWindowClick);
    }, [])

    function handleClick(e){
        if(e.detail === 2)
            setShowModal(true);
    }

    function modalHandler(){
        setShowModal(false);
    }

    function handleStop(e){
        console.log(e); //CHANGE TOP, LEFT
        console.log(ref.current.state.x);
        console.log(ref.current.state.y);
        //dispatch(updateElement({...component, x: component.x + ref.current.state.x, y: component.y + ref.current.state.y})); -> FIX THE DROP POSITION AND IT WILL WORK NICELY || SAVE BACKUP POSITION
        props.onStop();
    }

    function handleContextClick(e){
        e.preventDefault();
        let offsetX = props.left + 260;
        let offsetY = props.top + 59;
        setPoints({x: e.pageX - offsetX, y: e.pageY - offsetY});
        setShowContextMenu(true);
    }

    function handleDelete(){
        dispatch(removeElement(props.id, props.type));
    }

    return (
        <Draggable onDrag={props.onDrag} onStop={handleStop} ref={ref}>
            <div
                id={`${props.id}-${props.type}`}
                style={{top: `${props.top}px`, left: `${props.left}px`, backgroundColor: getBgColor(props.type), minHeight: '150px', minWidth: '130px', width: `${component.name.length * 10}px`, position: 'fixed', zIndex: -1, display:'flex'}}
                onClick={handleClick}
                onContextMenu={handleContextClick}
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
                { 
                showContextMenu && 
                <div className='contextMenu' style={{top: `${points.y}px`, left: `${points.x}px`}}>
                    <button onClick={() => setShowModal(true)}>Show</button>
                    <button onClick={() => handleDelete()}>Delete</button>
                </div>
                }
            </div>
        </Draggable>
    );
}
;
export default ModelComponent;
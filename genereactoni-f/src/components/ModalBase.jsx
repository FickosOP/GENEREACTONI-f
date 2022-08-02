import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';

function ModalBase(props) {

    const[component, setComponent] = useState({ path: "", name: "", states: [], effects: [], actions: [], return: "", children: [] });

    const[newState, setNewState] = useState({});
    
    const[newEffect, setNewEffect] = useState({});

    // useEffect(() => {

    //     console.log("MODAL BASE");
    //     console.log(props);
    // });

    // function saveChange(){
    //     const result = "HAHA";
    //     props.handler(result);
    // }

    function justLog(){
        console.log('action');
    }

    function handlerWrapper(){
        props.handler(component);
    }

    function handleAddState(){
        if(component.states.filter(s => s.name == newState.name).length == 0)
            setComponent({...component, states: [...component.states, newState]});
    }

    function handleRemoveState(state){
        setComponent({...component, states: component.states.filter(s => s.name != state)});
    }

    return (
        <Modal
            isOpen={true}
            onAfterOpen={justLog}
            onRequestClose={justLog}
            style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)'
                },
                content: {
                    position: 'absolute',
                    top: '25%',
                    left: '25%',
                    right: '25%',
                    bottom: '25%',
                    border: '1px solid #ccc',
                    background: '#ccc',
                    overflow: 'auto',
                    outline: 'none',
                    padding: '20px'
                }
            }}
            contentLabel="Example modal"
        >
            <div className='modalniSadrzaj'>
                {/* kartice */}
                {/* <div className='modalStates'>
                    <div>
                        <input type="text" placeholder='Name' onChange={(e) => setNewState({...newState, name: e.target.value})} />
                        <input type="text" placeholder='Default value: eg. {}' onChange={(e) => setNewState({...newState, default: e.target.value})} />
                        <button onClick={handleAddState}>Add</button>
                    </div>
                    <table style={{marginTop: '10px', width: '100%', border: '1px solid black'}}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Default value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                component.states?.map((state) => {
                                    return <tr><td>{state.name}</td><td>{state.default}</td><td><button onClick={() => handleRemoveState(state.name)}>Remove</button></td></tr>
                                })
                            }
                        </tbody>
                    </table>
                </div> */}
                <div className='modalEffects'>
                    <input type="text" onChange={(e) => setNewEffect({...newEffect, name: e.target.value})}/>
                    <button onClick={() => setComponent({...component, effects: [...component.effects, newEffect]})}>Add</button>
                    <ul>
                        {
                            component.effects?.map((e) => {
                                return <li>{e.name}<button onClick={() => setComponent({...component, effects: component.effects.filter(eff => eff.name != e.name)})}>Remove</button></li>;
                            })
                        }
                    </ul>
                </div>
                {/*<div className='modalChildren'>3</div>
                <div className='modalHtml'>4</div> */}
                <button onClick={handlerWrapper}>Close</button>
            </div>
        </Modal>
        // <div style={{position: 'fixed', backgroundColor: 'rgba(0, 0, 0, 0.7)', left: 0, top: 0, display:'flex', alignItems: 'center', justifyContent: 'center', zIndex:1000000000}}>
        //     <div style={{width: '460px', backgroundColor: '#fff'}}>
        //         ModalBase
        //         <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio unde officia earum a neque in facere accusamus voluptatem amet, fugit provident possimus, repellendus quas! Minima mollitia animi modi accusamus eum?</p>
        //         <button >Save</button>
        //     </div>
        // </div>
    )
}

export default ModalBase;
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import { useSelector, useDispatch } from 'react-redux';
import 'react-tabs/style/react-tabs.css';
import { updateElement } from '../actions/actions';
import { reduxName } from '../utils/pipes';

Modal.setAppElement('#root');

function ModalBase(props) {
    
    const componentInit = useSelector((state) => state[reduxName(props.type)].filter(el => el.id === props.id)[0]);

    const dispatch = useDispatch();

    const [component, setComponent] = useState(componentInit);


    const[newState, setNewState] = useState({});
    
    const[newEffect, setNewEffect] = useState({});

    // const allComponentsInit = useSelector((state) => [...state.components, ...state.pages]);
    const[allComponents, setAllComponents] = useState(['a', 'b', 'c', 'd', 'e']);

    function handleAddState(){
        if(component.states.filter(s => s.name === newState.name).length === 0)
            setComponent({...component, states: [...component.states, newState]});
    }

    function handleRemoveState(state){
        setComponent({...component, states: component.states.filter(s => s.name !== state)});
    }
    
    return (
        <Modal
            isOpen={true}
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
            <Tabs>
                <TabList>
                    <Tab>States</Tab>
                    <Tab>Effects</Tab>
                    <Tab>Html</Tab>
                    <Tab>Children</Tab>
                </TabList>
                <TabPanel>
                    <div className='modalStates'>
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
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='modalEffects'>
                        <input type="text" onChange={(e) => setNewEffect({...newEffect, name: e.target.value})}/>
                        <button onClick={() => setComponent({...component, effects: [...component.effects, newEffect]})}>Add</button>
                        <ul>
                            {
                                component.effects?.map((e) => {
                                    return <li key={e.name}>{e.name}<button onClick={() => setComponent({...component, effects: component.effects.filter(eff => eff.name !== e.name)})}>Remove</button></li>;
                                })
                            }
                        </ul>
                    </div>
                </TabPanel>
                <TabPanel>
                    <p>Html</p>
                    <input type="file" />
                    <br />or <br />
                    Insert HTML code here:<br />
                    <textarea rows='10' style={{width: '100%'}}></textarea>
                </TabPanel>
                <TabPanel>
                    <p>Children</p>
                    <div style={{display: 'flex'}}>
                    
                    <table className='all'>
                        <tbody>
                        {
                            allComponents.map(child => {
                                return <tr key={child}><td>{child}</td><td><button onClick={() => { setComponent({...component, children: [...component.children, child]}); setAllComponents(allComponents.filter(c => c !== child)) }}>Add</button></td></tr>
                            })
                        }
                        </tbody>
                    </table>
                    <table className='children'>
                        <tbody>
                        {
                            component.children?.map(child => {
                                return <tr key={child}><td>{child}</td><td><button onClick={() => { setComponent({...component, children: component.children.filter(c => c !== child)}); setAllComponents([...allComponents, child]) }}>Remove</button></td></tr>
                            })
                        }
                        </tbody>
                    </table>
                    </div>
                </TabPanel>
            </Tabs>
            <button onClick={() => {dispatch(updateElement(component)); props.handler(component)}}>Close</button>
        </Modal>
    )
}

export default ModalBase;
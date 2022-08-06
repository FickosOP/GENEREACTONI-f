import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

Modal.setAppElement('#root');

function ModalBase(props) {

    const[component, setComponent] = useState({ path: "", name: "", states: [], effects: [], actions: [], return: "", children: ['f', 'g'] });

    const[newState, setNewState] = useState({});
    
    const[newEffect, setNewEffect] = useState({});

    const[allComponents, setAllComponents] = useState(['a', 'b', 'c', 'd', 'e']);

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
                                    return <li key={e.name}>{e.name}<button onClick={() => setComponent({...component, effects: component.effects.filter(eff => eff.name != e.name)})}>Remove</button></li>;
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
                    {
                        allComponents.map(child => {
                            return <tr><td>{child}</td><td><button onClick={() => { setComponent({...component, children: [...component.children, child]}); setAllComponents(allComponents.filter(c => c != child))}}>Add</button></td></tr>
                        })
                    }
                    </table>
                    <table className='children'>
                    {
                        component.children?.map(child => {
                            return <tr><td>{child}</td><td><button onClick={() => { setComponent({...component, children: component.children.filter(c => c != child)}); setAllComponents([...allComponents, child])}}>Remove</button></td></tr>
                        })
                    }
                    </table>
                    </div>
                </TabPanel>
            </Tabs>
            <button onClick={handlerWrapper}>Close</button>
        </Modal>
    )
}

export default ModalBase;
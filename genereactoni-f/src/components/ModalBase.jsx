import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import { useSelector, useDispatch } from 'react-redux';
import 'react-tabs/style/react-tabs.css';
import { addToStructure, updateElement } from '../actions/actions';
import { reduxName } from '../utils/pipes';
import plus from '../assets/images/plus-react.svg';
import minus from '../assets/images/minus-react.svg';
import lightClose from '../assets/images/close-light-react.svg';
import { TreeItem, TreeView } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { createTreeViewFromStructure, getStructureForFolder } from '../utils/treeStructure';

Modal.setAppElement('#root');

function ModalBase(props) {
    
    const componentInit = useSelector((state) => state.modelReducer[reduxName(props.type)].filter(el => el.id === props.id)[0]);

    const dispatch = useDispatch();

    const [component, setComponent] = useState(componentInit);

    const[newState, setNewState] = useState({});
    
    const[newEffect, setNewEffect] = useState({});

    const allComponentsInit = useSelector((state) => [...state.modelReducer.components, ...state.modelReducer.pages].map(el => { return el.name }).filter(el => el !== component.name && !component.children.includes(el)));
    const[allComponents, setAllComponents] = useState(allComponentsInit);

    useEffect(() => {
        console.log(allComponentsInit);
    })

    function handleAddState(){
        if(component.states.filter(s => s.name === newState.name).length === 0)
            setComponent({...component, states: [...component.states, newState]});
    }

    function handleRemoveState(state){
        setComponent({...component, states: component.states.filter(s => s.name !== state)});
    }
    
    function handleInputFileChange(e){
        console.log(e.target.value);
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
                    <Tab>Basic</Tab>
                    <Tab>States</Tab>
                    <Tab>Effects</Tab>
                    <Tab>Html</Tab>
                    <Tab>Children</Tab>
                </TabList>
                <TabPanel>
                    <div className='modalBasic'>
                        <h4>Name: {component.name}</h4>
                        <input onChange={(e) => setComponent({...component, name: e.target.value})}/>
                        <h5>Path: {component.path ? component.path : `src/${props.type === 2 ? 'pages' : 'components'}/`}</h5>
                        <input onChange={(e) => setComponent({...component, path: `src/${props.type === 2 ? 'pages' : 'components'}/${e.target.value}/`}) }/>
                        {/* INSTEAD OF H5 AND INPUT CREATE TREE VIEW */}
                        {/* <TreeView
                            aria-label='file system navigator'
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                            sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto'}}
                        >
                            {
                                createTreeViewFromStructure()
                            }
                        </TreeView> */}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='modalStates'>
                        <div style={{display:'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <input type="text" placeholder='Name' onChange={(e) => setNewState({...newState, name: e.target.value})} style={{width: '100%'}}/>
                            <input type="text" placeholder='Default value: eg. {}' onChange={(e) => setNewState({...newState, default: e.target.value})} style={{width: '100%'}}/>
                            <button onClick={handleAddState} className='modalButton'>Add</button>
                        </div>
                        <table style={{marginTop: '10px', width: '100%', border: 'none'}}>
                            <thead>
                                <tr>
                                    <th style={{width:'220px'}}>Name</th>
                                    <th style={{width:'180px'}}>Default value</th>
                                    <th style={{width:'60px'}}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    component.states?.map((state) => {
                                        return <tr><td>{state.name}</td><td>{state.default}</td><td><button onClick={() => handleRemoveState(state.name)} className='modalButton'>Remove</button></td></tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='modalEffects'>
                        <input type="text" onChange={(e) => setNewEffect({...newEffect, name: e.target.value})} style={{width: '80%'}}/>
                        <button onClick={() => setComponent({...component, effects: [...component.effects, newEffect]})} className='modalButton' style={{marginLeft: '10px', width: '10%'}}>Add</button>
                        <ul style={{marginTop: '20px'}}>
                            {
                                component.effects?.map((e) => {
                                    return <li key={e.name}>{e.name}<button onClick={() => setComponent({...component, effects: component.effects.filter(eff => eff.name !== e.name)})} className='modalButton' style={{marginLeft: '20px', marginTop: '5px'}}>Remove</button></li>;
                                })
                            }
                        </ul>
                    </div>
                </TabPanel>
                <TabPanel>
                    <input type="file" onChange={handleInputFileChange} />
                    <br />or <br />
                    Insert HTML code here:<br />
                    <textarea rows='12' style={{width: '100%'}} onChange={(e) => setComponent({...component, return: e.target.value})} defaultValue={component.return}></textarea>
                </TabPanel>
                <TabPanel>
                    <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start'}}>
                    <table className='all'>
                        <tbody>
                        {
                            allComponents.map(child => {
                                return <tr key={child}>
                                        <td style={{fontSize: '25px'}}>{child}</td>
                                        <td>
                                            <button onClick={() => { setComponent({...component, children: [...component.children, child]}); setAllComponents(allComponents.filter(c => c !== child)) }} className='modalIconButton'>
                                                <img src={plus} alt="Add" style={{width: '15px', height: '15px'}} />
                                            </button>
                                        </td></tr>
                            })
                        }
                        </tbody>
                    </table>
                    <table className='children'>
                        <tbody>
                        {
                            component.children?.map(child => {
                                return <tr key={child}>
                                    <td style={{fontSize: '25px'}}>{child}</td>
                                    <td>
                                        <button onClick={() => { setComponent({...component, children: component.children.filter(c => c !== child)}); setAllComponents([...allComponents, child]) }} className='modalIconButton'>
                                            <img src={minus} alt="Add" style={{width:'15px', height: '15px'}} />
                                        </button></td></tr>
                            })
                        }
                        </tbody>
                    </table>
                    </div>
                </TabPanel>
            </Tabs>
            <button onClick={() => {dispatch(updateElement(component)); dispatch(addToStructure(component.path)); props.handler(component)}} className='closeModalButton'>
                <img src={lightClose} alt="Close" style={{width: '25px', height: '35px'}}/>
            </button>
        </Modal>
    )
}

export default ModalBase;
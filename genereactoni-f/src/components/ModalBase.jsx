import React, { useEffect } from 'react'
import Modal from 'react-modal';

function ModalBase(props) {

    useEffect(() => {
        console.log("MODAL BASE");
        console.log(props);
    });

    function saveChange(){
        const result = "HAHA";
        props.handler(result);
    }

    function justLog(){
        console.log('action');
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
                    top: '240px',
                    left: '440px',
                    right: '440px',
                    bottom: '240px',
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
                <div><p>HAHA</p></div>
                <button onClick={saveChange}>Save</button>
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
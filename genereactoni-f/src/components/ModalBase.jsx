import React, { useEffect } from 'react'

function ModalBase(props) {
    useEffect(() => {
        console.log("MODAL BASE");
        console.log(props);
    }, []);

    function saveChange(){
        const result = "HAHA";
        props.handler(result);
    }
    return (
        <div>ModalBase<button onClick={saveChange}>Save</button></div>
    )
}

export default ModalBase;
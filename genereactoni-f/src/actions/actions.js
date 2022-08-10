export const addElement = (el) => {
    return {
        type: 'ADD_ELEMENT',
        payload: {...el}
    }
};

export const updateElement = (el) => {
    return {
        type: 'UPDATE_ELEMENT',
        payload: {...el}
    }
};

export const addToStructure = (path, file) => {
    return {
        type: 'ADD_TO_STRUCTURE',
        payload: {path, file}
    }
}

export const removeFromStructure = (path) => {
    return {
        type: 'REMOVE_FROM_STRUCTURE',
        payload: {path}
    }
}


export const loadModel = (full) => {
    return {
        type: 'LOAD_PROJECT',
        payload: {full}
    }
}
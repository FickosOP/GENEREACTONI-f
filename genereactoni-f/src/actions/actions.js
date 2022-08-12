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

export const removeElement = (id, type) => {
    return {
        type: 'REMOVE_ELEMENT',
        payload: {id, type}
    }
}


export const loadModel = (full) => {
    return {
        type: 'LOAD_PROJECT',
        payload: {full}
    }
}

export const newProject = () => {
    return {
        type: 'NEW_PROJECT'
    }
}

export const saveUserTokenState = (data) => {
    return {
        type: 'ADD_USER_AUTH',
        payload: {...data}
    }
}

export const removeUserTokenState = () => {
    return {
        type: 'REMOVE_USER_AUTH',
        
    }
}
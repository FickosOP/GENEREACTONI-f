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
export const addElement = (el) => {
    return {
        type: 'ADD_ELEMENT',
        payload: {...el}
    }
};

export const updateElement = () => {
    return {
        type: 'UPDATE_ELEMENT',
        payload: {}
    }
};
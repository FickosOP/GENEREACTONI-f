
const arrowReducer = (state = {show: true, type: 'smooth'}, action) => {
    switch(action.type){
        case 'SHOW_ARROWS':
            return {...state, show: true};
        case 'HIDE_ARROWS':
            return {...state, show: false};
        case 'CHANGE_ARROW_TYPE':
            return {...state, type: action.payload};
        default:
            return state;
    }
}
export default arrowReducer;
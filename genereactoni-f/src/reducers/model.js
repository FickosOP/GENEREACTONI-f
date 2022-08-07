import { INITIAL_MODEL } from "../utils/initialModelState";

const modelReducer = (state = INITIAL_MODEL.model, action) => {
    switch(action.type){
        case 'ADD_ELEMENT':
            console.log(action.payload);
            return state;//change
        case 'UPDATE_ELEMENT':
            console.log(action.payload);
            return state;//change
        case 'REMOVE ELEMENT':
            console.log(action.payload); 
            return state; //change
        default:
            return state;
    }
}

export default modelReducer;
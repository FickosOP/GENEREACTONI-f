import { INITIAL_MODEL } from "../utils/initialModelState";

let counter = 0;

const modelReducer = (state = INITIAL_MODEL.model, action) => {
    switch(action.type){
        case 'ADD_ELEMENT':
            // console.log(action.payload);
            switch(action.payload.type){
                case 1:
                    return {...state, components: [...state.components, {...action.payload, id: state.components.length + 1}]};
                case 2:
                    return {...state, pages: [...state.pages, {...action.payload, id: state.pages.length + 1}]};
                case 3:
                case 4:
                default:
                    return state;
            }
        case 'UPDATE_ELEMENT':
            // console.log(action.payload);
            switch(action.payload.type){
                case 1:
                    let arrCopy = Object.assign([], state.components);
                    let objIndex = arrCopy.findIndex((obj => obj.id === action.payload.id));
                    arrCopy[objIndex] = action.payload;
                    return {...state, components: arrCopy};
                case 2:
                    let pageCopy = Object.assign([], state.pages);
                    let pageIndex = pageCopy.findIndex((obj => obj.id === action.payload.id));
                    pageCopy[pageIndex] = action.payload;
                    return {...state, pages: pageCopy};
                default:
                    return state;
            }
        case 'REMOVE ELEMENT':
            console.log(action.payload); 
            return state; //change
        case 'LOAD_PROJECT':
            return action.payload.full.model;
        default:
            return state;
    }
}

export default modelReducer;
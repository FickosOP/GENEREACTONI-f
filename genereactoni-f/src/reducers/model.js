import { INITIAL_MODEL } from "../utils/initialModelState";

let counter = 0;

const modelReducer = (state = INITIAL_MODEL.model, action) => {
    switch(action.type){
        case 'ADD_ELEMENT':
            // console.log(action.payload);
            switch(action.payload.type){
                case 1:
                    return {...state, components: [...state.components, {...action.payload, id: state.components.length + 1, path: '/src/components'}]};
                case 2:
                    return {...state, pages: [...state.pages, {...action.payload, id: state.pages.length + 1, path: '/src/pages'}]};
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
        case 'REMOVE_ELEMENT':
            switch(action.payload.type){
                case 1:
                    return {...state, components: state.components.filter(c => c.id !== action.payload.id)}
                case 2:
                    return {...state, pages: state.pages.filter(p => p.id !== action.payload.id)}
                default:
                    return state;
            }
        case 'LOAD_PROJECT':
            return action.payload.full.model;
        case 'NEW_PROJECT':
            return Object.assign({}, INITIAL_MODEL.model);
        default:
            return state;
    }
}

export default modelReducer;
import modelReducer from "./model";
import structureReducer from "./structure";
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    modelReducer,
    structureReducer
});

export default allReducers;
import modelReducer from "./model";
import structureReducer from "./structure";
import authReducer from "./auth";

import { combineReducers } from 'redux';

const allReducers = combineReducers({
    modelReducer,
    structureReducer,
    authReducer
});

export default allReducers;
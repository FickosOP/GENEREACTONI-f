import modelReducer from "./model";
import structureReducer from "./structure";
import authReducer from "./auth";
import arrowReducer from "./arrow";

import { combineReducers } from 'redux';

const allReducers = combineReducers({
    modelReducer,
    structureReducer,
    authReducer,
    arrowReducer
});

export default allReducers;
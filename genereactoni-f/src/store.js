import { createStore } from 'redux';
import modelReducer from './reducers/model';

const store = createStore(
    modelReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
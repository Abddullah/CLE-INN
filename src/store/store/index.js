import rootReducer from "../reducers/rootReducer";
import {createStore, applyMiddleware} from 'redux';
import { default as ReduxThunk } from 'redux-thunk';

const store = createStore(
    rootReducer,
    {},
    applyMiddleware(ReduxThunk)
);

export default store;
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import appReducer from '../pages/global';

export default function configStore(initialState) {
    const store = createStore(
        appReducer,
        initialState,
        applyMiddleware(thunkMiddleware),
    );
    return store;
}

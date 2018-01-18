import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import appReducer from '../reducers';

export default function configureStore(initialState) {
    const store = createStore(
        appReducer,
        initialState,
        applyMiddleware(thunkMiddleware),
    );

    return store;
}

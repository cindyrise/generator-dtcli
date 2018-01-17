import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import appReducer from '../reducers';

export default function configureStore(initialState) {
    const store = createStore(
        appReducer,
        initialState,
        compose(
            applyMiddleware(thunkMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : fn => fn
        ),
    );

    return store;
}

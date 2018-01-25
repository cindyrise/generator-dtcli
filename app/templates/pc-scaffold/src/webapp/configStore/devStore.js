import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import appReducer from '../pages/global';

export default function configStore(initialState) {
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

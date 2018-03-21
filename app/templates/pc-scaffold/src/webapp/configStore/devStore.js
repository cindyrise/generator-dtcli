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
    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('../routers', () => {
        const NextRootContainer = require('../routers').default
        render(NextRootContainer)
      });
    }
    return store;
}

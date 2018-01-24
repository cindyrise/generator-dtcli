import 'core-js/es6/map' //支持Map
import 'core-js/es6/set' //支持Set
import 'core-js/es6/string' //支持includes()
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader'
import Routers from './routers'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducers/index'
import './public/assets/styles/app.scss'
var FastClick = require('fastclick')

//按模块导入lodash，可以有效减小vendor.js的大小
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import debounce from 'lodash/debounce'
import isArray from 'lodash/isArray'

window.isEmpty = isEmpty
window.isEqual = isEqual
window.debounce = debounce
window.isArray = isArray

const history = createHistory()
const middleware = routerMiddleware(history)

//解决移动端300毫秒延迟
FastClick.attach(document.body)
const middlewares = [thunk, middleware]

const store = createStore(
    combineReducers({ routing: routerReducer, ...rootReducer }),
    __PRODUCTION == 'build' ? applyMiddleware(...middlewares) : composeWithDevTools(applyMiddleware(...middlewares))
)

const render = Component =>
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    )

render(Routers)

if (module.hot) {
    module.hot.accept('./routers', () => {
        const NextRootContainer = require('./routers').default
        render(NextRootContainer)
    })
}

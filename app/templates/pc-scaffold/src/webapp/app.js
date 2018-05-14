import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory'
//import createHistory from "history/createHashHistory";
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
//import enUS from 'antd/lib/locale-provider/en_US';

import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import Routers from './routers';
import { AppContainer } from 'react-hot-loader'
import { createStore, applyMiddleware, combineReducers,compose } from 'redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import appReducer from './pages/global';
// import './assets/styles/antd.less';
import "./assets/styles/main.scss";


export const history = createHistory();
const middleware = routerMiddleware(history);
const middlewares = [thunk, middleware];

const store = createStore(
  combineReducers({ routing: routerReducer, ...appReducer }),
  __PRODUCTION ? applyMiddleware(...middlewares): composeWithDevTools(applyMiddleware(...middlewares))
)
const render = Component =>
    ReactDOM.render(
       <AppContainer>
           <Provider store={ store }>
            <LocaleProvider locale={zhCN}>
                <Component />
             </LocaleProvider>
           </Provider>
      </AppContainer>,
       document.getElementById('root')
    )

render(Routers)

if(module.hot) {
  module.hot.accept('./app', () => {
      const NextRootContainer = require('./app').default
      render(NextRootContainer)
  })
}

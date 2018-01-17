import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './features/configureStore';
import routers from './features/routers';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
    <Provider store={ store }>
      <Router routes={ routers } history={ history } />
    </Provider>,
    document.getElementById('j-webapp')
);

import { asyncComponent } from 'react-async-component';
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import DimrayTheme from './layout/dimrayTheme';

import Home from'./pages/home'
import NoExist from './pages/except/404';
import NoAuth from './pages/except/403';


const Routers = <Route path="/" component={DimrayTheme}>
  <IndexRoute component={Home}></IndexRoute>
  <Route path="home" component={Home}></Route>
  <Route path="noauth" component={NoAuth} />
  <Route path="*" component={NoExist}></Route>
</Route>;
export default Routers;

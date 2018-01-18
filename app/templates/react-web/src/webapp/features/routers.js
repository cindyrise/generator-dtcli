import { asyncComponent } from 'react-async-component';
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import WebApp from './container';

import Home from'./pages/home'
import Contact from './pages/contact';
import NotFound from './pages/404';
import Noauth from './pages/noauth';

const Routers = <Route path="/" component={WebApp}>
  <IndexRoute component={Home}></IndexRoute>
  <Route path="home" component={Home}></Route>
  <Route path="contact" component={Contact}/>
  <Route path="noauth(/:notuser)" component={Noauth} />
  <Route path="*" component={NotFound}></Route>
</Route>;
export default Routers;

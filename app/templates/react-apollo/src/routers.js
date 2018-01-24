import React from 'react'
import { Route, Router } from 'react-router-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import createHistory from 'history/createHashHistory'
import Layout from './layout'
const history = createHistory()

import asyncComponent from './asyncCom'

import ChildrenMap from './components/childrenMap'
import Home from 'containers/home';
import Login from 'containers/login';

export default class Routers extends React.Component {

    componentDidMount() {
    }
    render() {
        return (
            <Router history={history}>
                <Route render={({ location }) => {
                    return (
                            <Layout title={this.props.navTitle}>
                                <ChildrenMap key={location.pathname}>
                                    <Route location={location} exact path="/" component={Home} />
                                    <Route location={location} path="/login" component={Login} />
                                </ChildrenMap>
                            </Layout>
                    )
                }} />
            </Router>
        );
    }
}
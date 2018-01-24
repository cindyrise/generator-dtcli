import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Route, Router } from 'react-router-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import createHistory from 'history/createBrowserHistory'
import Header from './components/header/header'
import * as global from 'actions/global'
import asyncComponent from './asyncCom'

import ChildrenMap from './components/childrenMap'
import Home from 'containers/home';
import Login from 'containers/login'
const Search = asyncComponent(() => import("./containers/search"));

const history = createHistory()
const location = history.location;
const unlisten = history.listen((location, action) => {
    if (window._maq) {
        window._maq.trigger(['_pageview', location.pathname])
    }
})
@connect(
    state => { return { ...state.global } },
    dispatch => bindActionCreators(global, dispatch)
)
export default class Routers extends React.Component {

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.props.currentAnimate('normal')
        })
        this.props.getPublishGroup({});
        this.props.getAreaList({});
    }
    render() {
        const { animateCls } = this.props
        return (
            <Router history={history}>
                <Route render={({ location }) => {
                    return (
                        <CSSTransitionGroup
                            transitionName="normal"
                            transitionEnter={true}
                            transitionLeave={true}
                            transitionEnterTimeout={400}
                            transitionLeaveTimeout={400}
                        >
                            {location.pathname.indexOf('login') > -1 ? <Route location={location} path="/login" component={Login} /> :
                                <Header title={this.props.navTitle}>
                                    <ChildrenMap key={location.pathname}>
                                        <Route location={location} exact path="/" component={Home} />
                                        <Route location={location} path="/search" component={Search} />
                                    </ChildrenMap>
                                </Header>}
                        </CSSTransitionGroup>
                    )
                }} />
            </Router>
        );
    }
}
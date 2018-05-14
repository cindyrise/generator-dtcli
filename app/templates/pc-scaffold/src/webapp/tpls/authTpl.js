import React from "react";
import { connect } from "react-redux";
import { Layout, Icon } from "antd";
import classnames from "classnames";
import * as global from '../pages/global/action'
import { bindActionCreators } from 'redux'
import { Route, Switch } from "react-router-dom";
const { Footer } = Layout;
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';


@connect(
  state => ({ ...state.global }),
  dispatch => bindActionCreators({ ...global}, dispatch)
)
export default class AuthTpl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
  }
  render() {
    const { match } = this.props;
    let { pathname, hash } = window.location;
    const { isInIframe, isSiderShow } = this.state;
    return (
      <Layout>
        <Switch>
            <Route exact path={`${match.path}/login`} component={Login}></Route>
            <Route  path={`${match.path}/register`} component={Register}></Route>
        </Switch>
      </Layout>
    );
  }
}

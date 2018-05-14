import React from "react";
import { connect } from "react-redux";
import { Layout, Icon } from "antd";
import classnames from "classnames";
import { bindActionCreators } from 'redux'
import { Route, Switch } from "react-router-dom";
const { Footer } = Layout;
import UserList from '../pages/user/list';

export default class UserTpl extends React.Component {
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
        <div className="content">
        <Switch>
            <Route exact path={`${match.path}`} component={UserList}></Route>
            {/* <Route  path={`${match.path}/profile`} component={Profile}></Route> */}
        </Switch>
        </div>
    );
  }
}

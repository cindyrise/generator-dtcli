import React from "react";
import { connect } from "react-redux";
import { Layout, Icon } from "antd";
import classnames from "classnames";
import TopNav from "../components/topNav";
import SideNav from "../components/sideNav";
import Foot from '../components/footer'
import * as global from "../pages/global/action";
import { bindActionCreators } from "redux";
import Home from "../pages/home";
import NoExist from "../pages/except/404";
import UserTpl from "./userTpl";
import { Route, Switch, Redirect } from "react-router-dom";


const { Footer, Content } = Layout;
@connect(
  state => ({ ...state.global }),
  dispatch => bindActionCreators({ ...global }, dispatch)
)
export default class GlobalTpl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getNavData({});
  }
  componentWillReceiveProps(nextProps) {}


  render() {
    console.log(this.props,'pppp');
    const {  navData,match, location } = this.props;

    return (
      <Layout>
        <TopNav />
        <Layout>
          <SideNav location={location}  sideData={navData}/>
          <Layout className="layout" >
          <Switch>
              <Route exact path={`${match.path}`} component={Home} />
              <Route exact path={`${match.path}/user`} component={UserTpl} />
              <Route exact path={`${match.path}/noexist`} component={NoExist} />
              <Redirect to="/app/noexist" />
            </Switch>
          </Layout>
        </Layout>
        <Foot/>
      </Layout>
    );
  }
}

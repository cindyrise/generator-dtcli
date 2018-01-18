import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Layout, Menu, Breadcrumb } from 'antd';
import { homeAction } from '../../actions/homeAction';
import { isEmpty } from 'lodash';
import moment from 'moment';
moment.locale('zh-cn');
import assign from 'object-assign';
import './style.scss';

const { Header, Content, Footer } = Layout;
const mapState = state => ({
  homeData: state.home.homeData,
  userData: state.home.userData,
  navData: state.home.navData,
});
const mapDispatch = dispatch => ({
  getHomeData(params) {
    dispatch(homeAction.getHomeData(params));
  },
  getUserData(params) {
    dispatch(homeAction.getUserData(params));
  },
  getNavData(params) {
    dispatch(homeAction.getNavData(params));
  },
});

@connect(mapState, mapDispatch)
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    this.props.getHomeData({});
  }
  componentWillReceiveProps(nextProps) {
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }

  render() {
    return (
      <Layout className="layout">
        <div style={{ height: "900px","padding":"20px"}}>
         <div style={{color:"blue",fontSize:"24px"}}>this is home!!! </div>
          <ul>
            {this.props.homeData.map((item,idx) => (<li key={idx}>{item.name}</li>))}
          </ul>
        </div>
        <Footer style={{ textAlign: 'center' }}>
          home ©2016 Created by charles
      </Footer>
      </Layout>
    )
  }
}
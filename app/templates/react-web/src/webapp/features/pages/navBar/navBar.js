import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col } from 'antd';
import { navBarAction } from '../../actions/navBarAction';
import { isEmpty } from 'lodash';
import assign from 'object-assign';
import './style.scss';

const mapState = state => ({
  navBarData: state.navBar.navBarData,
});
const mapDispatch = dispatch => ({
  getNavBarData(params) {
    dispatch(navBar.getNavBarData(params));
  },
});

@connect(mapState, mapDispatch)
export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }
  render() {
    return (
      <div className="content">
        恭喜，NavBar主页新建成功,你可以对页面DIY了.
      </div>
    )
  }
}

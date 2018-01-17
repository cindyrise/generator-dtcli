import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col } from 'antd';
import { personCenterAction } from '../../actions/personCenterAction';
import { isEmpty } from 'lodash';
import assign from 'object-assign';
import './style.scss';

const mapState = state => ({
  personCenterData: state.personCenter.personCenterData,
});
const mapDispatch = dispatch => ({
  getPersoncenterData(params) {
    dispatch(personCenter.getPersoncenterData(params));
  },
});

@connect(mapState, mapDispatch)
export default class Personcenter extends Component {
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
      <div style={{margin:"0 auto",width:"100%",fontSize:"24px"}}>
        恭喜，Personcenter主页新建成功,你可以对页面DIY了.
      </div>
    )
  }
}

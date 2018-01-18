import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col } from 'antd';
import { persosAction } from '../../actions/persosAction';
import { isEmpty } from 'lodash';
import assign from 'object-assign';
import './style.scss';

const mapState = state => ({
  persosData: state.persos.persosData,
});
const mapDispatch = dispatch => ({
  getPersosData(params) {
    dispatch(persos.getPersosData(params));
  },
});

@connect(mapState, mapDispatch)
export default class Persos extends Component {
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
        恭喜，Persos主页新建成功,你可以对页面DIY了.
      </div>
    )
  }
}

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col } from 'antd';
import { ttlAction } from '../../actions/ttlAction';
import { isEmpty } from 'lodash';
import assign from 'object-assign';
import './style.scss';

const mapState = state => ({
  ttlData: state.ttl.ttlData,
});
const mapDispatch = dispatch => ({
  getTtlData(params) {
    dispatch(ttl.getTtlData(params));
  },
});

@connect(mapState, mapDispatch)
export default class Ttl extends Component {
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
        恭喜，Ttl主页新建成功,你可以对页面DIY了.
      </div>
    )
  }
}

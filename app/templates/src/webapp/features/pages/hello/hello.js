import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col } from 'antd';
import { helloAction } from '../../actions/helloAction';
import { isEmpty } from 'lodash';
import assign from 'object-assign';
import './style.scss'

const mapState = state => ({
  helloData: state.hello.helloData,
});
const mapDispatch = dispatch => ({
  getHelloData(params) {
    dispatch(hello.getHelloData(params));
  },
});

@connect(mapState, mapDispatch)
export default class Hello extends Component {
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
        恭喜，Hello主页新建成功,你可以对页面DIY了.
      </div>
    )
  }
}

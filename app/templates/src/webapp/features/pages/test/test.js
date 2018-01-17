import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col } from 'antd';
import { testAction } from '../../actions/testAction';
import { isEmpty } from 'lodash';
import assign from 'object-assign';
import './style.scss';

const mapState = state => ({
  testData: state.test.testData,
});
const mapDispatch = dispatch => ({
  getTestData(params) {
    dispatch(test.getTestData(params));
  },
});

@connect(mapState, mapDispatch)
export default class Test extends Component {
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
        这是test主页
      </div>
    )
  }
}

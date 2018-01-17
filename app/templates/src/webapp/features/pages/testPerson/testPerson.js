import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col } from 'antd';
import { testPersonAction } from '../../actions/testPersonAction';
import { isEmpty } from 'lodash';
import assign from 'object-assign';
import './style.scss';

const mapState = state => ({
  testPersonData: state.testPerson.testPersonData,
});
const mapDispatch = dispatch => ({
  getTestpersonData(params) {
    dispatch(testPerson.getTestpersonData(params));
  },
});

@connect(mapState, mapDispatch)
export default class Testperson extends Component {
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
        恭喜，Testperson主页新建成功,你可以对页面DIY了.
      </div>
    )
  }
}

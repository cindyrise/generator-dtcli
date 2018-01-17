import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col } from 'antd';
import './style.scss';
export default class Noauth extends Component {
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
      <div className="noauth-bg">
        <div className="wrapper wrapper-content noauth_wrap">
          <div className="noauth_box"></div>
        </div>
      </div>
    )
  }
}

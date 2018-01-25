import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Layout, Menu, Breadcrumb } from "antd";
import { smallCamelAction } from './action';
import { isEmpty } from 'lodash';
import assign from 'object-assign';
import './style.scss';

const { Header, Content, Footer } = Layout;
const mapState = state => ({
  smallCamelData: state.smallCamel.smallCamelData,
});
const mapDispatch = dispatch => ({
  getbigCamelData(params) {
    dispatch(smallCamel.getbigCamelData(params));
  },
});

@connect(mapState, mapDispatch)
export default class bigCamel extends Component {
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
      <Layout className="layout">
      <div style={{ height: "900px", padding: "20px" }}>
        <div
          style={{
            color: "blue",
            fontSize: "24px",
            marginTop: "230px",
            textAlign: "center"
          }}
        >
         恭喜，bigCamel主页新建成功 , DIY YOUE CODE !!!.   
        </div>
      </div>
    </Layout>      
    )
  }
}

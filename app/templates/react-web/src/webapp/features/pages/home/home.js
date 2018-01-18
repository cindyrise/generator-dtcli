import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col } from 'antd';
import { homeAction } from '../../actions/homeAction';
import { isEmpty } from 'lodash';
import moment from 'moment';
moment.locale('zh-cn');
import assign from 'object-assign';
import './style.scss';

const mapState = state => ({
  homeData: state.home.homeData,
});
const mapDispatch = dispatch => ({
  getHomeData(params) {
    dispatch(homeAction.getHomeData(params));
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
  }
  componentWillReceiveProps(nextProps) {
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }
  navData = [
    {
      title: "Email(公司邮箱)",
      url: 'http://mail.dtstack.com/'
    },
    {
      title: "Gitlab(Git仓库)",
      url: 'http://git.dtstack.cn/'
    },
    {
      title: "Confluece(团队知识库)",
      url: "http://confluence.dev.dtstack.cn/"
    },
    {
      title: "Nexus(Maven私服)",
      url: 'http://nexus.dev.dtstack.cn/nexus'
    },
    {
      title: "Redmine(缺陷管理)",
      url: 'http://redmine.prod.dtstack.cn/'
    },
    {
      title: "SonarQube(Quality Gate)",
      url: 'http://172.16.8.229:9000/'
    },
    {
      title: "Jenkins(自动化神器)",
      url: 'http://172.16.8.229:8080/'
    },
    {
      title: "瓦力部署(部署神器)",
      url: 'http://172.16.10.111/'
    },
    {
      title: "API管理",
      url: 'http://172.16.10.111:8989/yongli'
    },
    {
      title: "TestLink(测试用例管理)",
      url: 'http://172.16.10.111:8080/testlink/'
    },
  ]
  render() {
    let navData = LOGAPICONF.navData;
    return (
      <div className="self-navigator gutter-example">
        <div className="nav-des" style={{ width: "100%", textAlign: "center" }}>公司内部网址导航</div>
        <Row gutter={16}>
          {
            navData.map((item, index) => (
              <Col className="gutter-row" key={index} span={6}>
                <div className="gutter-box" style={{ background: `#${Math.floor(Math.random() * (256)) + 100}` }}>
                  <a target="_blank" href={item.url}>
                    <p>{item.abbr}</p><p/>
                    <p>{item.title}</p>
                  </a></div>
              </Col>
            ))
          }
        </Row>
      </div>
    )
  }
}

import React from "react";
import { connect } from "react-redux";
import { Layout, Icon } from "antd";
import classnames from "classnames";

import TopNav from "../components/topnav";
import SiderNav from "../components/siderNav";
import { globalAction } from "../pages/global/action";
import "../assets/styles/main.scss";
const { Footer } = Layout;

@connect(
  state => ({
    isFullScreen: false,
    theme: 1,
    navData: state.global.navData
  }),
  dispatch => ({
    getUserData(params) {
      dispatch(globalAction.getUserData(params));
    },
    getNavData(params) {
      dispatch(globalAction.getNavData(params));
    }
  })
)
export default class DimrayTheme extends React.Component {
  constructor(props) {
    super(props);
    this.props.getNavData({});
    this.props.getUserData({});
    this.state = {};
  }

  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 200);
  }

  toggleSider = () => {
    const { isSiderShow } = this.state;
    this.setState({
      isSiderShow: !isSiderShow
    });
  };

  render() {
    const { children, isFullScreen, theme, navData } = this.props;
    let { pathname, hash } = window.location;
    const { isInIframe, isSiderShow } = this.state;
    return (
      <Layout
        style={{ flexDirection: LOGAPICONF.isTopNav ? undefined : "row" }}
        className={classnames("g-dashbdapp", {
          "s-fullscreen": isFullScreen,
          "s-dark": theme === 2
        })}
      >
        {LOGAPICONF.isTopNav ? (
          <TopNav {...this.props} />
        ) : (
          <SiderNav
            curUrl={pathname + hash}
            navData={navData}
            isSiderShow={isSiderShow}
          />
        )}
        <div style={{minHeight: "900px", padding: "15px" }}>
          {children || "Ooops! we're working on it"}
        </div>
        <Footer style={{ textAlign: "center" }}>
          home ©2016 Created by charles
        </Footer>
      </Layout>
    );
  }
}

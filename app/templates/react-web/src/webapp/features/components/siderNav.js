
/**
 * Created by charlesyang on 2017/8/10.
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
import { isEmpty, cloneDeep, merge } from 'lodash';

const { SubMenu } = Menu;
const { Sider } = Layout;
export default class SiderNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultOpenKeys: [],
      defaultSelectedKeys: [],
      nav: { children: [] },
    }
  }
  componentDidMount() {
    this.setSliderMenu(this.props.navData, window.location.hash);
  }
  componentWillReceiveProps(nextProps) {
    this.setSliderMenu(nextProps.navData, window.location.hash);
    // setTimeout(() => {
    //   this.setState({
    //     isRender: true
    //   });
    // }, 10);
  }

  setSliderMenu = (settinNav, curUrl) => {
    let tempUrl = curUrl;
    let nav = settinNav;
    let loop = (data, key) => {
      data.forEach((item, index) => {
        item.key = key + index + "_";
        if (item.children.length) {
          loop(item.children, item.key);
        }
      })
    }
    loop(nav, "");
    let loopKey = data => {
      data.forEach(item => {
        if (typeof (item.url) != 'undefined' && item.url.indexOf(tempUrl) > -1) {
          this.setState({
            defaultOpenKeys: this.setOpenKeys(item.key, tempUrl),
            defaultSelectedKeys: [item.key],
          })
          return;
        }
        if (item.children.length) {
          loopKey(item.children);
        }
      })
    }
    loopKey(nav);
    this.setState({ nav: nav });
  }
  setOpenKeys = (key, url) => {
    let openKeysLen = key.length / 2, openKeysArr = [];
    for (let i = 0; i < openKeysLen; i++) {
      openKeysArr.push(key.substr(0, i * 2));
    }
    return openKeysArr;
  }
  setNavStatus = (item) => {
    this.setState({
      defaultOpenKeys: [item.keyPath[1]],
      defaultSelectedKeys: [item.key]
    })
  }
  render() {
    let { defaultOpenKeys, defaultSelectedKeys, nav, randomKey } = this.state;
    const { isSiderShow } = this.props;
    return nav.length && isSiderShow ? <Sider style={{ background: '#fff', borderRight: '1px solid #e9edef' }}>
      <Menu
        onClick={this.setNavStatus.bind(this)}
        mode="inline"
        theme="light"
        defaultOpenKeys={defaultOpenKeys}
        selectedKeys={defaultSelectedKeys}
        style={{ height: '100%', borderRight: 0 }}
      >
        {
          nav.map((item, idx) => (
            item.children.length ?
              <SubMenu key={item.key} title={<span> <i className={item.icon}
                style={{ marginRight: idx === 0 ? 3 : 5 }}
              > </i> {item.name}</span>}>
                {
                  item.children.map((dataItem, childIdx) => (
                    dataItem.children.length ? <SubMenu key={dataItem.key} title={<span> <i className={dataItem.icon}> </i> {dataItem.name}</span>}>
                      {
                        dataItem.children.map((treeItem, childThree) => (
                          <Menu.Item key={treeItem.key}><a href={treeItem.url}> <i className={treeItem.icon}> </i> {treeItem.name}</a></Menu.Item>
                        ))
                      }
                    </SubMenu> :
                      <Menu.Item key={dataItem.key}><a href={dataItem.url}> <i className={dataItem.icon}> </i> {dataItem.name}</a></Menu.Item>
                  ))
                }
              </SubMenu> :
              <Menu.Item key={item.key}><a href={item.url}> <i className={item.icon}
                style={{ marginRight: idx === 0 ? 3 : 5 }}
              > </i> {item.name}</a></Menu.Item>
          ))
        }
      </Menu>
    </Sider> : <div></div>
  }
}

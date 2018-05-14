import React from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import classnames from 'classnames';
import { Link,NavLink } from "react-router-dom";
import './style.scss'
export default class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      selectedKeys:[],
      openKeys:[],
      sideData:[]
    };
  }

  componentDidMount() {
    console.log(this.props,'this.props');
    this.setSliderMenu(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.setSliderMenu(nextProps);
  }

  logout() {
    this.props.history.push('/auth/login');
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  setSliderMenu=(data)=>{
   const {location,sideData}=data;
   console.log(location,'match',location.path);
   let path=location.pathname;
   console.log(path,121321);
   let loop = (data, key) => {
    data.forEach((item, index) => {
      item.key = key + index + "_";
      if (item.children.length) {
        loop(item.children, item.key);
      }
    })
   }
   loop(sideData, "");
   let loopKey = data => {
      data.forEach(item => {
        if (item.permissionUrl==path) {
          this.setState({
            openKeys: this.setOpenKeys(item.key, path),
            selectedKeys: [item.key],
          })
          return;
        }
        if (item.children.length) {
          loopKey(item.children);
        }
      })
    }
  loopKey(sideData);
  this.setState({ sideData });
}
  setOpenKeys = (key, url) => {
    let openKeysLen = key.length / 2, openKeysArr = [];
    for (let i = 0; i < openKeysLen; i++) {
      openKeysArr.push(key.substr(0, i * 2));
    }
    return openKeysArr;
  }
  setKeys=(item)=>{
    this.setState({
      selectedKeys: [item.key]
    })
  }
  openKeys=(openKeys)=>{
    this.setState({
      openKeys:openKeys
    })
  }
  render() {
    const {sideData,openKeys,selectedKeys}=this.state;
    return  <Sider width={200} style={{ background: '#fff' }}
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
      >
     <div className="fold-btn"> 
        <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}onClick={this.toggle.bind(this)}/>
     </div>
     <Menu
          selectedKeys={this.state.selectedKeys}
          onOpenChange={this.openKeys}
          openKeys={this.state.openKeys}
          onClick={this.setKeys.bind(this)}
          mode="inline"
          className='side-menu'
        >
           {
          sideData.map((item, idx) => (
            item.children.length ?
              <SubMenu key={item.key} title={<span><Icon type="mail" /><span>{item.permissionName}</span></span>}>
                {
                  item.children.map((dataItem) => (
                    dataItem.children.length ? <SubMenu key={dataItem.key} title={<span><Icon type="appstore" /><span>{item.permissionName}</span></span>}>
                      {
                        dataItem.children.map((childItem) => (
                          <Menu.Item key={childItem.key}>
                             <span><NavLink to={childItem.permissionUrl}>{childItem.permissionName}</NavLink></span>
                          </Menu.Item>
                        ))
                      }
                    </SubMenu> :
                      <Menu.Item key={dataItem.key}>  
                        <span><NavLink to={dataItem.permissionUrl}>{dataItem.permissionName}</NavLink></span>
                      </Menu.Item>
                  ))
                }
              </SubMenu> :
              <Menu.Item key={item.key}>
               <Icon type="pie-chart" />
               <span><NavLink to={item.permissionUrl}>{item.permissionName}</NavLink></span>
              </Menu.Item>
          ))
        }
          {/* <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>Option 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>Option 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="inbox" />
            <span>Option 3</span>
          </Menu.Item> */}
        </Menu>
  </Sider>
  }
}

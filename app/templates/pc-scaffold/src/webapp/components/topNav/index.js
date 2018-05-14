import React from 'react';
import { connect } from 'react-redux';
import { Layout, Icon, Dropdown, Menu } from 'antd';
import classnames from 'classnames';
import { Link } from "react-router-dom";
const { Header } = Layout;
import './style.scss'
import pic from '../../assets/img/self.png'

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps;
  }
  componentWillReceiveProps(nextProps) {
     console.log(nextProps);
  }
  componentDidMount() {}

  logout() {
    this.props.history.push('/auth/login');
  }

  render() {
    const { navData, location, userData } = this.props;
    const userMenu = (<Menu>
      <Menu.Item>
        <Link to="/auth/login">5.6</Link>
      </Menu.Item>
      <Menu.Item>
      <Link to="/auth/register">5.5</Link>
      </Menu.Item>
    </Menu>);

    return <Header className="top-nav">
      <div className="logo">
        <Link to="/app">
          <img src={ FRONT_CONF.COMPANY_LOGO } alt="logo"/>
        </Link>
      </div>
      <div className="top-nav-right">
       <Link to="/app/user">
         <img src={pic}/>charles
        </Link>
      </div>
      <div className="top-nav-right">
        <Dropdown overlay={ userMenu } trigger={["click"]}>
            <a>{ 5.5} <Icon type="down" /></a>
        </Dropdown>
      </div>
    </Header>
  }
}

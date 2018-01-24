import React from 'react'
import { Drawer, List, NavBar, Icon, SearchBar } from 'antd-mobile';
import navData from '../../constants/nav.json'
import { Link } from 'react-router-dom'
import ListItem from '../listItem'
import './header.scss'

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        //this.setDrawer(false);
    }
    
    render() {
        return (<div style={{ marginBottom: "30px" }}>
        <div><Test/></div>
            {this.props.children || '暂无页面内容'}
        </div>);
    }
}
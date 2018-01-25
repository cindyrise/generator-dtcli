import React from 'react'
import { Drawer, List, NavBar, Icon, SearchBar } from 'antd-mobile';
import navData from '../../constants/nav.json'
import { Link } from 'react-router-dom'
import ListItem from '../listItem'
import Search from '../../containers/search'
import EventEmitter from '../../utils/event'
import './header.scss'
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.evt = new EventEmitter();
    }
    componentDidMount() {
        this.setDrawer(false); 
        this.evt.addEvent('clickDrawer', ()=>{this.setState({open:false})});
    }
    state = {
        open: false,
        isSearch: false
    }
    bookList = [
        { id: "1", name: '老万头' },
        { id: "2", name: '冰与火之歌' },
    ]
    onOpenChange = (...args) => {
        let flag = !this.state.open;
        this.setDrawer(flag);
        if (flag) {
            this.setBodyOverflowHidden();
        } else {
            this.revertBodyOverflowHidden();
        }
        this.setState({ open: flag });
    }

    //页面遮罩层，并且阻止页面body滚动
    setBodyOverflowHidden() {
        document.getElementsByClassName('am-drawer-overlay')[0].addEventListener('touchmove', this.disEvent.bind(this));
    }
    disEvent = (e) => {
        e.preventDefault();
    }
    //恢复body原有状态
    revertBodyOverflowHidden() {
        document.getElementsByClassName('am-drawer-overlay')[0].removeEventListener('touchmove', this.disEvent.bind(this));
    }
    setDrawer = (flag) => {
        let display = flag ? "block" : "none";
        let el = document.getElementsByClassName('am-drawer-sidebar');
        el[0].style.display = display;
    }
    onChange = (searchTxt) => {
        let isSearch = searchTxt.length;
        //这里获取booklist
        this.setState({ isSearch,searchTxt });
    }
    getNavData = () => {
        return navData.map((item, index) => {
            return (<Link key={index} to={item.url} onClick={this.onOpenChange}><List.Item
            >{item.name}</List.Item></Link>);
        })
    }
    getListItem = (data) => {
        return (<ul className="book">
            {data.map((item, index) => (
                <li style={{borderBottom:index==this.bookList.length-1?"none":"1px solid #ddd"}} key={index} onClick={this.onOpenChange} className="book-list"><Link to={`/itemanalysis/${item.id}/${item.name}`}>{item.name}</Link></li>
            ))}
        </ul>)
    }
    render() {
        const { title } = this.props;
        const { open, isSearch,searchTxt } = this.state;
        const sidebar = (<List className="header-list">
            <SearchBar className="nav-search"
                ref={ref => this.autoFocusInst = ref}
                placeholder="单品搜索"
                showCancelButton
                onChange={this.onChange}
            />
            {isSearch ?<Search  searchTxt={searchTxt}  evt={this.evt}/> :
                <div>{this.getNavData()}</div>}
        </List>);
        let _this = this;
        return (<div style={{ marginBottom: "10px" }}>

            <Drawer
                className="header-drawer"
                style={{ minHeight: document.documentElement.clientHeight }}
                enableDragHandle
                contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: "45px" }}
                sidebar={sidebar}
                open={this.state.open}
                position="right"
                onOpenChange={this.onOpenChange}
            >
                <div className="header-nav">
                    <NavBar className="header-bar"
                        icon={<Icon type="left" />}
                        onLeftClick={() => window.history.back()}
                        rightContent={[
                            <Link key="1" to={`/search?`}><i className="iconfont icon-search" aria-hidden="true" /></Link>,
                            <Link key="2" to="/personcenter"><i className="iconfont icon-person" aria-hidden="true" /></Link>,
                            <i key="3" onClick={this.onOpenChange} className="iconfont icon-list" aria-hidden="true" />
                        ]}><span className="nav-title">{title}</span></NavBar></div>
                {this.props.children || '暂无页面内容'}
            </Drawer>
        </div>);
    }
}
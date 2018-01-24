import React from 'react'
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as global from 'actions/global'
import * as list from 'actions/list'
import './style.scss'
@connect(
    state => ({ ...state.list }),
    dispatch => bindActionCreators({ ...global, ...list }, dispatch)
)
export default class Search extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        bookList: [
            { id: "1", name: '老万头' },
            { id: "2", name: '冰与火之歌' },
        ]
    }
    componentDidMount() {
        if (!this.props.searchTxt) {
            this.props.curNavTitle('搜索');
            this.autoFocusInst.focus();;
        } else {
            //this.props.searchTxt
            //this.props.getSearchList(params);
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps, 'nextProps');
        if (nextProps.searchTxt != this.state.searchTxt) {
            //this.props.getSearchList(params);
            this.setState({ searchTxt: nextProps.searchTxt })
        }
    }
    onChange = (value) => {
        // console.log(value);
        this.setState({ value });
        //this.props.getSearchList();//获取搜列表
    };
    clickDrawer = () => {
        if (this.props.searchTxt) {
            const { evt } = this.props;
            evt.emitEvent('clickDrawer', 'test', this);
        }
    }
    render() {
        const { bookList } = this.state;
        const { searchTxt } = this.props;
        return (<div className="search-content">
            {!searchTxt ?
                <SearchBar className="nav-search"
                    ref={ref => this.autoFocusInst = ref}
                    placeholder="单品搜索"
                    showCancelButton
                    onChange={this.onChange}
                /> : null}

            <ul className="book">
                {bookList.map((item, index) => (
                    <li key={index} className="book-list" onClick={this.clickDrawer}><Link to={`/itemanalysis/${item.id}/${item.name}`}>{item.name}</Link></li>
                ))}
            </ul>
        </div>);
    }
}
import React from 'react'
import { findDOMNode } from 'react-dom';
import { Menu, ActivityIndicator, Icon } from 'antd-mobile';
import moment from 'moment';
import './style.scss'
export default class DropMenu extends React.Component {
    constructor(...args) {
        super(...args);
    }
    componentWillMount() {
    }
    render() {
        const { data, label, changeItem, isMask, maskClick } = this.props;
        const menuEl = (
            <Menu
                className="single-foo-menu"
                data={data}
                level={1}
                onChange={changeItem.bind(this)}
            />
        );
        return (
            <div style={{display:'inline-block'}}>
                <div onClick={maskClick} className="dropMenu-label">
                    {label} <span className="drop-icon"><Icon type="down" size="xs" /></span>
                </div>
                {isMask ? menuEl : null}
                {isMask ? <div className="menu-mask" onClick={maskClick} /> : null}
            </div>
        );
    }
}
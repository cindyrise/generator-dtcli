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
    // onChange = (value) => {
    //     let _this = this;
    //     const { evt } = this.props;
    //     TIME_RANGE.forEach((dataItem) => {
    //         if (dataItem.value === value[0]) {
    //             let timeRange = {
    //                 range: dataItem.creator().map(item => moment(item).format('YYYY-MM-DD HH:mm:ss')),
    //                 lable: dataItem.label
    //             }
    //             this.setState({
    //                 show: !this.state.show,
    //                 timeRange: timeRange
    //             });
    //             evt.emitEvent('dropMenu', timeRange, this);
    //             return;
    //         }
    //     });
    // }
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
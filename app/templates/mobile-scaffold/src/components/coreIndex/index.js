import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { List, Flex, Icon, WhiteSpace } from 'antd-mobile';
import './style.scss';
export default class CoreIndex extends React.Component {
    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        //例子：this.myfunction = this.myfunction.bind(this)
        //this.handleClick = this.handleClick.bind(this)
    }

    render() {
        const tempTime = '(2017-01-01-2017-01-07)';
        return (
            <div className="core-index">
                <Flex>
                    <Flex.Item>
                        <div className="core-des">累计销售码洋（万）</div>
                        <div className="core-figure">12.35</div>
                        <div className="core-percent">
                            <span>121.23%</span>
                            <i style={{ margin: "auto 5px" }} className="fa fa-caret-down" aria-hidden="true"></i>
                            <span className="percent-des">同比去年</span>
                        </div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className="core-des">动销品种（万）</div>
                        <div className="core-figure">12.35</div>
                        <div className="core-percent">
                            <span>121.23%</span>
                            <i style={{ margin: "auto 5px" }} className="fa fa-caret-down" aria-hidden="true"></i>
                            <span className="percent-des">同比去年</span>
                        </div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className="core-des">新书品种</div>
                        <div className="core-figure">12.35</div>
                        <div className="core-percent">
                            <span>121.23%</span>
                            <i style={{ margin: "auto 5px" }} className="fa fa-caret-down" aria-hidden="true"></i>
                            <span className="percent-des">同比去年</span>
                        </div>
                    </Flex.Item>
                </Flex>
            </div>)
    }
}
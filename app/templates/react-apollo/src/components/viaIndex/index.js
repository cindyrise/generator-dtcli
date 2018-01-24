import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { List, Flex, Icon, WhiteSpace } from 'antd-mobile';
import './style.scss';
export default class ViaIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { data } = this.props;
        return (
            <div className="core-index">
                <Flex>
                    {data.map((item, index) => (
                        <Flex.Item key={index}>
                            <div className="core-des">{item.field}</div>
                            <div className="core-figure">{item.value}</div>
                            {item.percent ? <div className="core-percent">
                                <span>{item.percent}</span>
                                <span className="triangle-up"></span> 
                                 {/* <i className="triangle-dowm"></i> */}
                                <span className="percent-des">同比去年</span>
                            </div> : null}
                        </Flex.Item>
                    ))}
                </Flex>
            </div>)
    }
}
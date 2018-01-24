import React from 'react'
import { NavBar, Icon, List, Flex } from 'antd-mobile';
import navData from '../../constants/nav.json'
import { Link } from 'react-router-dom'
import './style.scss'
export default class Table extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }

    render() {
        const { thHeader, tbBody, len } = this.props.tbData;
        const tdList = () => {
            switch (len) {
                case 3:
                    return tbBody.map((item, index) => (
                        <Flex key={index} className="tb-body">
                            <Flex.Item className="td-title">{item.td_1_url ? <Link to={item.td_1_url}>{item.td_1}</Link> : item.td_1}</Flex.Item>
                            <Flex.Item>{item.td_2_url ? <Link to={item.td_2_url}>{item.td_2}</Link> : item.td_2}</Flex.Item>
                            <Flex.Item>{item.td_3_url ? <Link to={item.td_3_url}>{item.td_3}</Link> : item.td_3}</Flex.Item>
                        </Flex>));
                case 4:
                    return tbBody.map((item, index) => (
                        <Flex key={index} className="tb-body">
                            <Flex.Item className="td-title">{item.td_1_url ? <Link to={item.td_1_url}>{item.td_1}</Link> : item.td_1}</Flex.Item>
                            <Flex.Item>{item.td_2_url ? <Link to={item.td_2_url}>{item.td_2}</Link> : item.td_2}</Flex.Item>
                            <Flex.Item>{item.td_3_url ? <Link to={item.td_3_url}>{item.td_3}</Link> : item.td_3}</Flex.Item>
                            <Flex.Item>{item.td_4_url ? <Link to={item.td_4_url}>{item.td_4}</Link> : item.td_4}</Flex.Item>
                        </Flex>));
                case 0:
                    return (<Flex key={index} className="tb-body">
                        <Flex.Item><span>暂无数据</span></Flex.Item>
                    </Flex>);

            }
        }
        return (<div>
            <Flex className="th-header">
            {thHeader.map((item,index)=>( <Flex.Item key={index}>{item}</Flex.Item>))}
            </Flex>
            {tdList()}
        </div>);
    }
}
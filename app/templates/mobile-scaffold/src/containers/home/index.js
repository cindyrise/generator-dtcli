
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as home from 'actions/home'
import * as global from 'actions/global'
import { List, Flex, Icon, WhiteSpace } from 'antd-mobile';
import Bar from '../../components/chart/bar'
import ViaIndex from '../../components/viaIndex'
import Table from '../../components/table'
import NoData from '../../components/noData'
const Item = List.Item;
import './style.scss'

/**
 * connect中间件
 * connect一定要写在需要传递参数的组件头部，因为这是语法规则，只对当前关联的组件生效，和java的原理是一致的
 * state用法：state => state（传递全部state）， {return {...state.home, ...state.global}}（n个state）
 * dispatch用法：（单个action）bindActionCreators(navActions, dispatch)，（多个action）bindActionCreators({...action1, ...action2}, dispatch)
 */

@connect(
    state => ({ ...state.home }),
    dispatch => bindActionCreators({ ...home, ...global }, dispatch)
)
export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }
    state = {
        saleAlert:
            {
                thHeader: ["书名", "脱销发行集团", "脱销门店"],
                tbBody: [],
                len: 3
            },
        dataExcept: {
            thHeader: ["异常发行公司", "销售码洋（万）", "码洋波动"],
            tbBody: [],
            len: 3
        },
        viaIndex: [
            {
                field: '累计销售码洋（万）',
                value: '1125',
                percent: "13%"
            },
            {
                field: '动销品种（万）',
                value: '0.45',
                percent: "12%"
            },
            {
                field: '新书品种',
                value: '23',
                percent: "66%"
            }
        ],
        trendData: []
    }
    componentDidMount() {
        this.props.curNavTitle('首页');
        //this.props.getHomeInfo({ centId: '1213123131', saleDate: '201701' });//模拟集团信息
        console.log(this.props, '121312312');
        this.initData(this.props.homeInfo)
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps, 'home');
    }

    initData = (data) => {
        try {
            let viaIndex = this.state.viaIndex, alertBody = [], exceptBody = [], trendData = [];
            // viaIndex[0].value = data.centCoreVo.salePriceDeal || 0;
            // viaIndex[1].value = data.centCoreVo.saleCntDeal || 0;
            // viaIndex[2].value = data.centCoreVo.purCntDeal || 0;
            //脱销告警
            data.saleAlert.forEach(item => {
                let tempObj = {};
                tempObj.td_1 = '原则';
                tempObj.td_2 = '1'|| '--';
                tempObj.td_2_url = `/itemAnalysis/${item.bkId || -13}/${item.bkName}`;
                tempObj.td_3 = item.saleCntDeal || 0;
                tempObj.td_3_url = `/itemList/${item.bkName || '无'}`;
                alertBody.push(tempObj);
            })
            let saleAlert = this.state.saleAlert;
            saleAlert.tbBody = alertBody;
            //数据异常
            data.dataExcept.forEach(item => {
                let tempObj = {};
                tempObj.td_1 = item.bkName || "--";
                tempObj.td_1_url = `/exceptList/${item.bkName}`;
                tempObj.td_2 = parseInt(Math.random() * 100);
                tempObj.td_3 = parseInt(Math.random() * 100);
                exceptBody.push(tempObj);
            })
            let dataExcept = this.state.dataExcept;
            dataExcept.tbBody = exceptBody;
            let tempMy=[95,101,82,75,62,98];
            ['07','08','09','10','11','12'].forEach((item,index) => {
                let tempObj = {};
                tempObj.category = item.saleDate || `2017-${item}`;
                tempObj.val =tempMy[index]//item;// item.salePrice || 5;
                trendData.push(tempObj);
            })
            console.log(trendData, saleAlert, dataExcept);
            this.setState({ trendData, saleAlert, dataExcept })
        } catch (e) {

        }
    }
    componentWillMount() {
    }

    handleClick() {
        //该函数用来执行组件内部的事件，比如在这里就是nav组件菜单的导航点击事件
        // this.props.history.push('/')
    }

    render() {
        const { navMain, bookDetails } = this.props;
        const { saleAlert, dataExcept, viaIndex, trendData } = this.state;
        const tempTime = '(2017-07-01-2017-12-31)'
        return (
            
            <div className="list-border-hide">
                <WhiteSpace size="lg" />
                <div className="title-des"><span className="title-line" ></span>核心指标<span className="list-title"> {tempTime}</span></div>
                <ViaIndex data={viaIndex}></ViaIndex>
                <WhiteSpace size="lg" />
                <div className="title-des"><span className="title-line" ></span>销售趋势<span className="list-title"> {tempTime}</span></div>
                <div className="chart-bg">
                {trendData.length ? <Bar  config={{ ylable: '码洋（万)' }} data={trendData} flag={Math.random() * 10} /> : <NoData />}
                </div>
                <WhiteSpace size="lg" />
                <div className="title-des"><span className="title-line" ></span>脱销告警<span className="list-title"> {tempTime}</span></div>
                <Table tbData={saleAlert} />
                <div className="title-des"><span className="title-line" ></span>异常品种<span className="list-title"></span></div>
                <Table tbData={dataExcept} />
            </div>
        )
    }
}

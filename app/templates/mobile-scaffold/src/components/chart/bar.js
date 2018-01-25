import React from 'react'
import { findDOMNode } from 'react-dom';
import { Drawer, List, NavBar, Icon, Flex } from 'antd-mobile';
import F2 from './index'
import './style.scss'
export default class Bar extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.drawChart()
        window.addEventListener('resize', this.drawChart.bind(this));
    }
    componentWillReceiveProps(nextProps) {
        this.drawChart()
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.drawChart.bind(this));
    }
    drawChart = () => {
        let domE = document.getElementById('bar_' + this.props.flag);
        if (!domE) return;
        const { data } = this.props;
        const chart = new F2.Chart({
            el: domE, // 指定图表容器 ID 
            padding: [10, 10, 30, 40],
            width: window.screen.availWidth
        });
        chart.source(data, {
            category: {
                tickCount: 5,
            },
            val: {
                tickCount: 5,
                min:0
            }
        });
        chart.axis('category', {
            label: {
                fontSize: 12
            },
            grid: null,
            line:{
                lineWidth:.5
            }
        });
        chart.axis('val', {
            label: (text, index, total) => {
                const cfg = {
                  fill: '#979797',
                  font: '12px san-serif',
                  offset: 6
                };
                if (index === 0) {
                  cfg.textAlign = 'left';
                }
                if (index > 0 && index === total - 1) {
                  cfg.textAlign = 'right';
                }
                //cfg.text = text + '%';  // cfg.text 支持文本格式化处理
                return cfg;
              },
            grid: null,
        });
        //chart.rotate(20*Math.PI/180);
        chart.interval().position('category*val').color(' #1A76D2');
        // Step 4: 渲染图表
        chart.render();
    }
    render() {
        const { flag, config } = this.props
        return (
            <div className="chart-container">
                <div className="y-lable">{config.ylable}</div>
                <canvas style={{ height: "180px" }} id={`bar_${flag}`}></canvas>
            </div>
        )
    }
}
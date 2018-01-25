import React from 'react'
import { findDOMNode } from 'react-dom';
import { Drawer, List, NavBar, Icon, Flex } from 'antd-mobile';
import F2 from './index'
export default class Biax extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.drawChart();
    window.addEventListener('resize', this.drawChart.bind(this));
  }
  componentWillReceiveProps(nextProps) {
    this.drawChart()
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.drawChart.bind(this));
  }
  drawChart = () => {
    const { data } = this.props;
    let domE=document.getElementById('biax_' + this.props.flag);
    if(!domE)return;
    const chart = new F2.Chart({
      el:domE,
      width: window.screen.availWidth,
      padding: [20, 40, 40, 50],
    });

    chart.source(data, {
      valYL: {
        tickCount: 5,
      },
      valYR: {
        tickCount: 5,
      },
      valX: {
        tickCount: 4,
      }
    });
    // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
    chart.axis('valX', {
      label: {
        fontSize: 10
      },
      grid: null,
      line:{
        lineWidth:.5
    }
    });
    chart.axis('valYL', {
      label: {
        fontSize: 10
      },
      grid: null
    });
    chart.axis('valYR', {
      label: {
        fontSize: 10
      },
      grid: null
    });
    chart.interval().position('valX*valYL').color(' #1A76D2');;
    chart.line().position('valX*valYR')
      .color('#26DAD2')
      .size(1)
      .shape('smooth');
    chart.point().position('valX*valYR').color('#26DAD2');
    chart.render();
  }
  render() {
    const { flag } = this.props;
    return (
      <div className="chart-container">
        <Flex className="biax-unit">
          <Flex.Item>码洋（万）</Flex.Item>
          <Flex.Item>占比（%）</Flex.Item>
        </Flex>
        <canvas style={{ height: "180px" }} id={`biax_${flag}`}></canvas>
        <div className="biax-legend">
          <span>销售码洋</span>
          <span style={{ display: "inline-block", width: "25px" }}></span>
          <span>码洋同比</span>
        </div>
      </div>

    )
  }
}
import React from 'react'
import { findDOMNode } from 'react-dom';
import { Drawer, List, NavBar, Icon, Flex } from 'antd-mobile';
import F2 from './index'
export default class Line extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.drawChart();
    window.addEventListener('resize', this.drawChart.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.drawChart.bind(this));
  }
  drawChart = () => {
    const data = [
      { time: '2016-08-08 00:00:00', tem: 10 },
      { time: '2016-08-08 00:10:00', tem: 22 },
      { time: '2016-08-08 00:30:00', tem: 20 },
      { time: '2016-08-09 00:35:00', tem: 26 },
      { time: '2016-08-09 01:00:00', tem: 20 },
      { time: '2016-08-09 01:20:00', tem: 26 },
      { time: '2016-08-10 01:40:00', tem: 28 },
      { time: '2016-08-10 02:00:00', tem: 20 },
      { time: '2016-08-10 02:20:00', tem: 28 }
    ];
    const chart = new F2.Chart({
      el: document.getElementById('line_' + this.props.flag), // 指定图表容器 ID 
      padding: [20, 10, 50, 40],
      width: window.screen.availWidth
    });
    const defs = {
      time: {
        type: 'timeCat',
        tickCount: 3,
        range: [0, 1]
      },
      tem: {
        tickCount: 5,
        min: 0
      }
    };
    // 配置time刻度文字样式
    const label = {
      fill: '#979797',
      font: '14px san-serif',
      offset: 6
    };
    chart.axis('time', {
      label(text, index, total) {
        const cfg = label;
        // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
        if (index === 0) {
          cfg.textAlign = 'start';
        }
        if (index > 0 && index === total - 1) {
          cfg.textAlign = 'end';
        }
        return cfg;
      }
    });
    // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
    chart.axis('tem', {
      label: {
        fontSize: 14
      }
    });
    chart.source(data, defs);
    chart.line().position('time*tem').shape('smooth');
    chart.point().position('time*tem');
    chart.render();
  }
  render() {
    const { flag } = this.props;
    return (
      <canvas style={{ height: "180px" }} id={`line_${flag}`}></canvas>
    )
  }
}
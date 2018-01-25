import React from 'react'
import { findDOMNode } from 'react-dom';
import { Drawer, List, NavBar, Icon, Flex } from 'antd-mobile';
import F2 from './index'
export default class Pie extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.drawChart();
    window.addEventListener('resize', this.drawChart.bind(this));
  }
  componentWillMount() {

  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.drawChart.bind(this));
  }
  drawChart = () => {
    const data = [
      { flag: '1', val: 0.3, key: '1' },
      { flag: '1',val: 0.3, key: '2' },
      { flag: '1', val: 0.4, key: '3' }
    ];

    const chart = new F2.Chart({
      el: document.getElementById('pie_' + this.props.flag), // 指定图表容器 ID 
      width: window.screen.availWidth,
      padding: [20, 0, 10, 0]
    });

    chart.source(data);

    chart.coord('polar', {
      transposed: true,
      inner: 0.5
    });
    chart.axis(false);
    chart.interval().position('flag*val').color('key').adjust('stack');
    chart.animate({
      type: 'wavec'
    });
    chart.render();
  }
  render() {
    const { flag } = this.props
    //console.log(flag, 99900);
    return (
      <canvas style={{ height: "180px" }} id={`pie_${flag}`}></canvas>
    )
  }
}
import React from 'react'

import echarts from './index'
import 'echarts/lib/component/geo'
import 'echarts/lib/chart/map' //引入地图
import 'echarts/lib/chart/lines'
import 'echarts/map/js/china' // 引入中国地图
import {fromJS} from 'immutable'
import ReactResizeDetector from 'react-resize-detector';
import { isInteger } from 'lodash';
export default class MapChart extends React.Component {
  
  constructor(props) {
    super(props)
  }
  
  initChart=()=> {
    const { option={},config={handle:''}} = this.props;
    const{chart}=this.state;
    chart.showLoading();
    chart.off('click');
    if(typeof config.handle=='function' ){
      chart.on('click',config.handle.bind(this));
    }
    chart.setOption(option);
    chart.hideLoading();
  }
  shouldComponentUpdate(nextProps,nextState){
    if(fromJS(nextProps)==fromJS(this.props)){
      return false
    }else{
      return true;
    }
  }
  componentDidMount(){
    let chart=echarts.init(this.id,'walden',{renderer: 'svg'});
    this.setState({chart},()=>{
      this.initChart();
    });
  }

  componentDidUpdate() {
    this.initChart()
  }
  componentWillUnmount(){
    const{ chart }=this.state;
    chart.dispose();
  }
  chartResize=(width)=>{
    const { chart } = this.state;
    if(chart&&isInteger(width)) chart.resize();
  }
  render() {
    let { height="300px",width="100%"} = this.props.config||{};
    return <div>
       <div ref={id => (this.id = id)}style={{width, height}} />
       <ReactResizeDetector  handleWidth handleHeight onResize={this.chartResize.bind(this)}/>
      </div>
  }
}



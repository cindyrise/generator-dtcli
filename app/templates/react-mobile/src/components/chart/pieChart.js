import React from 'react'
import { findDOMNode } from 'react-dom';
import { Drawer, List, NavBar, Icon, Flex } from 'antd-mobile';
export default class PieChart extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.drawChart();
        //window.addEventListener('resize', this.drawChart.bind(this));
    }
    componentWillReceiveProps(nextProps) {
        this.drawChart();
    }
    componentWillUnmount() {
        //window.removeEventListener('resize', this.drawChart.bind(this));
    }
    drawChart = () => {
        const canvas = document.getElementById('pie_' + this.props.flag); //获取canvas元素
        if (!canvas) return;
        
        let height = 200,width =window.screen.availWidth;
        let pixelTatio= window.devicePixelRatio || 1;
        //console.log(width,height,pixelTatio);
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.width = width * pixelTatio;
        canvas.height = height * pixelTatio;


        let context = canvas.getContext('2d'),  //获取画图环境，指明为2d
            centerX = canvas.width / 2,   //Canvas中心点x轴坐标
            centerY = canvas.height / 2,  //Canvas中心点y轴坐标
            rad = Math.PI * 2 / 100;//将360度分成100份，那么每一份就是rad度
        const { color, percent } = this.props.data;
       // window.requestAnimationFrame(this.drawChart);
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.outerCircle({ context, centerX, centerY,pixelTatio });
        this.innerCircle({ context, centerX, centerY, rad, percent, color,pixelTatio });
    }
    innerCircle = (data) => {
        const { context, centerX, centerY, percent, rad, color,pixelTatio } = data;
        context.save();
        context.strokeStyle = color; //设置描边样式
        context.lineWidth = 45; //设置线宽
        context.beginPath(); //路径开始  
        context.arc(centerX, centerY + 5, 70*pixelTatio, -Math.PI / 2, -Math.PI / 2 + percent * rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        context.stroke(); //绘制
        context.closePath(); //路径结束
        context.restore();
    }
    outerCircle = (data) => {
        const { context, centerX, centerY,pixelTatio } = data;
        context.save();
        context.beginPath();
        context.lineWidth = 45; //设置线宽
        context.strokeStyle = "#eee";
        context.arc(centerX, centerY + 5, 70*pixelTatio, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
        context.restore();
    }
    render() {
        const { flag, config, data } = this.props
        return (<div>
            <div className="pie-container">
                <canvas style={{ height: "180px" }} id={`pie_${flag}`}></canvas>
                <div className="pie-text">{data.title}</div>
            </div>
            <div className="pie-legend">
            {data.valDes}:{data.value} 万元<span></span>占比：{data.percent.toFixed(2)} %
            </div>
        </div>)
    }
}

import React from 'react';
import PropTypes from 'prop-types';
import d3 from 'd3';

import Line from './shape/line';
import Bar from './shape/bar';
import Pie from './shape/pie';
import LineArea from './shape/linearea';
import MyTitle from './shape/title';
import Flipcard from './flipcard';
import Text from './text';
import TableChart from './tableChart';

import optionUtils from './optionUtils';

/**
 * recharts.js
 * 参考文档：http://recharts.org/#/zh-CN/examples/SimpleLineChart
 * 支持图形类型：Line, Bar, Pie, LineArea,
 */
class Chart extends React.Component {

    static propTypes = {
        type: PropTypes.string, // 类型
        data: PropTypes.oneOfType([
          PropTypes.object,
          PropTypes.array
        ]), // 数据
        option: PropTypes.object, // 图表点击选项
        width: PropTypes.number, // 图表点击宽度
        height: PropTypes.number, // 图表点击高度
        event: PropTypes.func, // 图表点击事件
        theme: PropTypes.oneOfType([ // 主题
            PropTypes.object,
            PropTypes.string,
        ]),
    }

    shouldComponentUpdate(nextProps, nextState) {
      return this.props !== nextProps;
    }

    renderChart() {
        try {
            const defaultContent = <span>dtstack.com</span>;
            const { type, data, option } = this.props

            let optionData = data;
            let renderData = option;

            if (this.isChart(type)) {
                optionData = this.parseOptions(type, data, option);
                renderData = this.parseData(type, data);
            }

            // 渲染日志, 开发调试
            // this.renderLog(type, renderData, optionData)

            switch (type) {
                case 'line': {
                    return <Line data={renderData} option={optionData} />;
                }
                case 'linearea': { // 面积图
                    return <LineArea data={renderData} option={optionData} />;
                }
                case 'histogram': {// 直方图
                    return <Bar data={renderData} option={optionData} />;
                }
                case 'bar': { // 条形图
                    optionUtils.convertToBar(optionData) // 处理bar数据
                    return <Bar data={renderData} option={optionData} />;
                }
                case 'pie': {
                    return <Pie data={renderData} option={optionData} />;
                }
                case 'table': {
                    return <TableChart {...this.props} />;
                }
                case 'flipcard': { // 翻盘器
                    return <Flipcard {...this.props} />;
                }
                case 'text': { // 文本
                    return <Text {...this.props} />;
                }
                default:
                    return defaultContent;
            }

        } catch (e) {
            throw new Error(e)
        }
    }

    /**
     * 根据数据和option参数，生成对应类型的图表选项
     */
    parseOptions = (type, data, option) => {

        const legend = data.alias.legend || []
        const xAxis = data.categories || []
        const yAxis = data.seriesData || []
        const { width, height, event, theme } = this.props

        if (width) {
            baseOption.chart.width = width
        }
        if (height) {
            baseOption.chart.height = height
        }

        // 根据drilldown解析事件参数，并生成回调函数
        // this.parseEvent(option.drilldown[0])
        const customEvent = event
        const style = option.chart.style

        // 获取样式对象
        const currentTheme = optionUtils.getTheme(theme)
        // 基础选项
        let baseOption = optionUtils.
        getCartesianOption(type, style, xAxis, yAxis, currentTheme)

        if (this.belongsToCartesian(type)) { // 如果属于笛卡尔类型
            baseOption.series = optionUtils
            .getCartesianSeries(
                type, legend, customEvent,
                style, currentTheme, option.drilldown
            )
        } else if (this.belongsToPolar(type)) { // 属于极坐标
            baseOption = optionUtils.getPolarOption(style, currentTheme)
            baseOption.series = optionUtils
            .getPolarSeries(type, legend, customEvent,
                style, currentTheme, option.drilldown)
        }
        return baseOption;
    }

    /**
     * 解析Panel返回的数据信息
     */
    parseData(type, data) {
        const legend = data.alias.legend || []
        const cates = data.categories || []
        const seriesData = data.seriesData || []
        switch (type) {
            case 'line':
            case 'histogram':
            case 'linearea':
            case 'bar': {
                const result = []
                for (let i = 0; i < seriesData.length; i++) {
                    const arr = seriesData[i];
                    const obj = { name: cates[i] }
                    for (let j = 0; j < legend.length; j++ ) {
                        obj[legend[j]] = arr[j]
                    }
                    result.push(obj)
                }
                return result;
            }
            case 'pie': {// 饼状图，极坐标系
                const result = []
                for (let i = 0; i < legend.length; i++) {
                  let seri = [];
                  for(let j = 0; j < cates.length; j++) {
                    seri.push({
                      name: cates[j],
                      value: seriesData[j][i]
                    })
                  }
                  result.push(seri);
                }
                return result;
            }
            default:
                return seriesData;
        }
    }

    /**
     * 解析Panel返回的数据信息
     */
    parseEvent(config) {
        const params = config.params
        const { updateParams } = this.props
        if (config.type === 1) {// 内部联动
            // 返回一个方法，该方法会更新store中widget
            // 中对应参数中的value
            return function(data, index) {
                updateParams(data)
            }
        } else if (config.type === 2) { // 外部联动
            // 返回一个方法，该方法可将坐标联动的数据生成
            // url参数，并重定向到路由到指定的dashboard
            return function(data, index) {
                // const url
                const ps = serializeParams(data, index, params)
                alert('I will push a new route!' + JSON.stringify(ps))
                window.location.href = `#/dashbdviewer/${config.panelId}?${ps}`
            }
        }
    }

    isChart(type) {
        return this.belongsToCartesian(type) || this.belongsToPolar(type)
    }

    belongsToCartesian(type) { // 属于笛卡尔系列
        return (
            type === 'line' ||
            type === 'bar' ||
            type === 'histogram' ||
            type === 'linearea'
        )
    }

    belongsToPolar(type) { // 极坐标系
        return (type === 'pie')
    }

    renderLog(type, data, option) {
        if (process.env.NODE_ENV !== 'production') {
            console.log(`-----Render Chart Log-----`)
            console.log('类型：', type)
            console.log('数据：', data)
            console.log('选项：', option)
        }
    }

    render() {
        const style = { position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }
        return (
            <div
                style={style}
                className="ds-chart"
                ref={(ele) => { this.container = ele }}>
                { this.renderChart() }
            </div>
        )
    }
}

export default Chart;

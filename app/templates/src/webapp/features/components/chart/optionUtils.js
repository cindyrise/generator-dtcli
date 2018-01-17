import d3 from 'd3';
import _ from 'lodash';
import moment from 'moment';
import normalTheme from './theme/normal';
import darkTheme from './theme/dark';

moment.locale('zh-cn');
export default {

    getCartesianOption: function(type, style, xAxisData, yAxisData, theme) { // 笛卡尔类型默认Option

        const option = {
            chart: {
                margin: { top: 10, right: 30, left: 10, bottom: 20 },
                style: {
                    background: theme.background,
                },
            },
            xAxis: {
                stroke: theme.lineColor,
                dataKey: 'name',
                tickLine: false,
                height: 30,
                myTick: {
                    fill: theme.fontColor,
                },
            },
            yAxis: {
                axisLine: false,
                tickLine: false,
                stroke: theme.lineColor,
                myTick: {
                    fill: theme.fontColor,
                }
            },
            grid: {
                stroke: theme.grid,
                strokeDasharray: '3 3',
                vertical: false,
            },
            legend: {
                wrapperStyle: {
                    color: theme.fontColor,
                },
                formatter: function(value) {
                    const showValue = value && value.length > 5 ?
                    `${value.substring(0, 5)}...` : value;
                    return showValue
                },
            },
            tooltip: {
                active: true,
                cursor: {
                    fill: theme.cursorColor,
                    fillOpacity: 0.1,
                },
                theme: theme.tooltip,
            },
        }

        this.parseXAxis(style, option, xAxisData)
        this.parseYAxis(style, option, yAxisData)
        this.parseBaseLine(type, style, option, theme)
        this.parseLegend(style, option)
        this.parseTooltip(style, option)

        return option
    },

    getPolarOption: function(style, theme) { // 极坐标类型默认Option
        const option = {
            chart: {
                margin: { top: 10, right: 20, left: 0, bottom: 20 },
                style: {
                    background: theme.background,
                }
            },
            legend: {
                wrapperStyle: {
                    color: theme.fontColor,
                },
            },
            tooltip: {
                cursor: {
                    stroke: theme.cursorColor,
                },
                theme: theme.tooltip,
            }
        }

        this.parseLegend(style, option, theme)
        this.parseTooltip(style, option)

        return option;
    },

    convertToBar: function(optionData) {
        optionData.chart.layout = 'vertical';
        optionData.xAxis.dataKey = undefined;
        optionData.xAxis.type = 'number';
        optionData.yAxis.type = 'category';
        optionData.yAxis.dataKey = 'name';
        optionData.yAxis.axisLine = true;
        optionData.grid.horizontal = false;
        optionData.grid.vertical = true;
    },

    getCartesianSeries: function(type, legend, event, style, theme, drilldown) {
        const arr = []
        switch (type) {
            case 'linearea':
            case 'line': {
                for (let i = 0; i < legend.length; i++) {
                    const color = this.getColor(legend.length, i, theme)
                    const instance = {
                        type: 'linear', // 线条类型
                        dataKey: legend[i],
                        stroke: color,
                        fill: color,
                        dot: false,
                        myActiveDot: {
                            onClick: event,
                        },
                    }
                    // 解析标签
                    if (type === 'linearea') {
                        instance.type = 'monotone'
                        instance.fillOpacity = 0.3
                    }
                    this.parseSeries(type, style, instance, theme, drilldown)
                    arr.push(instance)
                }
                return arr;
            }
            case 'histogram':
            case 'bar': {
                for (let i = 0; i < legend.length; i++) {
                    const color = this.getColor(legend.length, i, theme)
                    const instance = {
                        dataKey: legend[i],
                        fill: color,
                        onClick: event,
                    }
                    // 解析标签
                    this.parseSeries(type, style, instance, theme, drilldown)
                    arr.push(instance)
                }
                return arr;
            }
            default:
                return arr;
        }
    },

    getPolarSeries: function(type, legend, event, style, theme, drilldown) {
        const arr = [];
        // 生成色带
        const colors = this.colorsByLen(legend.length, theme);
        switch (type) {
            case 'pie': {
                for (let i = 0; i < legend.length; i++) {
                    const pie = {
                        colors: colors,
                        stroke: theme.background,
                        onClick: event,
                    }
                    if (drilldown && drilldown.params.length > 0) {
                        pie.cursor = 'pointer'
                    }
                    this.parsePie(style, pie)
                    arr.push(pie)
                }
                return arr;
            }
            case 'radar': {
                return arr;
            }
            default:
                return arr;
        }
    },

    getColor: function(len, index, theme) {
        const colors = theme.colors;
        return index < 10 ? colors[index] : colors[index % 10]
    },

    colorsByLen: function(len, theme) {// 生成色带
        const colors = []
        for (let i = 0; i <= len; i++) {
            colors.push(this.getColor(len, i, theme));
        }
        return colors
    },

    getColors: function(len) {
        const colors = []
        const color = d3.scale.category20c();
        for (let i = 0; i < len; i++) {
            colors.push(color(i));
        }
        return colors
    },

    parseSeries: function(type, style, option, theme, drilldown) {
        // 判断事件
        if (drilldown && drilldown.params.length > 0) {
            option.cursor = 'pointer';
            if (option.myActiveDot) {
                option.myActiveDot.cursor = 'pointer'
            }
        }
        // 解析单位
        if (style.labelShow) {
            option.label = {
                fill: theme.fontColor,
                fontSize: '10px',
                textAnchor: 'middle',
                type: type,
                dy: -6,
            }
        }
        if (style.yUnit) {
            option.unit = style.yUnit
        }
        if (style.xUnit && type === 'bar') { // 解析单位
            option.unit = style.xUnit
        }
    },

    parseXAxis: function(style, option, xAxisData) {

        // 标签单位
        if (style.xUnit) {
            option.xAxis.myTick.unit = style.xUnit
        }

        // X轴类别默认为category
        if (style.dataType) {
            if (style.dataType === '1') { // 日期格式
                option.xAxis.type = 'category'
            } else if (style.dataType === '2') {
                option.xAxis.type = 'category'
            } else if (style.dataType === '3') {
                option.xAxis.type = 'number'
            }
        }

        // 日期类型展示格式化
        if (style.dataType === '1' && style.showFormat) {
            const formatter = this.formatTime(style.showFormat)
            option.xAxis.myTick.formatter = formatter
            option.tooltip.formatterLabel = formatter
        }

         // 标签旋转
        if (style.labelRotate) {
            option.xAxis.myTick.transform = this.rotateText(style.labelRotate)
            option.xAxis.myTick.textAnchor = this.rotateAnchor(style.labelRotate)
            option.chart.margin.bottom = this.adjustMarginBottom(
                option, style, xAxisData
            )
        }

        // 设置X轴展示刻度个数
        if (style.labelInterval) {
            option.xAxis.interval = parseInt(style.labelInterval, 10)
        }
    },

    parseYAxis: function(style, option, yAxisData) {
        if (style.yUnit) { // copy unit
            option.yAxis.myTick.unit = style.yUnit
        }
        // 格式化Domain
        option.yAxis.domain = this.formatYAxisDomain(yAxisData, style.yMax, style.yMin)
    },

    parseBaseLine: function(type, style, option, theme) {
        if (style.baseShow) {
            option.baseLine = {
                label: {
                    value: style.baseLabel,
                    fill: theme.baseLine,
                    textAnchor: 'end',
                },
                stroke: theme.baseLine,
                fill: theme.baseLine,
                strokeDasharray: '5',
                textAnchor: 'start',
                fillOpacity: 1,
            }
            if (type === 'bar') {
                option.baseLine.x = style.baseValue; // 基线值
                option.baseLine.label.dy = 8;
                option.baseLine.label.dx = 5;
            } else {
                option.baseLine.y = style.baseValue; // 基线值
            }
        }
    },

    parsePie: function(style, option) {
        // 设置饼图半径
        if (style.radius) {
            option.outerRadius = parseInt(style.radius, 10)
        }
        if (style.minSize) {
            const minSize = parseInt(style.minSize, 10)
            option.minAngle = Math.round(360 / 100 * minSize);
        }
        if (style.labelShow) {
            option.label = function(obj) {
                return `${Math.round((obj.percent * 100))}%`
            }
        }
    },

    parseTooltip: function(style, option) {

        const toRound = value => Math.round(new Number(value))
        const toSeperator = value => `${value}`.replace(/(?=(\d{3})+$)/g, ',')
        const toFixed = (value, decimal) => new Number(value).toFixed(decimal)
        if (style.tooltipSperator ||
            (style.tooltipDecimal !== undefined &&
            style.tooltipDecimal !== null) ||
            style.tooltipRound ) {

            option.tooltip.formatter = (value) => {
                let formatted = value
                if (style.tooltipDecimal !== undefined
                    && style.tooltipDecimal !== null) {
                    formatted = toFixed(formatted, style.tooltipDecimal)
                }
                if (style.tooltipRound) {
                    formatted = toRound(formatted)
                }
                if (style.tooltipSperator) {
                    formatted = toSeperator(formatted)
                }
                return formatted
            }
        }
    },

    parseLegend: function(style, option) {
        if (style.legendShow) {
            // legend位置
            if (style.legendPosition === '1') { // 右边
                option.legend.layout = 'vertical'
                option.legend.align = 'right' // align位置
                option.legend.wrapperStyle.right = 0
                if (style.legendAlign === '1') {
                    option.legend.verticalAlign = 'top'
                } else if (style.legendAlign === '2') {
                    option.legend.verticalAlign = 'middle'
                } else if (style.legendAlign === '3') {
                    option.legend.verticalAlign = 'bottom'
                }
            } else {
                option.legend.layout = 'horizontal'
                if (style.legendPosition === '2') { // 上
                    option.legend.verticalAlign = 'top'
                    option.legend.wrapperStyle.top = 0
                } else if (style.legendPosition === '3') { // 下
                    option.legend.verticalAlign = 'bottom'
                    option.legend.wrapperStyle.bottom = 0
                }
                // align位置
                if (style.legendAlign === '1') {
                    option.legend.align = 'left'
                } else if (style.legendAlign === '2') {
                    option.legend.align = 'center'
                } else if (style.legendAlign === '3') {
                    option.legend.align = 'right'
                }
            }
        } else {
            option.legend.wrapperStyle.display = 'none'
        }
    },

    rotateText: function(rotate) {
        switch(rotate) {
            case '1':
                return 'rotate(-90)'
            case '2':
                return 'rotate(-45)'
            case '4':
                return 'rotate(45)'
            case '5':
                return 'rotate(90)'
            case '3':
            default:
                return 'rotate(0)'
        }
    },

    rotateAnchor: function(rotate) {
        switch(rotate) {
            case '1':
            case '2':
                return 'end'
            case '4':
            case '5':
                return 'start'
            case '3':
            default:
                return 'middle'
        }
    },

    adjustMarginBottom: function(option, style, data) {
        let max = '';
        for (let i = 0; i < data.length; i++) {
            if (data[i].length > max.length) {
                max = data[i]
                continue;
            }
        }
        let bottom = 0, wordWidth = 10;
        // 如果类型为日期类型，且已格式化
        if (style.dataType === '1' && style.showFormat) {
            max = option.xAxis.myTick.formatter(max)
            wordWidth = 4
        }
        bottom = Math.round(max.length * wordWidth) + max.length
        if (style.labelRotate === '2' || style.labelRotate === '4' ) {
            // 利用余弦计算
            bottom = Math.round(bottom * Math.cos(45))
        } else if (style.labelRotate === '3' ) {
            bottom = 10
        }
        return bottom
    },

    formatTime: function(type) {
        switch(type) {
            case '2':
                return (time) => moment(time).format('YYYY年')
            case '3':
                return (time) => moment(time).format('YYYY年MM月DD日')
            case '4':
                return (time) => moment(time).format('YYYY-MM-DD')
            case '5':
                return (time) => moment(time).format('YYYY年MM月')
            case '6':
                return (time) => moment(time).format('YYYY-MM')
            case '7':
                return (time) => moment(time).format('MM月')
            case '8':
                return (time) => moment(time).format('MM月DD日')
            case '9':
                return (time) => moment(time).format('MM-DD')
            case '10':
                return (time) => moment(time).format('MM-DD HH:mm')
            case '11':
                return (time) => moment(time).format('MM-DD HH:mm:ss')
            case '12':
                return (time) => moment(time).format('YYYY-MM-DD HH:mm')
            case '13':
                return (time) => moment(time).format('YYYY-MM-DD HH:mm:ss')
            case '1':
            default:
                return (time) => moment(time).format('YYYY')
        }
    },

    formatYAxisDomain(yAxisData, yMax, yMin) {

        const min = d3.min(yAxisData)
        const max = d3.max(yAxisData)

        if (!yMax && !yMin) return undefined

        yMin = (yMin && yMin > max ? 'auto' : yMin) || 'auto'
        yMax = ((yMax && yMax < min) || (yMax < max) ? 'auto' : yMax) || 'auto'

        return [yMin, yMax]
    },

    getTheme(type) {
        switch(type) {
            case 'dark':
                return darkTheme;
            default:
                return normalTheme;
        }
    },
}

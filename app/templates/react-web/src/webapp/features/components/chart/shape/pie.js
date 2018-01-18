import React from 'react';
import PropTypes from 'prop-types';

import {
    PieChart, Pie, Cell, Legend,
    ResponsiveContainer, Sector,
} from 'recharts';

import LegendContent from './legend'
import Tooltip from './tooltip'

function ActivePie(props) {
    const {
        cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value
    } = props;
    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                fillOpacity={0.8}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
        </g>
    )
}

/**
 * 图表类型：Line
 * 参考文档：http://recharts.org/#/zh-CN/examples/SimpleLineChart
 */
class MyPie extends React.Component {

    state = {
        selected: '',
        index: '',
        payload: '',
    }

    static propTypes = {
        data: PropTypes.array, // 数据
        option: PropTypes.object, // 数据
    }

    onLegendClick = (o) => {
        const { selected } = this.state
        const { value } = o
        if (selected === value) {
            this.setState({ selected: '' })
        } else {
            this.setState({ selected: value })
        }
    }

    onPieEnter = (data, index) => {
        this.setState({
            index,
            payload: data.tooltipPayload,
        });
    }

    onPieOut = () => {
        this.setState({index: '', payload: ''})
    }

    render() {
        const { data, option } = this.props
        const { index, payload }  = this.state
        const pieData = data && data.length > 0 ? data[0] : []
        const pieProps = option.series && option.series.length > 0 ? option.series[0] : {}
        const active = index === '' ? false : true
        return (
            <ResponsiveContainer minHeight={100}>
                <PieChart {...option.chart}>
                    <Pie
                        {...pieProps}
                        data={pieData}
                        isAnimationActive={true}
                        activeIndex={index}
                        onMouseEnter={this.onPieEnter}
                        onMouseOut={this.onPieOut}
                        activeShape={<ActivePie />}
                    >
                        {
                            pieData.map((item, index) => {
                                return <Cell
                                    key={`cell-${index}`}
                                    stroke={pieProps.stroke}
                                    fill={pieProps.colors[index]}
                                />
                            })
                        }
                    </Pie>
                    <Tooltip hover={active} data={payload} {...option.tooltip} />
                    <Legend
                        {...option.legend}
                        onClick={this.onLegendClick}
                        content={<LegendContent />}
                    />
                </PieChart>
            </ResponsiveContainer>
        )
    }
}

export default MyPie;


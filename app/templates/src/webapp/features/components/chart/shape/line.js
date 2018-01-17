import React from 'react';
import PropTypes from 'prop-types';

import { 
    LineChart, Line, XAxis, YAxis, 
    CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, Text, ReferenceLine,
} from 'recharts';

import MyActiveDot from './dot';
import { ReferenceLabel } from './label';
import { MyTooltip } from './tooltip';
import LegendContent from './legend'
import { MyXAxisTick, MyYAxisTick } from './tick';

/**
 * 图表类型：Line
 * 参考文档：http://recharts.org/#/zh-CN/examples/SimpleLineChart
 */
class MyLine extends React.Component {

    state = {
        selected: '',
    }

    static propTypes = {
        data: PropTypes.array, // 数据
        option: PropTypes.object, // 数据
    }

    onLegendClick = (o) => {
        const { selected } = this.state
        const { dataKey } = o
        if (selected === dataKey) {
            this.setState({ selected: '' })
        } else {
            this.setState({ selected: dataKey })
        }
    }

    render() {
        const { data, option } = this.props
        const { selected } = this.state
        return (
            <ResponsiveContainer minHeight={100}>
                <LineChart data={data} {...option.chart}>
                    <CartesianGrid {...option.grid}/>
                    <XAxis {...option.xAxis} 
                        tick={<MyXAxisTick tick={option.xAxis.myTick}/>}
                    />
                    <YAxis {...option.yAxis} 
                        tick={<MyYAxisTick tick={option.yAxis.myTick}/>}
                    />
                    <Tooltip
                        {...option.tooltip}
                        content={<MyTooltip {...option.tooltip} />}
                    />
                    <Legend 
                        {...option.legend} 
                        content={<LegendContent />}
                    />
                    { 
                        option.series && option.series.length > 0 ? 
                        option.series.map((lineProps, index) => {
                            const opacity = selected === lineProps.dataKey ? 0.5 : 1
                            return (
                                <Line 
                                    strokeOpacity={opacity}
                                    key={index} 
                                    {...lineProps}
                                    activeDot={
                                        <MyActiveDot 
                                            {...lineProps.myActiveDot} 
                                            onClick={
                                                (data, key) => { 
                                                    lineProps.myActiveDot.onClick(data, key, index, lineProps.dataKey) 
                                                }
                                            }
                                        />
                                    } 
                                />
                            )
                        }) : ''
                    }
                    { 
                        option.baseLine ? 
                        <ReferenceLine 
                            {...option.baseLine}
                            label={
                                option.baseLine.label ? 
                                <ReferenceLabel {...option.baseLine.label} /> : false
                            }
                        /> 
                        : ''
                    }
                </LineChart>
            </ResponsiveContainer>
        )
    }
}

export default MyLine;

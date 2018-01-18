import React from 'react';
import PropTypes from 'prop-types';
import { isArray } from 'lodash';

import { 
    AreaChart, Area, XAxis, YAxis, 
    CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, Text, ReferenceLine,
} from 'recharts';

import MyActiveDot from './dot';
import { MyTooltip } from './tooltip';
import { ReferenceLabel } from './label';
import LegendContent from './legend'
import { MyXAxisTick, MyYAxisTick } from './tick';

/**
 * 图表类型：Line
 * 参考文档：http://recharts.org/#/zh-CN/examples/SimpleLineChart
 */
class MyLineArea extends React.Component {

    static propTypes = {
        data: PropTypes.array, // 数据
        option: PropTypes.object, // 数据
    }

    render() {
        const { data, option } = this.props
        return (
            <ResponsiveContainer minHeight={100}>
                <AreaChart data={data} {...option.chart}>
                    <CartesianGrid {...option.grid}/>
                    { 
                        option.series && option.series.length > 0 ? 
                        option.series.map((lineProps, index) => {
                            return (
                                <Area 
                                    key={index} 
                                    {...lineProps}
                                    activeDot={
                                        <MyActiveDot 
                                            {...lineProps.myActiveDot} 
                                            onClick={
                                                (data, key) => { 
                                                    data.value = isArray(data.value) ? data.value[key] : data.value
                                                    lineProps.myActiveDot.onClick(data, key, index, lineProps.dataKey) 
                                                }
                                            }
                                        />
                                    } 
                                />
                            )
                        }) : ''
                    }
                    <XAxis {...option.xAxis} 
                        tick={<MyXAxisTick tick={option.xAxis.myTick} />}
                    />
                    <YAxis {...option.yAxis} 
                        tick={<MyYAxisTick tick={option.yAxis.myTick}/>}
                    />
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
                    <Tooltip 
                        {...option.tooltip}
                        content={<MyTooltip {...option.tooltip} />}
                    />
                    <Legend 
                        {...option.legend} 
                        content={ <LegendContent /> }
                    />
                </AreaChart>
            </ResponsiveContainer>
        )
    }
}

export default MyLineArea;

import React from 'react';
import PropTypes from 'prop-types';

export function MyXAxisTick(props) {
    const { x, y, stroke, payload, tick } = props;
    // 如果有格式化操作，则取格式化值，否则直接取值
    const value = tick && tick.formatter ? 
    tick.formatter(payload.value) : payload.value
    return (
        <g transform={`translate(${x},${y})`}>
            <text dy={10} textAnchor={tick.textAnchor || 'middle'}
                fill={tick.fill} 
                transform={tick.transform}
            >
                { value }{ (tick && tick.unit) || ''}
            </text>
        </g>
    );
}

export function MyYAxisTick(props) {
    const { 
        x, y, stroke, payload, 
        tick, textAnchor,
    } = props;
    return (
        <g>
            <text
                stroke={stroke}
                textAnchor={textAnchor}
                x={x} y={y} dy={3} 
                fill={tick.fill} 
            >
                { payload.value }{ (tick && tick.unit) || ''}
            </text>
        </g>
    );
}



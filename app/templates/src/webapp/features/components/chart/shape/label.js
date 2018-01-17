import React from 'react';

/**
 * 柱状图Label
 */
export function BarLabel(props) {
    const {x, y, fill, value, textAnchor, width, type, height} = props;
    let dx = Math.round(width / 2)
    let dy = -4
    if (type === 'bar') {
        dy = height > 4 ? Math.round(height / 2) : height
        dx = width + 10
    }
    return (
         <text 
            x={x} y={y} 
            dy={dy} 
            dx={dx}
            fill={fill} 
            fontSize={10} 
            textAnchor={textAnchor}>
            {value}
        </text>
    )
}

/**
 * 参考线Label
 */
export function ReferenceLabel(props) {
    const { 
        fill, value, textAnchor, 
        fontSize, viewBox, dy, dx,
    } = props;
    const x = viewBox.width + viewBox.x + 20;
    const y = viewBox.y - 6;
    return (
        <text 
            x={x} y={y}
            dy={dy}
            dx={dx}
            fill={fill}
            fontSize={fontSize || 10} 
            textAnchor={textAnchor}>
            {value}
        </text>
    )
}
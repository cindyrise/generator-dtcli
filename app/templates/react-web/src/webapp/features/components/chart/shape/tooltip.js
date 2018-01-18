import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {  Dot, Tooltip } from 'recharts';
import { translateStyle } from 'react-smooth';

export function PolarTooltip(props) {
    const { hover } = props;
    if (hover) {
        const { data, label, formatter, theme, formatterLabel } = props;
        const title = formatterLabel ? formatterLabel(label) : label
        return (
            <div style={theme}>
                <p className="recharts-tooltip-label">
                    {title}
                </p>
                <ul className="recharts-tooltip-item-list">
                    { 
                        data && data.map((item, index) => {
                            const dotStyle = {
                                display: 'inline-block',
                                width: '8px',
                                height: '8px',
                                borderRadius: '50% 50%',
                                background: item.payload && item.payload.fill,
                                marginRight: '5px',
                            }
                            const value = formatter ? formatter(item.value) : item.value
                            return (
                                <li key={`item-${index}`}>
                                    <i className="circle" style={dotStyle} />
                                    {item.payload && item.payload.name}：
                                    {value}{(item.payload && item.payload.unit) || ''}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    } 
    return null
}

export function MyTooltip(props) {
    const { active } = props;
    if (active) {
        const { payload, label, formatter, theme, formatterLabel } = props;
        const title = formatterLabel ? formatterLabel(label) : label
        return (
            <div style={theme}>
                <p className="recharts-tooltip-label">
                    {title}
                </p>
                <ul className="recharts-tooltip-item-list">
                    { 
                        payload && payload.map((item, index) => {
                            const dotStyle = {
                                display: 'inline-block',
                                width: '8px',
                                height: '8px',
                                borderRadius: '50% 50%',
                                background: item.fill || item.payload.fill,
                                marginRight: '5px',
                            }
                            const value = formatter ? formatter(item.value) : item.value 
                            return (
                                <li key={`item-${index}`}>
                                    <i className="circle" style={dotStyle} />
                                    {item.name}: {value}{item.unit || ''}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
    return null
}

export default class CustomTooltip extends Tooltip {
    render() {
        const { 
            data, isAnimationActive, 
            animationDuration, animationEasing 
        } = this.props;
        const { 
            content, viewBox, coordinate, hover,
            position, offset, wrapperStyle 
        } = this.props;
        const hasPayload = data && data.length > 0;
        let outerStyle = {
            pointerEvents: 'none',
            visibility: hover && hasPayload ? 'visible' : 'hidden',
            position: 'absolute',
            top: 0,
            ...wrapperStyle,
        };
        let translateX, translateY;
    
        if (position && _.isNumber(position.x) && _.isNumber(position.y)) {
            translateX = position.x;
            translateY = position.y;
        } else {
            const { boxWidth, boxHeight } = this.state;
    
            if (boxWidth > 0 && boxHeight > 0 && coordinate) {
            translateX = position && _.isNumber(position.x) ? position.x : Math.max(
            coordinate.x + boxWidth + offset > (viewBox.x + viewBox.width) ?
            coordinate.x - boxWidth - offset :
            coordinate.x + offset, viewBox.x);
    
            translateY = position && _.isNumber(position.y) ? position.y : Math.max(
            coordinate.y + boxHeight + offset > (viewBox.y + viewBox.height) ?
            coordinate.y - boxHeight - offset :
            coordinate.y + offset, viewBox.y);
            } else {
                outerStyle.visibility = 'hidden';
            }
        }
    
        outerStyle = {
            ...outerStyle,
            ...translateStyle({
            transform: `translate(${translateX}px, ${translateY}px)`,
            }),
        };
    
        if (isAnimationActive && hover) {
            outerStyle = {
            ...outerStyle,
            ...translateStyle({
                transition: `transform ${animationDuration}ms ${animationEasing}`,
            }),
            };
        }
        return (
            <div
                className="recharts-tooltip-wrapper"
                style={outerStyle}
                ref={(node) => { this.wrapperNode = node; }}
            >   
                <PolarTooltip {...this.props}/>
            </div>
        );
    }
}

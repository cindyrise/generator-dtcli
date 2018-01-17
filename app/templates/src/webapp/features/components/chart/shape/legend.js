import React from 'react';
import classNames from 'classnames';
import DefaultLegendContent from 'recharts/lib/component/DefaultLegendContent'
import Surface from 'recharts/lib/container/Surface'
import { filterEventsOfChild } from 'recharts/lib/util/ReactUtils'

const SIZE = 32;

export default class LegendContent extends DefaultLegendContent {

    renderItems() {
        const { payload, iconSize, layout, formatter } = this.props;
        const viewBox = { x: 0, y: 0, width: SIZE, height: SIZE };
        const itemStyle = {
            display: layout === 'horizontal' ? 'inline-block' : 'block',
            marginRight: 10,
        };
        const svgStyle = { display: 'inline-block', verticalAlign: 'middle', marginRight: 4 };

        return payload.map((entry, i) => {
            
            const finalFormatter = entry.formatter || formatter;

            const className = classNames({
                'recharts-legend-item': true,
                [`legend-item-${i}`]: true,
                inactive: entry.inactive,
            });

            if (entry.type === 'none') {
                return null;
            }

            return (
                <li
                    className={className}
                    style={itemStyle}
                    key={`legend-item-${i}`}
                    {...filterEventsOfChild(this.props, entry, i)}
                >
                    <Surface width={iconSize} height={iconSize} viewBox={viewBox} style={svgStyle}>
                    {this.renderIcon(entry)}
                    </Surface>
                    <span className="recharts-legend-item-text" title={entry.value}>
                    {finalFormatter ? finalFormatter(entry.value, entry, i) : entry.value}
                    </span>
                </li>
            );
        });
    }
    render() {
        const { payload, layout, align } = this.props;
        
        if (!payload || !payload.length) { return null; }
    
        const finalStyle = {
            padding: 0,
            margin: 0,
            textAlign: layout === 'horizontal' ? align : 'left',
        };

        return (
            <ul className="recharts-default-legend" style={finalStyle}>
                {this.renderItems()}
            </ul>
        );
    }
}
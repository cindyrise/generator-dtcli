import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './style.scss';

const fixStyle = {
    fontSize: '16px',
}
const defaultStyle = {
    textAlign: 'center',
    overflow: 'hidden',
    height: '100%',
}
const valueStyle = {
    fontSize: '48px',
}
/**
 * 自定义ActiveDot组件，绑定Click事件
 */
class FlipCard extends React.Component {

    static propTypes = {
        option: PropTypes.object, // 类型
        data: PropTypes.object,
        event: PropTypes.func, // 图表点击事件
    }

    listenClick = (value) => {
        const { event } = this.props;
        event.call(this, value);
    }

    getStyle(option) {
        const align = option.chart.style.titleAlign
        let textAlign = 'center'
        switch(align) {
            case '1':
                textAlign = 'left'; break;
            case '3':
                textAlign = 'right'; break;
            default:
                textAlign = 'center'; break;
        }
        return Object.assign(defaultStyle, { textAlign })
    }

    getValStyle(value, option) {
        const range = option.chart.style.valueRange || []
        const style = range.find((item) => {
            return item.min <= value && value <= item.max
        })
        if (style) {
            return {
                color: style.color
            }
        }
        return { color: '#2491f7' }
    }

    handNumber(option, value) {
        let newVal = value
        if (option.decimal !== undefined
            && option.decimal !== null) {
            newVal = (value).toFixed(option.decimal)
        }
        if (option.round) {
            newVal = Math.round(value)
        }
        return newVal
    }

    renderValue(option, data) {
        const originVal = data.seriesData
        const style = option.chart.style
        let value = ''
        let fontColor = ''
        if (originVal) {
            value = _.isArray(originVal)
            ? originVal[0][0] : originVal
            if (_.isNumber(value)) {
                value = this.handNumber(style, value)
            }
            fontColor = this.getValStyle(value, option);
        } else {
            return 'Flipcard'
        }

        // 千位分隔符处理
        if (style.sperator) {
            value = `${value}`.replace(/(?=(\d{3})+$)/g, ',')
        }

        return (
            <div style={fontColor} className="centered"
              onClick={ this.listenClick.bind(this, value) }
            >
                {
                    style.prefix ?
                    <span>
                        {style.prefix}
                    </span> : ''
                }
                <span style={valueStyle}>
                    {value}
                </span>
                {
                    style.suffix ?
                    <span style={fixStyle}>
                        {style.suffix}
                    </span> : ''
                }
            </div>
        )
    }

    render() {
        const { option, data } = this.props
        const globalStyle = this.getStyle(option)
        return (
            <div className="dt-flipcard" style={globalStyle}>
                { this.renderValue(option, data) }
            </div>
        )
    }
}

export default FlipCard;

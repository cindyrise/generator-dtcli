import React from 'react';
import PropTypes from 'prop-types';

import { colors } from './comm';

import 'c3/c3.css';
import './style.css';

const c3 = require("c3");
const d3 = require("d3");

/**
 * 依赖C3.js
 * 参考文档：http://c3js.org/reference.html
 * 支持图形类型：Line, Bar, Pie, LineArea, 
 */
class Chart extends React.Component {
    
    componentDidMount() {
        const { type, data } = this.props
        this.draw(type, data)
    }

    componentWillReceiveProps(nextProps) {
        const { type, data } = nextProps
        this.update(type, data)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.props.data !== nextProps.data ||
            this.props.type !== nextProps.type
        ) {
            return true;
        } 
        return false;
    }

    draw = (type, data) => {
        const options = this.getOptions(type, data)
        console.log('option:', options)
        const chart = c3.generate(options)
    }

    update = (type, data) => {
        const options = this.getOptions(type, data)
        this.chart.load(options)
    }

    getOptions(type, data) {
        let option = this.defaultOptions()
        switch (type) {
            case 'line': {
                option.x = 'x';
                option.data.columns = data || [];
                return option;
            }
            case 'bar': {}
            case 'pie': {}
            default:
                return option;
        }
    }

    defaultOptions = () => {
        const { width, height, data } = this.props
        return {
            bindto: this.container,
            size: {
                height: height,
                width: width,
            },
            color: {
                pattern: colors,
            },
            data: {
                columns: data || [],
            },
            grid: {
                y: {
                    show: true
                },
            },
            padding: {
                top: 10,
                bottom: 10,
            },
            axis: {
                // x: {
                //     padding: {
                //         left: 0,
                //         right: 0.2,
                //     }
                // },
                // y: {
                //     padding: {
                //         bottom: 0,
                //         top: 10,
                //     }
                // }
            },
        };
    }

    formatData(data) {
        
    }

    render() {
        const style = {
            position: 'relative',
            background: '#fff',
        }
        return (
            <div
                style={style}
                className="ds-chart" 
                ref={(ele) => { this.container = ele }}>
                C3 Chart.
            </div>
        )
    }
}

Chart.propTypes = {
    type: PropTypes.string, // 类型
    data: PropTypes.array, // 数据
    width: PropTypes.number, // 图表宽度
    height: PropTypes.number, // 图表高度
    option: PropTypes.object, // 图标选项
};

export default Chart;

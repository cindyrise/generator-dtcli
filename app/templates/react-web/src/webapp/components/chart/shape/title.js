import React from 'react';
import PropTypes from 'prop-types';

/**
 * 自定义ActiveDot组件，绑定Click事件
 */
class MyTitle extends React.Component {
    render() {
        const style = { 
            color: '#94a8c6', 
            fontSize: '12px',
            paddingBottom: '10px',
        }
        return (
            <div 
                {...this.props}
                className="ds-chart-title"
                style={style}
            >
                {this.props.value}
            </div>
        )
    }
}

export default MyTitle;

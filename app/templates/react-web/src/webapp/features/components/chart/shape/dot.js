import React from 'react';
import PropTypes from 'prop-types';
import { 
    Dot,
} from 'recharts';

/**
 * 自定义ActiveDot组件，绑定Click事件
 */
class MyDot extends React.Component {

    listenClick = () => {
        const { onClick, payload, value, index } = this.props
        payload.value = value
        onClick(payload, index)
    }

    render() {
        return (
            <Dot {...this.props} onClick={this.listenClick}/>
        )
    }
}

export default MyDot;

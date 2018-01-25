import React from 'react';
import PropTypes from 'prop-types';
import Marked from 'marked';

/**
 * 自定义ActiveDot组件，绑定Click事件
 */
class Text extends React.Component {

    listenClick = () => {
    }

    render() {
        const { option = {} } = this.props;
        const { chart = {} } = option;
        const { search = {} } = chart;
        const { markdown } = search;
        return (
            <div dangerouslySetInnerHTML={{__html: Marked(markdown)}} />
        )
    }
}

export default Text;

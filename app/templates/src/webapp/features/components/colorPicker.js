import React, { Component } from 'react';
import { BlockPicker } from 'react-color';

export default class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  showPicker = () => {
    this.setState({
      show: true
    })
  }

  closePicker = () => {
    this.setState({
      show: false
    })
  }

  render() {
    const { color, position } = this.props;
    const style = {
      width: 20, 
      height: 20,
      background: color, 
      borderRadius: 5
    }
    const popover = {
      position: 'absolute',
      zIndex: '2',
      marginLeft: position === 'center' ? -75 : (position === 'right' ? -150 : 0)
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }
    
    return (
      <div>
        <div style={style} onClick={this.showPicker}></div>
        { this.state.show ? <div style={ popover }>
          <div style={ cover } onClick={ this.closePicker }/>
          <BlockPicker
            onChange={this.props.onColorRangeChange}
            color={color} 
            width={170} 
            colors={['#f04945', '#f6918f', '#ff6900', '#ffa566', '#0bc07e', '#6cd9b1', '#2491f7', '#7bbdfa', '#95a9c7']}
            />
        </div> : null }
      </div>
    )
  }
}
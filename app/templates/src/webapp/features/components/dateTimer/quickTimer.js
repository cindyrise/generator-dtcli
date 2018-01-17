import React from 'react';
import moment from 'moment';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';

import TIME_RANGE from '../../constants/timeRange';
moment.locale('zh-cn');

export default class QuickTimer extends React.Component {
  constructor(props) {
    super(props);
    this.updateUI = this.updateUI.bind(this);
    this.setTime = this.props.setTime;
  }

  componentDidMount() {
    this.$list = findDOMNode(this.quickList);
    this.$list.addEventListener('click', this.updateUI, true);
  }

  componentWillUnmount() {
    this.$list.removeEventListener('click', this.updateUI)
  }

  updateUI(e) {
    if(e.target.tagName.toUpperCase() !== 'LI') return;

    const arr = this.$list.querySelectorAll('li');
    for(let i = 0, l = arr.length - 1; i <= l; i++) {
      arr[i].classList.remove('active');
    }
    e.target.classList.add('active');
  }

  render() {
    const { value } = this.props;
    return <ul className="quick-list"
      ref={ el => this.quickList = el }
    >
      {TIME_RANGE.map(o => {
        return <li onClick={ () => { this.setTime(o.type) } }
          key={o.type}
          className={ classnames(
            {'active': value === o.type},
            { 'hide':'today'==o.type})}
        >
          {o.text}
        </li>
      })}
    </ul>
  }
}

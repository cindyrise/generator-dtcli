import React from 'react';
import { DatePicker, Input, Popover, Button, Tabs, Icon, message } from 'antd';
import moment from 'moment';
import { findDOMNode } from 'react-dom';
import isEqual from 'lodash/isEqual';
import './style.scss'
import QuickTimer from './quickTimer';
import TIME_RANGE from '../../constants/timeRange';
moment.locale('zh-cn');

const RangePicker = DatePicker.RangePicker;
const TabPane = Tabs.TabPane;

export default class DateTimer extends React.Component {
  constructor(props) {
    super(props);

    this._error = false;
    this.state = {
      visible: false,
      beginTime: Date.now(),
      endTime: Date.now(),
      type: '',
      error: ''
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) ||
      this.state.visible !== nextState.visible ||
      this.state.error !== nextState.error;
  }

  applyTime() {
    const { handleFieldChange } = this.props;
    const { beginTime, endTime, type } = this.state;

    if (type) {
      let timeArr = [];
      TIME_RANGE.forEach(item => {
        if (type == item.type) {
          timeArr = item.creator();
        }
      })
      handleFieldChange(type, timeArr.map(item => moment(item).format('YYYY-MM-DD HH:mm:ss')));
    }
    else {
      handleFieldChange(`${beginTime.valueOf()}-${endTime.valueOf()}`, [beginTime, endTime].map(item => moment(item).format('YYYY-MM-DD HH:mm:ss')))
    }
    this.hide();
  }
  hide() {
    this.setState({
      visible: false
    });
  }

  /**
   * @description 设置时间
   * @param {any} typeOrRange type: 相对时间 Range: 绝对时间
   * @memberof TimerWidget
   */
  setTime(typeOrRange) {
    console.log(typeOrRange, 'setTime');
    if (typeof typeOrRange === 'string') {
      this.setState({
        type: typeOrRange,
        beginTime: '',
        endTime: '',
        error: ''
      });
    }
    else {
      if (typeOrRange.length) {
        const [beginTime, endTime] = typeOrRange;
        let s = beginTime.valueOf();
        let e = endTime.valueOf();

        if (s === e) {
          this.setState({
            error: '开始时间不能等于结束时间'
          });
        }
        else if ((e - s) > (3600 * 24 * 1000 * 30)) {
          this.setState({
            error: '时间跨度最长不能超过30天'
          });
        }
        else {
          this.setState({
            type: '',
            beginTime,
            endTime,
            error: ''
          });
        }
      }
      else {
        this.setState({
          error: '请选择时间范围'
        });
      }
    }
  }

  showTimer() {
    this.setState({
      visible: true
    });
  }

  /**
   * @description 判断时间器类型
   * @param {any} value
   * @returns
   * @memberof TimerWidget
   */
  checkTimeType(value) {
    let isRelative = true;
    if (/^\d{13}\-\d{13}$/g.test(value)) {
      isRelative = false;
    }
    return isRelative;
  }

  renderSelector() {
    const { field, value, defaultValue, typeConfig } = this.props;

    return <div className="m-timerselector">
      <Tabs defaultActiveKey="1">
        <TabPane tab="快速选择" key="1">
          <QuickTimer setTime={this.setTime.bind(this)}
            value={value || defaultValue}
          />
        </TabPane>
        <TabPane tab="时间段选择" key="2">
          <RangePicker
            format="YYYY-MM-DD HH:mm:ss"
            showTime={{ format: 'HH:mm:ss' }}
            disabledDate={current => {
              return current && current.valueOf() > Date.now();
            }}
            onChange={this.setTime.bind(this)}
          />
          {this.state.error && <span style={{ display: 'block', color: 'red', margin: 5 }}>{this.state.error}</span>}
        </TabPane>
      </Tabs>
      <div className="fn">
        <Button className="r" type="primary" onClick={this.applyTime.bind(this)}
          disabled={this.state.error}>应用</Button>
      </div>
    </div>
  }

  render() {
    const { field, value, defaultValue, typeConfig } = this.props;
    const dateValue = value || defaultValue;
    const isRelative = this.checkTimeType(dateValue);
    const { visible } = this.state;
    let beginTime, endTime, defaultDate;

    if (dateValue) {
      if (isRelative) {
        defaultDate = TIME_RANGE.filter(o => {
          return o.type === dateValue;
        })[0].text;
      }
      else {
        [beginTime, endTime] = dateValue.split('-').map(str => moment(+str).format('YYYY-MM-DD HH:mm:ss'));
        defaultDate = `${beginTime}~${endTime}`;
      }
    }
    else {
      defaultDate = '';
    }

    return <div className="u-widget u-timer">
      <Popover content={this.renderSelector()}
        placement="bottom"
        visible={visible}
        arrowPointAtCenter={false}
        autoAdjustOverflow={true}
        placement="bottomLeft"
        overlayStyle={{ zIndex: 101 }}
      >
        <Input addonBefore={<Icon type="clock-circle-o" />}
          style={{ width: 280, verticalAlign: 'middle' }}
          onFocus={this.showTimer.bind(this)}
          value={defaultDate}
          onChange={f => f}
        />
      </Popover>
      {visible && <div className="popmask"
        onClick={this.hide.bind(this)}
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          zIndex: 100,
          top: 0, left: 0, bottom: 0, right: 0
        }} />}
    </div>
  }
}

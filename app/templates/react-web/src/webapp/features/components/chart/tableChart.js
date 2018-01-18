import React, { Component } from 'react';
import { Table, Pagination } from 'antd';
import ResizeDetector from 'react-resize-detector';

const minColumnWidth = 110;
export default class TableChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      containerWidth: 0,
      containerHeight: 0
    }
  }

  componentDidMount() {
    this.onResize();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      current: 1
    });
  }

  renderColumns(data = [], row, pageSize) {
    const { current, containerWidth } = this.state;
    const keys = typeof data[0] === 'object' ? Object.keys(data[0]) : [];
    let columns = keys.map((d, i) => {
      const width = row ? (containerWidth - 60)/(keys.length) : containerWidth/keys.length;
      return {
        title: d,
        dataIndex: d,
        sorter: (a, b) =>{
          if(typeof a[d] === 'number' && typeof b[d] === 'number') {
            return a[d] - b[d];
          } else {
            var valueA = a[d].toString().toUpperCase();
            var valueB = b[d].toString().toUpperCase();
            return valueA.localeCompare(valueB, 'zh');
          }
        } ,
        width: width > minColumnWidth ? width : minColumnWidth
      }
    })
    if(row) {
      columns.unshift({
        title: '行号',
        dataIndex: '',
        render: (text, record, index) => <span>{(current - 1) * pageSize + (index + 1)}</span>,
        width: 60,
        fixed: 'left'
      })
    }
    return columns;
  }

  renderData(data = []) {
    if(Array.isArray(data)) {
      return data.map((d,i) => {
        return {
          id: i + 1,
          ...d
        }
      })
    } else {
      return []
    }
  }

  getPageSize(type) {
    switch(type) {
      case '1':
        return 10;
      case '2':
        return 20;
      case '3':
        return 30;
      case '4':
        return 50;
      default:
        return 10;
    }
  }

  getScroll = (data = [], pageSize, row) => {
    const { containerHeight, containerWidth } = this.state;
    const scrollY = data.length > pageSize ? (containerHeight - 110) : (containerHeight - 50);
    const rowWidth = row ? 60 : 0;
    const keys = typeof data[0] === 'object' ? Object.keys(data[0]) : [];
    const columnsWidth = keys.length * minColumnWidth;
    const scrollX = containerWidth > rowWidth + columnsWidth ? false : rowWidth + columnsWidth;
    return {scrollX, scrollY};
  }

  onChange = (pagination) => {
    this.setState({
      current: pagination.current
    })
  }

  onResize = () => {
    if(this.container) {
      var clientObj = this.container.getBoundingClientRect();
      this.setState({
        containerWidth: clientObj.width,
        containerHeight: clientObj.height
      })
    }
  }

  render() {
    const { data = [], option = {}, event } = this.props;
    const { chart = {} } = option;
    const { style = {} } = chart;
    const dataSource = this.renderData(data);
    const pageSize = this.getPageSize(style.pageSize);
    const columns = this.renderColumns(data, style.rowNum, pageSize);
    const scroll = this.getScroll(dataSource, pageSize, style.rowNum);

    return (
      <div ref={node => this.container = node } style={{height: '100%'}}>
        <Table
          onChange={this.onChange}
          onRowClick={event}
          dataSource={dataSource}
          columns={columns}
          rowKey={record => record.id}
          scroll={{x: scroll.scrollX,y: scroll.scrollY}}
          pagination={dataSource.length > pageSize ? {
            defaultCurrent: 1,
            current: this.state.current,
            total: dataSource.length,
            pageSize: pageSize
          } : false}/>
          <ResizeDetector
            className="m-tableresizer"
            handleWidth handleHeight onResize={this.onResize}
          />
      </div>
    )
  }
}

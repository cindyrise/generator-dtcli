const F2 = require('@antv/f2');
const axisLineColor = '#999999';
const lineColor = '#E9E9E9';

const defaultAxis = {
  label: {
    fillStyle: '#979797',
    font: '20px san-serif'
  },
  labelOffset: 6,
  line: {
    stroke: lineColor,
    lineWidth: 1
  },
  grid: {
    stroke: lineColor,
    lineWidth: 1
  },
  tickLine: null
};

const defaultFont = {
  fontStyle: '',
  fontVariant: '',
  fontWeight: '',
  fontSize: '12px',
  fontFamily: '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", SimSun, "sans-serif"'
};

const Theme = {
  defaultFont, // 默认字体
  pixelRatio: window.devicePixelRatio, // 屏幕像素比
  padding: [ 40, 40, 40, 40 ], // 默认的边框
  // 颜色
  colors: [ '#4E7CCC', '#36B3C3', '#4ECDA5', '#94E08A', '#E2F194', '#EDCC72', '#F8AB60', '#F9815C', '#EB4456', '#C82B3D' ],
  shapes: { // 不同图表类型默认的形状
    line: [ 'line', 'dash' ],
    point: [ 'circle', 'hollowCircle' ]
  },
  opacities: [ 0.1, 0.9 ], // 默认的透明度范围
  sizes: [ 4, 10 ], // 默认的大小范围
  axis: { // 坐标轴的配置信息
    bottom: Object.assign({}, defaultAxis, {
      line: {
        stroke: axisLineColor
      },
      label: {
        textBaseline: 'hanging'
      },
      labelOffset: 12,
      gridAttrs: {},
      grid(text, index, total) {
        if (index === 0 || index === total - 1) {
          return null;
        }
        return Object.assign({}, defaultAxis.grid, Theme.axis.bottom.gridAttrs);
      }
    }),
    left: Object.assign({}, defaultAxis, {
      label: {
        textAlign: 'end'
      },
      line: null,
      tickLine: null
    }),
    right:  Object.assign({}, defaultAxis, {
      label: {
        textAlign: 'start'
      },
      line: null,
      tickLine: null,
      grid: null
    }),
    circle: Object.assign({}, defaultAxis, {
      line: {
        stroke: axisLineColor
      }
    }),
    radius:  Object.assign({}, defaultAxis, {})
  },
  guide: { // 辅助元素的配置信息
    line: {
      stroke: '#000',
      lineWidth: 1
    },
    text: {
      fill: '#000',
      textAlign: 'center'
    },
    rect: {
      fillStyle: '#fafafa'
    },
    arc: {
      stroke: '#CCC'
    },
    html: {
      offset: [ 0, 0 ],
      align: 'cc'
    }
  }
};
F2.Global.setTheme(Theme);

 export default F2;

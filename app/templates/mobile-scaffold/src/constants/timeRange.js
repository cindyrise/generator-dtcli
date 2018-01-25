import moment from 'moment';
moment.locale('zh-cn');

const TIME_RANGE = [
  {
    value: '1',
    label: '最近7天'
  },
  {
    value: '2',
    label: '最近30天'
  },
  {
    value: '3',
    label: '最近90天'
  },
  {
    value: '4',
    label: '最近180天'
  },
  {
    value: '5',
    label: '今年以来'
  },
  {
    value: '8',
    label: '历史以来'
  },
]

// // 生成相对时间
// const TIME_RANGE = [
//   {
//     value: 'last5m',
//     label: '最近5分钟',
//     creator() {
//       return [moment().subtract(1/12, 'hours'), moment()];
//     }
//   },
//   {
//     value: 'last15m',
//     label: '最近15分钟',
//     creator() {
//       return [moment().subtract(1/4, 'hours'), moment()];
//     }
//   },
//   {
//     value: 'last30m',
//     label: '最近30分钟',
//     creator() {
//       return [moment().subtract(1/2, 'hours'), moment()];
//     }
//   },
//   {
//     value: 'last1h',
//     label: '最近1小时',
//     creator() {
//       return [moment().subtract(1, 'hours'), moment()];
//     }
//   },
//   {
//     value: 'last3h',
//     label: '最近3小时',
//     creator() {
//       return [moment().subtract(3, 'hours'), moment()];
//     }
//   },
//   {
//     value: 'last6h',
//     label: '最近6小时',
//     creator() {
//       return [moment().subtract(6, 'hours'), moment()];
//     }
//   },
//   {
//     value: 'last12h',
//     label: '最近12小时',
//     creator() {
//       return [moment().subtract(12, 'hours'), moment()];
//     }
//   },
//   {
//     value: 'last24h',
//     label: '最近24小时',
//     creator() {
//       return [moment().subtract(24, 'hours'), moment()];
//     }
//   },
//   {
//     value: 'last3d',
//     label: '最近3天',
//     creator() {
//       return [moment().subtract(3, 'days'), moment()];
//     }
//   },
//   {
//     value: 'last7d',
//     label: '最近7天',
//     creator() {
//       return [moment().subtract(7, 'days'), moment()];
//     }
//   },
//   {
//     value: 'last14d',
//     label: '最近14天',
//     creator() {
//       return [moment().subtract(14, 'days'), moment()];
//     }
//   },
//   {
//     value: 'last30d',
//     label: '最近30天',
//     creator() {
//       return [moment().subtract(30, 'days'), moment()];
//     }
//   },
//   {
//     value: 'today',
//     label: '今天',
//     creator() {
//       return [moment().startOf('day'), moment()];
//     }
//   },
//   {
//     value: 'yesterday',
//     label: '昨天',
//     creator() {
//       return [moment().subtract(1,'days').startOf('day'), moment().subtract(1,'days').endOf('day')];
//     }
//   },
//   {
//     value: 'week',
//     label: '本周',
//     creator() {
//       return [moment().startOf('week'), moment()];
//     }
//   },
//   {
//     value: 'month',
//     label: '本月',
//     creator() {
//       return [moment().startOf('month'), moment()];
//     }
//   },
// ];
export default TIME_RANGE;

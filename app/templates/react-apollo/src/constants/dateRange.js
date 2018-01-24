import moment from 'moment';
moment.locale('zh-cn');

const DATE_RANGE = [
  {
    value: '20',
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

export default DATE_RANGE;

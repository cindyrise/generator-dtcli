import moment from 'moment';
moment.locale('zh-cn');

// 生成相对时间
const DATE_RANGE = [
  {
    type: 'last3d',
    text: '最近3天',
    creator() {
      return [moment().subtract(3, 'days'), moment().subtract(1,'days').endOf('day')];
    }
  },
  {
    type: 'last7d',
    text: '最近7天',
    creator() {
      return [moment().subtract(7, 'days'), moment().subtract(1,'days').endOf('day')];
    }
  },
  {
    type: 'last14d',
    text: '最近14天',
    creator() {
      return [moment().subtract(14, 'days'),moment().subtract(1,'days').endOf('day')];
    }
  },
  {
    type: 'last30d',
    text: '最近30天',
    creator() {
      return [moment().subtract(30, 'days'), moment().subtract(1,'days').endOf('day')];
    }
  },
  {
    type: 'yesterday',
    text: '昨天',
    creator() {
      return [moment().subtract(1,'days').startOf('day'),moment().subtract(1,'days').endOf('day')];
    }
  },
  {
    type: 'week',
    text: '本周',
    creator() {
      return [moment().startOf('week'), moment().subtract(1,'days').endOf('day')];
    }
  }
];
export default DATE_RANGE;

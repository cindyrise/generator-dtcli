import moment from 'moment';
moment.locale('zh-cn');

// 生成相对时间
const TIME_RANGE = [
  {
    type: 'last5m',
    text: '最近5分钟',
    creator() {
      return [moment().subtract(1/12, 'hours'), moment()];
    }
  },
  {
    type: 'last15m',
    text: '最近15分钟',
    creator() {
      return [moment().subtract(1/4, 'hours'), moment()];
    }
  },
  {
    type: 'last30m',
    text: '最近30分钟',
    creator() {
      return [moment().subtract(1/2, 'hours'), moment()];
    }
  },
  {
    type: 'last1h',
    text: '最近1小时',
    creator() {
      return [moment().subtract(1, 'hours'), moment()];
    }
  },
  {
    type: 'last3h',
    text: '最近3小时',
    creator() {
      return [moment().subtract(3, 'hours'), moment()];
    }
  },
  {
    type: 'last6h',
    text: '最近6小时',
    creator() {
      return [moment().subtract(6, 'hours'), moment()];
    }
  },
  {
    type: 'last12h',
    text: '最近12小时',
    creator() {
      return [moment().subtract(12, 'hours'), moment()];
    }
  },
  {
    type: 'last24h',
    text: '最近24小时',
    creator() {
      return [moment().subtract(24, 'hours'), moment()];
    }
  },
  {
    type: 'last3d',
    text: '最近3天',
    creator() {
      return [moment().subtract(3, 'days'), moment()];
    }
  },
  {
    type: 'last7d',
    text: '最近7天',
    creator() {
      return [moment().subtract(7, 'days'), moment()];
    }
  },
  {
    type: 'last14d',
    text: '最近14天',
    creator() {
      return [moment().subtract(14, 'days'), moment()];
    }
  },
  {
    type: 'last30d',
    text: '最近30天',
    creator() {
      return [moment().subtract(30, 'days'), moment()];
    }
  },
  {
    type: 'today',
    text: '今天',
    creator() {
      return [moment().startOf('day'), moment()];
    }
  },
  {
    type: 'yesterday',
    text: '昨天',
    creator() {
      return [moment().subtract(1,'days').startOf('day'), moment().subtract(1,'days').endOf('day')];
    }
  },
  {
    type: 'week',
    text: '本周',
    creator() {
      return [moment().startOf('week'), moment()];
    }
  },
  {
    type: 'month',
    text: '本月',
    creator() {
      return [moment().startOf('month'), moment()];
    }
  },
];
export default TIME_RANGE;

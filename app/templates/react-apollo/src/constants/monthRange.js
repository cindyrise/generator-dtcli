import moment from 'moment';
moment.locale('zh-cn');
const curY = new Date().getFullYear();
const MONTH_RANGE = [
  {
    value: `${curY}01`,
    label: `${curY}-01`
  },
  {
    value: `${curY}02`,
    label: `${curY}-02`
  },
  {
    value: `${curY}03`,
    label: `${curY}-03`
  },
  {
    value: `${curY}04`,
    label: `${curY}-04`
  },
  {
    value: `${curY}05`,
    label: `${curY}-05`
  },
  {
    value: `${curY}06`,
    label: `${curY}-06`
  },
  {
    value: `${curY}07`,
    label: `${curY}-07`
  },
  {
    value: `${curY}08`,
    label: `${curY}-08`
  },
  {
    value: `${curY}09`,
    label: `${curY}-09`
  },
  {
    value: `${curY}10`,
    label: `${curY}-10`
  },
  {
    value: `${curY}11`,
    label: `${curY}-11`
  },
  {
    value: `${curY}12`,
    label: `${curY}-12`
  },
]

export default MONTH_RANGE;

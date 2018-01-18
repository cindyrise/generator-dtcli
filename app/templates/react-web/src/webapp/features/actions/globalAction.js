import { globalType } from '../constants/actionTypes';
import { message } from 'antd';
import ajax from '../../api/global';
export const globalAction = {
  getUserData() {
    return dispatch => {
      ajax.getUserData().then(res => {
        const { data, result, result_code, result_message } = res;
        if (result) {
          dispatch({
            type: globalType.GET_USER_DATA,
            payload: data
          });
        } else {
          message.error(result_message);
        }
      })
    }
  },
  getNavData(params) {
    return dispatch => {
      ajax.getNavData(params).then(ret => {
        const { result_code, result_message, data } = ret;
        if (result_code === 1) {
          dispatch({
            type: globalType.GET_NAV_DATA,
            payload: data
          });
        }
        else {
          message.error("获取索引列表失败，请稍后重试");
        }
      })
    }
  }
}

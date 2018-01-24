import { homeType } from './actionType';
import { message } from 'antd';
import ajax from '../../api/home';

export const homeAction = {
  // 获取数据源管理列表的数据
  getHomeData(params) {
    return dispatch => {
      ajax.getHomeData(params).then((res) => {
        const { data, result, result_code, result_message } = res;
        if (result) {
          dispatch({
            type: homeType.GET_HOME_DATA,
            payload: data
          });
        }
        else {
          message.error(result_message);
        }
      })
    }
  },

  getUserData() {
    return dispatch => {
      ajax.getUserData().then(res => {
        const { data, result, result_code, result_message } = res;
        if (result) {
          dispatch({
            type: homeType.GET_USER_DATA, 
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
            type: homeType.GET_NAV_DATA,
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

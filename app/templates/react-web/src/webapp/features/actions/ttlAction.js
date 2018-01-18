import { ttlType } from '../constants/actionTypes';
import { message } from 'antd';
import ajax from '../../api/global';
export const ttlAction = {
  getTtlData() {
    return dispatch => {
      ajax.getTtlData().then(res => {
        const { data, result, result_code, result_message } = res;
        if (result) {
          dispatch({
            type: ttlType.GET_TTL_DATA,
            payload: data
          });
        } else {
          message.error(result_message);
        }
      })
    }
  }
}

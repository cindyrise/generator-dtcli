import { persosType } from '../constants/actionTypes';
import { message } from 'antd';
import ajax from '../../api/global';
export const persosAction = {
  getPersosData() {
    return dispatch => {
      ajax.getPersosData().then(res => {
        const { data, result, result_code, result_message } = res;
        if (result) {
          dispatch({
            type: persosType.GET_PERSOS_DATA,
            payload: data
          });
        } else {
          message.error(result_message);
        }
      })
    }
  }
}

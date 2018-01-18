import { navBarType } from '../constants/actionTypes';
import { message } from 'antd';
import ajax from '../../api/global';
export const navBarAction = {
  getbigCamelData() {
    return dispatch => {
      ajax.getbigCamelData().then(res => {
        const { data, result, result_code, result_message } = res;
        if (result) {
          dispatch({
            type: navBarType.GET_NAVBAR_DATA,
            payload: data
          });
        } else {
          message.error(result_message);
        }
      })
    }
  }
}

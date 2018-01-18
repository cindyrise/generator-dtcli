import { personCenterType } from '../constants/actionTypes';
import { message } from 'antd';
import ajax from '../../api/global';
export const personCenterAction = {
  getPersoncenterData() {
    return dispatch => {
      ajax.getPersoncenterData().then(res => {
        const { data, result, result_code, result_message } = res;
        if (result) {
          dispatch({
            type: personCenterType.GET_PERSONCENTER_DATA,
            payload: data
          });
        } else {
          message.error(result_message);
        }
      })
    }
  }
}

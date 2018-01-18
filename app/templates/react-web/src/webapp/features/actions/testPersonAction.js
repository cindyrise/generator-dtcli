import { testPersonType } from '../constants/actionTypes';
import { message } from 'antd';
import ajax from '../../api/global';
export const testPersonAction = {
  getTestpersonData() {
    return dispatch => {
      ajax.getTestpersonData().then(res => {
        const { data, result, result_code, result_message } = res;
        if (result) {
          dispatch({
            type: testPersonType.GET_TESTPERSON_DATA,
            payload: data
          });
        } else {
          message.error(result_message);
        }
      })
    }
  }
}

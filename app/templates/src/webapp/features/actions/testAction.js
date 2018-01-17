import { testType } from '../constants/actionTypes';
import { message } from 'antd';
import ajax from '../../api/global';
export const testAction = {
  getTestData() {
    return dispatch => {
      ajax.getTestData().then(res => {
        const { data, result, result_code, result_message } = res;
        if (result) {
          dispatch({
            type: testType.GET_TEST_DATA,
            payload: data
          });
        } else {
          message.error(result_message);
        }
      })
    }
  }
}

import http from '../utils/http'
import apiUrl from '../features/constants/apis';
export default {
  getNavBarData(params) {
    return http.post(apiUrl.getUserData, params);
  }
};
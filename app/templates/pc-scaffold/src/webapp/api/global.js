import http from '../utils/http'
import apiUrl from '../constants/apis';

export default {
  getUserData(params) {
    return http.get(apiUrl.getUserData, params);
  },
  getNavData(params) {
    return http.get(apiUrl.getNavData, params);
  },
};

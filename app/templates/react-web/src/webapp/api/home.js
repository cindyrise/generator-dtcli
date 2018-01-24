// import http from './http';
import http from '../utils/http'
import apiUrl from '../constants/apis';

export default {
  getHomeData(params) {
    return http.get(apiUrl.getHomeData, params);
  },
  getUserData(params) {
    return http.post(apiUrl.getUserData, params);
  },
  getNavData(params) {
    return http.get(apiUrl.getNavData, params);
  },
};

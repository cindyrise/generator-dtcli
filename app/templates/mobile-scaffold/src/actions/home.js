import http from '../utils/http'
import { homeAction } from '../constants/actionType'
import apiUrl from '../constants/apiUrl';
//获取核心指标信息
const homeInfo= (data) => ({
    type: homeAction.GET_HOME_INFO,
    payload: data
})

export const getHomeInfo = (params) => async (dispatch, getState) => {
    try {
        let response = await http.get(apiUrl.getHomeInfo, params)
        console.log(response);
        if (response.result_code == 200) {
            await dispatch(homeInfo(response.data));
        } else {
            //返回失败
        }
    } catch (error) {
        console.log('error: ', error)
    }
}
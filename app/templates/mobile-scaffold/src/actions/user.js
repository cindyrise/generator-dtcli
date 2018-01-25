import http from '../utils/http'
import { userAction } from '../constants/actionType'
import apiUrl from '../constants/apiUrl';

//登陆网站
const login = (data) => ({
    type: userAction.REQ_LOGIN,
    payload: {
        ...data,
        reload: true
    }
})
export const reqLogin = (params) => async (dispatch, getState) => {
    try {
        let response = await http.get(apiUrl.reqLogin, params)
        if (response.result_code == 200) {
            await dispatch(login(response.data));
        } else {
            //返回失败
        }
    } catch (error) {
        console.log('error: ', error)
    }
}

//获取用户信息
const userInfo = (data) => ({
    type: userAction.GET_USER_INFO,
    payload: {
        ...data,
        reload: true
    }
})
export const getUserInfo = (params) => async (dispatch, getState) => {
    try {
        let response = await http.get(apiUrl.getUserInfo, params)
        if (response.result_code == 200) {
            await dispatch(userInfo(response.data));
        } else {
            //返回失败
        }
    } catch (error) {
        console.log('error: ', error)
    }
}


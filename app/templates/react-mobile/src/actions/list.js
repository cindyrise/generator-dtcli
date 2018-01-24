import http from '../utils/http'
import { listAction } from '../constants/actionType'
import apiUrl from '../constants/apiUrl';
const itemList = (data) => ({
    type: listAction.GET_ITEM_LIST,
    payload: {
        ...data,
        reload: true
    }
})
export const getItemList = (params) => async (dispatch, getState) => {
    try {
        let response = await http.get(apiUrl.getItemList, params)
        if (response.result_code == 200) {
            await dispatch(itemList(response.data));
        } else {
            //返回失败
        }
    } catch (error) {
        console.log('error: ', error)
    }
}

//getGroupList

const exceptList = (data) => ({
    type: listAction.GET_EXCEPT_LIST,
    payload: {
        ...data,
        reload: true
    }
})
export const getExceptList = (params) => async (dispatch, getState) => {
    try {
        let response = await http.get(apiUrl.getExceptList, params)
        if (response.result_code == 200) {
            await dispatch(exceptList(response.data));
        } else {
            //返回失败
        }
    } catch (error) {
        console.log('error: ', error)
    }
}


//效果分析类别
const searchList = (data) => ({
    type: list.GET_SEARCH_LIST,
    payload: {
        ...data,
        reload: true
    }
})
export const getSearchList = (params) => async (dispatch, getState) => {
    try {
        let response = await http.get(apiUrl.getSearchList, params)
        if (response.result_code == 200) {
            await dispatch(searchList(response.data));
        } else {
            //返回失败
        }
    } catch (error) {
        console.log('error: ', error)
    }
}
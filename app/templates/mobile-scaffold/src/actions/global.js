import http from '../utils/http'
import { globalAction } from '../constants/actionType'
import apiUrl from '../constants/apiUrl';
export const currentAnimate = (cls) => ({
    type: 'CURRENT_ANIMATE',
    payload: cls
})
export const curNavTitle = (title) => ({
    type: 'CUR_NAV_TITLE',
    payload: title
})

const publishGroup = (data) => ({
    type: globalAction.GET_PUBLISH_GROUP,
    payload: data
})
export const getPublishGroup = (params) => async (dispatch, getState) => {
    try {
        let response = await http.get(apiUrl.getPublishGroup, params)
        if (response.result_code == 200) {
            let list = [];
            response.data.forEach(item => {
                let tempObj = {};
                tempObj.value = item.centId;
                tempObj.label = item.centName;
                tempObj.isLeaf=false;
                tempObj.children=[];
                list.push(tempObj);
            })
            await dispatch(publishGroup(list));
        } else {
            //返回失败
        }
    } catch (error) {
        console.log('error:', error)
    }
}
const areaList = (data) => ({
    type: globalAction.GET_AREA_LIST,
    payload: data
})
export const getAreaList = (params) => async (dispatch, getState) => {
    try {
        let response = await http.get(apiUrl.getAreaList, params)
        if (response.result_code == 200) {
            let list = [];
            response.data.forEach(item => {
                let tempObj = {};
                tempObj.value = item.provId;
                tempObj.label = item.provName;
                tempObj.isLeaf=false;
                tempObj.children=[];
                list.push(tempObj);
            })
            await dispatch(areaList(list));
        } else {
            //返回失败
        }
    } catch (error) {
        console.log('error:', error);
    }
}
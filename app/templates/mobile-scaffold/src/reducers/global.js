import {globalAction} from '../constants/actionType'
const initialState = {
    animateCls: 'normal', //过渡动画样式
    navTitle:'首页',
    publishGroup:[],
    areaList:[]
}

export const global = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
            case "CUR_NAV_TITLE":
            return {
                ...state,
                navTitle: payload
            }
            case "CUR_NAV_TITLE":
            return {
                ...state,
                navTitle: payload
            }
            case globalAction.GET_PUBLISH_GROUP:
            return {
                ...state,
                publishGroup:payload
            }
            case globalAction.GET_AREA_LIST:
            return {
                ...state,
                areaList:payload
            }
        default:
            return state
    }
}
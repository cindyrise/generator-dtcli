import { userAction } from '../constants/actionType'
let initialState = {
   loginInfo:[],
   userInfo:{},
}

export function user(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case userAction.REQ_LOGIN:
            return {
                ...state,   //三个点是展开符
                loginInfo: payload
            }
            case userAction.GET_USER_INFO:
            return {
                ...state,   //三个点是展开符
                userInfo: payload
            }
        default:
            return { ...state };
    }
}
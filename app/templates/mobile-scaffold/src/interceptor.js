//import { message } from 'antd'
export const reqHeader = {
    'Accept': '*/*',
    mode: 'cors',
    'Content-Type': 'application/json',
};

export function authBeforeRes(response) {
    switch (response.status) {
        case 200:
            return response.json();
        case 302:
        //message.info('登录超时, 请重新登录！')
        default:
            return { result_code: 500, result_message: "", data: {} }
    }
}

export function authAfterRes(response) {
    //console.log(response, 'sdsf');
    switch (response.result_code) {
        case 200:
            return response;
        case 0: // 无权限，需要登录
        //Api.logout() 这里需要重新登录处理
        //return Promise.reject(response);
        default:
            return response
    }
}

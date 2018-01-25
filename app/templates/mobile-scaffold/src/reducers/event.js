import EventEmitter from '../utils/event';

const initState = {
    subscriber: new EventEmitter('demo'),//全局事件
}
export const event = (state = initState, action) => {
    switch (action.type) {
        default:
            return state
    }
}
import { combineReducers } from 'redux';
import assign from 'object-assign';
import { helloType } from '../../constants/actionTypes';
const initialState = {
  helloData: []
};
export const helloReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
      case helloType.GET_HELLO_DATA:
      return Object.assign({}, state, {
        helloData: payload,
      });
    default:
      return state;
  }
};

import { combineReducers } from 'redux';
import assign from 'object-assign';
import { globalType } from './actionType';
const initialState = {
  userData: {name:''},
  navData: [],
};
export const globalReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
      case globalType.GET_USER_DATA:
      return Object.assign({}, state, {
        userData: payload,
      });
      case globalType.GET_NAV_DATA:
      return Object.assign({}, state, {
        navData: payload,
      });
    default:
      return state;
  }
};

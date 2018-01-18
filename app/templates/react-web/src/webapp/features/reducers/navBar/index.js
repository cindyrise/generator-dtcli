import { combineReducers } from 'redux';
import assign from 'object-assign';
import { navBarType } from '../../constants/actionTypes';
const initialState = {
  navBarData: []
};
export const navBarReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
      case navBarType.GET_NAVBAR_DATA:
      return Object.assign({}, state, {
        navBarData: payload,
      });
    default:
      return state;
  }
};

import { combineReducers } from 'redux';
import assign from 'object-assign';
import { persosType } from '../../constants/actionTypes';
const initialState = {
  persosData: []
};
export const persosReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
      case persosType.GET_PERSOS_DATA:
      return Object.assign({}, state, {
        persosData: payload,
      });
    default:
      return state;
  }
};

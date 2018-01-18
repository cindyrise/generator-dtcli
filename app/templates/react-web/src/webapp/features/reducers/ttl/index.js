import { combineReducers } from 'redux';
import assign from 'object-assign';
import { ttlType } from '../../constants/actionTypes';
const initialState = {
  ttlData: []
};
export const ttlReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
      case ttlType.GET_TTL_DATA:
      return Object.assign({}, state, {
        ttlData: payload,
      });
    default:
      return state;
  }
};

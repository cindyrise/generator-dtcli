import { combineReducers } from 'redux';
import assign from 'object-assign';
import { personCenterType } from '../../constants/actionTypes';
const initialState = {
  personCenterData: []
};
export const personCenterReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
      case personCenterType.GET_PERSONCENTER_DATA:
      return Object.assign({}, state, {
        personCenterData: payload,
      });
    default:
      return state;
  }
};

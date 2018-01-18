import { combineReducers } from 'redux';
import assign from 'object-assign';
import { testPersonType } from '../../constants/actionTypes';
const initialState = {
  testPersonData: []
};
export const testPersonReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
      case testPersonType.GET_TESTPERSON_DATA:
      return Object.assign({}, state, {
        testPersonData: payload,
      });
    default:
      return state;
  }
};

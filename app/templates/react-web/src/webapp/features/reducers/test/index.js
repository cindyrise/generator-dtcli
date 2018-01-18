import { combineReducers } from 'redux';
import assign from 'object-assign';
import { testType } from '../../constants/actionTypes';
const initialState = {
  testData: []
};
export const testReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
      case testType.GET_TEST_DATA:
      return Object.assign({}, state, {
        testData: payload,
      });
    default:
      return state;
  }
};
